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
const classnames_1 = __importDefault(require("classnames"));
const prop_types_1 = __importDefault(require("prop-types"));
const react_1 = __importDefault(require("react"));
const eui_1 = require("@elastic/eui");
/**
 * The InspectorView component should be the top most element in every implemented
 * inspector view. It makes sure, that the appropriate stylings are applied to the
 * view.
 */
const InspectorView = ({ useFlex, children }) => {
    const classes = classnames_1.default({
        'inspector-view__flex': Boolean(useFlex),
    });
    return react_1.default.createElement(eui_1.EuiFlyoutBody, { className: classes }, children);
};
exports.InspectorView = InspectorView;
InspectorView.propTypes = {
    /**
     * Set to true if the element should have display: flex set.
     */
    useFlex: prop_types_1.default.bool,
};
