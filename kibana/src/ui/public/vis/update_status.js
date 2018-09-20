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
const calculate_object_hash_1 = require("./lib/calculate_object_hash");
var Status;
(function (Status) {
    Status["AGGS"] = "aggs";
    Status["DATA"] = "data";
    Status["PARAMS"] = "params";
    Status["RESIZE"] = "resize";
    Status["TIME"] = "time";
    Status["UI_STATE"] = "uiState";
})(Status || (Status = {}));
exports.Status = Status;
/**
 * Checks whether the hash of a specific key in the given oldStatus has changed
 * compared to the new valueHash passed.
 */
function hasHashChanged(valueHash, oldStatus, name) {
    const oldHash = oldStatus[name];
    return oldHash !== valueHash;
}
function hasSizeChanged(size, oldSize) {
    if (!oldSize) {
        return true;
    }
    return oldSize.width !== size.width || oldSize.height !== size.height;
}
function getUpdateStatus(requiresUpdateStatus = [], obj, param) {
    const status = {};
    // If the vis type doesn't need update status, skip all calculations
    if (requiresUpdateStatus.length === 0) {
        return status;
    }
    if (!obj._oldStatus) {
        obj._oldStatus = {};
    }
    for (const requiredStatus of requiresUpdateStatus) {
        let hash;
        // Calculate all required status updates for this visualization
        switch (requiredStatus) {
            case Status.AGGS:
                hash = calculate_object_hash_1.calculateObjectHash(param.vis.aggs);
                status.aggs = hasHashChanged(hash, obj._oldStatus, 'aggs');
                obj._oldStatus.aggs = hash;
                break;
            case Status.DATA:
                hash = calculate_object_hash_1.calculateObjectHash(param.visData);
                status.data = hasHashChanged(hash, obj._oldStatus, 'data');
                obj._oldStatus.data = hash;
                break;
            case Status.PARAMS:
                hash = calculate_object_hash_1.calculateObjectHash(param.vis.params);
                status.params = hasHashChanged(hash, obj._oldStatus, 'param');
                obj._oldStatus.param = hash;
                break;
            case Status.RESIZE:
                const width = param.vis.size ? param.vis.size[0] : 0;
                const height = param.vis.size ? param.vis.size[1] : 0;
                const size = { width, height };
                status.resize = hasSizeChanged(size, obj._oldStatus.resize);
                obj._oldStatus.resize = size;
                break;
            case Status.TIME:
                const timeRange = param.vis.filters && param.vis.filters.timeRange;
                hash = calculate_object_hash_1.calculateObjectHash(timeRange);
                status.time = hasHashChanged(hash, obj._oldStatus, 'time');
                obj._oldStatus.time = hash;
                break;
            case Status.UI_STATE:
                hash = calculate_object_hash_1.calculateObjectHash(param.uiState);
                status.uiState = hasHashChanged(hash, obj._oldStatus, 'uiState');
                obj._oldStatus.uiState = hash;
                break;
        }
    }
    return status;
}
exports.getUpdateStatus = getUpdateStatus;
