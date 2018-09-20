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
/** @internal */
var legacy_platform_proxifier_1 = require("./legacy_platform_proxifier");
exports.LegacyPlatformProxifier = legacy_platform_proxifier_1.LegacyPlatformProxifier;
/** @internal */
var legacy_platform_config_1 = require("./legacy_platform_config");
exports.LegacyConfigToRawConfigAdapter = legacy_platform_config_1.LegacyConfigToRawConfigAdapter;
/** @internal */
var legacy_kbn_server_1 = require("./legacy_kbn_server");
exports.LegacyKbnServer = legacy_kbn_server_1.LegacyKbnServer;
const _1 = require(".");
const kbn_observable_1 = require("../../lib/kbn_observable");
const config_1 = require("../config");
const root_1 = require("../root");
const base_path_proxy_root_1 = require("../root/base_path_proxy_root");
function initEnvironment(rawKbnServer) {
    const config = rawKbnServer.config;
    const legacyConfig$ = new kbn_observable_1.BehaviorSubject(config);
    const config$ = kbn_observable_1.k$(legacyConfig$)(kbn_observable_1.map(legacyConfig => new _1.LegacyConfigToRawConfigAdapter(legacyConfig)));
    const env = config_1.Env.createDefault({
        kbnServer: new _1.LegacyKbnServer(rawKbnServer),
        // The defaults for the following parameters are retrieved by the legacy
        // platform from the command line or from `package.json` and stored in the
        // config, so we can borrow these parameters and avoid double parsing.
        mode: config.get('env'),
        packageInfo: config.get('pkg'),
    });
    return {
        config$,
        env,
        // Propagates legacy config updates to the new platform.
        updateConfig(legacyConfig) {
            legacyConfig$.next(legacyConfig);
        },
    };
}
/**
 * @internal
 */
exports.injectIntoKbnServer = (rawKbnServer) => {
    const { env, config$, updateConfig } = initEnvironment(rawKbnServer);
    rawKbnServer.newPlatform = {
        // Custom HTTP Listener that will be used within legacy platform by HapiJS server.
        proxyListener: new _1.LegacyPlatformProxifier(new root_1.Root(config$, env)),
        updateConfig,
    };
};
exports.createBasePathProxy = (rawKbnServer) => {
    const { env, config$ } = initEnvironment(rawKbnServer);
    return new base_path_proxy_root_1.BasePathProxyRoot(config$, env);
};
