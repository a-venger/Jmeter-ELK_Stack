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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const path_1 = require("path");
const process_1 = __importDefault(require("process"));
class Env {
    /**
     * @internal
     */
    constructor(homeDir, options) {
        this.homeDir = homeDir;
        this.options = options;
        this.configDir = path_1.resolve(this.homeDir, 'config');
        this.corePluginsDir = path_1.resolve(this.homeDir, 'core_plugins');
        this.binDir = path_1.resolve(this.homeDir, 'bin');
        this.logDir = path_1.resolve(this.homeDir, 'log');
        this.staticFilesDir = path_1.resolve(this.homeDir, 'ui');
    }
    /**
     * @internal
     */
    static createDefault(options) {
        return new Env(process_1.default.cwd(), options);
    }
    getConfigFile() {
        const defaultConfigFile = this.getDefaultConfigFile();
        return this.options.config === undefined ? defaultConfigFile : this.options.config;
    }
    /**
     * @internal
     */
    getLegacyKbnServer() {
        return this.options.kbnServer;
    }
    /**
     * Gets information about Kibana package (version, build number etc.).
     */
    getPackageInfo() {
        return this.options.packageInfo;
    }
    /**
     * Gets mode Kibana currently run in (development or production).
     */
    getMode() {
        return this.options.mode;
    }
    getDefaultConfigFile() {
        return path_1.resolve(this.configDir, 'kibana.yml');
    }
}
exports.Env = Env;
