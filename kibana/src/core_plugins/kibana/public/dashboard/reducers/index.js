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
const redux_1 = require("redux");
const embeddables_1 = require("./embeddables");
const panels_1 = require("./panels");
const view_1 = require("./view");
const metadata_1 = require("./metadata");
exports.dashboard = redux_1.combineReducers({
    embeddables: embeddables_1.embeddablesReducer,
    metadata: metadata_1.metadataReducer,
    panels: panels_1.panelsReducer,
    view: view_1.viewReducer,
});
