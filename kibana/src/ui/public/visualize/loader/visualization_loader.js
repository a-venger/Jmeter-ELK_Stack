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
const lodash_1 = __importDefault(require("lodash"));
const react_1 = __importDefault(require("react"));
const react_dom_1 = require("react-dom");
const visualization_1 = require("../components/visualization");
function renderVisualization(element, vis, visData, uiState, params) {
    return new Promise(resolve => {
        const listenOnChange = lodash_1.default.get(params, 'listenOnChange', false);
        react_dom_1.render(react_1.default.createElement(visualization_1.Visualization, { vis: vis, visData: visData, uiState: uiState, listenOnChange: listenOnChange, onInit: resolve }), element);
    });
}
function destroy(element) {
    if (element) {
        react_dom_1.unmountComponentAtNode(element);
    }
}
exports.visualizationLoader = {
    render: renderVisualization,
    destroy,
};
