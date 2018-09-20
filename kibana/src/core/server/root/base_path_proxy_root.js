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
const kbn_observable_1 = require("../../lib/kbn_observable");
const _1 = require(".");
const dev_1 = require("../dev");
const http_1 = require("../http");
const base_path_proxy_server_1 = require("../http/base_path_proxy_server");
/**
 * Top-level entry point to start BasePathProxy server.
 */
class BasePathProxyRoot extends _1.Root {
    async configure({ blockUntil, shouldRedirectFromOldBasePath, }) {
        const [devConfig, httpConfig] = await Promise.all([
            kbn_observable_1.k$(this.configService.atPath('dev', dev_1.DevConfig))(kbn_observable_1.first(), kbn_observable_1.toPromise()),
            kbn_observable_1.k$(this.configService.atPath('server', http_1.HttpConfig))(kbn_observable_1.first(), kbn_observable_1.toPromise()),
        ]);
        this.basePathProxy = new base_path_proxy_server_1.BasePathProxyServer(this.logger.get('server'), {
            blockUntil,
            devConfig,
            httpConfig,
            shouldRedirectFromOldBasePath,
        });
    }
    getBasePath() {
        return this.getBasePathProxy().basePath;
    }
    getTargetPort() {
        return this.getBasePathProxy().targetPort;
    }
    async startServer() {
        return this.getBasePathProxy().start();
    }
    async stopServer() {
        await this.getBasePathProxy().stop();
        this.basePathProxy = undefined;
    }
    getBasePathProxy() {
        if (this.basePathProxy === undefined) {
            throw new Error('BasePathProxyRoot is not configured!');
        }
        return this.basePathProxy;
    }
}
exports.BasePathProxyRoot = BasePathProxyRoot;
