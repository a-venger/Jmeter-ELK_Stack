"use strict";
/*
 * Licensed to Elasticsearch B.V. under one or more contributor
 * license agreements. See the NOTICE file distributed with
 * this work for additional information regarding copyright
 * ownership. Elasticsearch B.V. licenses this file to you under
 * the Apache License, Version 2.0 (the "License"); you may
 * not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = require("..");
const config_1 = require("../config");
const logger_factory_1 = require("../logging/logger_factory");
const logging_config_1 = require("../logging/logging_config");
const logging_service_1 = require("../logging/logging_service");
/**
 * Top-level entry point to kick off the app and start the Kibana server.
 */
class Root {
    constructor(rawConfig$, env, onShutdown = () => {
        // noop
    }) {
        this.env = env;
        this.onShutdown = onShutdown;
        const loggerFactory = new logger_factory_1.MutableLoggerFactory(env);
        this.loggingService = new logging_service_1.LoggingService(loggerFactory);
        this.logger = loggerFactory;
        this.log = this.logger.get('root');
        this.configService = new config_1.ConfigService(rawConfig$, env, this.logger);
    }
    async start() {
        try {
            const loggingConfig$ = this.configService.atPath('logging', logging_config_1.LoggingConfig);
            this.loggingService.upgrade(loggingConfig$);
        }
        catch (e) {
            // This specifically console.logs because we were not able to configure
            // the logger.
            // tslint:disable no-console
            console.error('Configuring logger failed:', e.message);
            await this.shutdown(e);
            throw e;
        }
        try {
            await this.startServer();
        }
        catch (e) {
            this.log.error(e);
            await this.shutdown(e);
            throw e;
        }
    }
    async shutdown(reason) {
        await this.stopServer();
        await this.loggingService.stop();
        this.onShutdown(reason);
    }
    async startServer() {
        this.server = new __1.Server(this.configService, this.logger, this.env);
        return this.server.start();
    }
    async stopServer() {
        if (this.server === undefined) {
            return;
        }
        await this.server.stop();
        this.server = undefined;
    }
}
exports.Root = Root;
