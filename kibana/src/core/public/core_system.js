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
const injected_metadata_1 = require("./injected_metadata");
const legacy_platform_1 = require("./legacy_platform");
/**
 * The CoreSystem is the root of the new platform, and starts all parts
 * of Kibana in the UI, including the LegacyPlatform which is managed
 * by the LegacyPlatformService. As we migrate more things to the new
 * platform the CoreSystem will get many more Services.
 */
class CoreSystem {
    constructor(params) {
        const { rootDomElement, injectedMetadata, requireLegacyFiles, useLegacyTestHarness } = params;
        this.injectedMetadata = new injected_metadata_1.InjectedMetadataService({
            injectedMetadata,
        });
        this.legacyPlatform = new legacy_platform_1.LegacyPlatformService({
            rootDomElement,
            requireLegacyFiles,
            useLegacyTestHarness,
        });
    }
    start() {
        this.legacyPlatform.start({
            injectedMetadata: this.injectedMetadata.start(),
        });
    }
}
exports.CoreSystem = CoreSystem;
