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
const types_1 = require("./types");
/**
 * An API to specify information about a specific request that will be logged.
 * Create a new instance to log a request using {@link RequestAdapter#start}.
 */
class RequestResponder {
    constructor(request, onChange) {
        this.request = request;
        this.onChange = onChange;
    }
    json(reqJson) {
        this.request.json = reqJson;
        this.onChange();
        return this;
    }
    stats(stats) {
        this.request.stats = {
            ...(this.request.stats || {}),
            ...stats,
        };
        this.onChange();
        return this;
    }
    finish(status, response) {
        this.request.time = Date.now() - this.request.startTime;
        this.request.status = status;
        this.request.response = response;
        this.onChange();
    }
    ok(response) {
        this.finish(types_1.RequestStatus.OK, response);
    }
    error(response) {
        this.finish(types_1.RequestStatus.ERROR, response);
    }
}
exports.RequestResponder = RequestResponder;
