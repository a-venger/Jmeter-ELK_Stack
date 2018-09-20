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
const redux_1 = require("redux");
const redux_thunk_1 = __importDefault(require("redux-thunk"));
const types_1 = require("ui/embeddable/types");
const dashboard_view_mode_1 = require("./dashboard/dashboard_view_mode");
const reducers_1 = require("./reducers");
const enhancers = [redux_1.applyMiddleware(redux_thunk_1.default)];
exports.store = redux_1.createStore(reducers_1.reducers, {
    dashboard: {
        embeddables: {},
        metadata: {
            title: 'New Dashboard',
        },
        panels: {},
        view: {
            filters: [],
            hidePanelTitles: false,
            isFullScreenMode: false,
            query: { language: types_1.QueryLanguageType.LUCENE, query: '' },
            timeRange: { from: 'now-15m', to: 'now' },
            useMargins: true,
            viewMode: dashboard_view_mode_1.DashboardViewMode.VIEW,
        },
    },
}, redux_1.compose(...enhancers));
