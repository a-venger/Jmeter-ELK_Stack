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
/**
 * This is a name of configuration node that is specifically dedicated to
 * the configuration values used by the new platform only. Eventually all
 * its nested values will be migrated to the stable config and this node
 * will be deprecated.
 */
exports.NEW_PLATFORM_CONFIG_ROOT = '__newPlatform';
var config_service_1 = require("./config_service");
exports.ConfigService = config_service_1.ConfigService;
var raw_config_service_1 = require("./raw_config_service");
exports.RawConfigService = raw_config_service_1.RawConfigService;
/** @internal */
var object_to_raw_config_adapter_1 = require("./object_to_raw_config_adapter");
exports.ObjectToRawConfigAdapter = object_to_raw_config_adapter_1.ObjectToRawConfigAdapter;
var env_1 = require("./env");
exports.Env = env_1.Env;
