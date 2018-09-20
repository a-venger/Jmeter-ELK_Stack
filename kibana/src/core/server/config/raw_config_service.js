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
const lodash_1 = require("lodash");
const type_detect_1 = __importDefault(require("type-detect"));
const kbn_observable_1 = require("../../lib/kbn_observable");
const object_to_raw_config_adapter_1 = require("./object_to_raw_config_adapter");
const read_config_1 = require("./read_config");
// Used to indicate that no config has been received yet
const notRead = Symbol('config not yet read');
class RawConfigService {
    constructor(configFile) {
        this.configFile = configFile;
        /**
         * The stream of configs read from the config file. Will be the symbol
         * `notRead` before the config is initially read, and after that it can
         * potentially be `null` for an empty yaml file.
         *
         * This is the _raw_ config before any overrides are applied.
         *
         * As we have a notion of a _current_ config we rely on a BehaviorSubject so
         * every new subscription will immediately receive the current config.
         */
        this.rawConfigFromFile$ = new kbn_observable_1.BehaviorSubject(notRead);
        this.config$ = kbn_observable_1.k$(this.rawConfigFromFile$)(kbn_observable_1.filter(rawConfig => rawConfig !== notRead), kbn_observable_1.map(rawConfig => {
            // If the raw config is null, e.g. if empty config file, we default to
            // an empty config
            if (rawConfig == null) {
                return new object_to_raw_config_adapter_1.ObjectToRawConfigAdapter({});
            }
            if (lodash_1.isPlainObject(rawConfig)) {
                // TODO Make config consistent, e.g. handle dots in keys
                return new object_to_raw_config_adapter_1.ObjectToRawConfigAdapter(rawConfig);
            }
            throw new Error(`the raw config must be an object, got [${type_detect_1.default(rawConfig)}]`);
        }), 
        // We only want to update the config if there are changes to it
        kbn_observable_1.skipRepeats(lodash_1.isEqual));
    }
    /**
     * Read the initial Kibana config.
     */
    loadConfig() {
        const config = read_config_1.getConfigFromFile(this.configFile);
        this.rawConfigFromFile$.next(config);
    }
    stop() {
        this.rawConfigFromFile$.complete();
    }
    /**
     * Re-read the Kibana config.
     */
    reloadConfig() {
        this.loadConfig();
    }
    getConfig$() {
        return this.config$;
    }
}
exports.RawConfigService = RawConfigService;
