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
const react_1 = __importDefault(require("react"));
const memoize_1 = require("../../utils/memoize");
const visualization_chart_1 = require("./visualization_chart");
const visualization_noresults_1 = require("./visualization_noresults");
require("./visualization.less");
function shouldShowNoResultsMessage(vis, visData) {
    const requiresSearch = lodash_1.get(vis, 'type.requiresSearch');
    const isZeroHits = lodash_1.get(visData, 'hits.total') === 0;
    const shouldShowMessage = !lodash_1.get(vis, 'params.handleNoResults');
    return Boolean(requiresSearch && isZeroHits && shouldShowMessage);
}
class Visualization extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.showNoResultsMessage = memoize_1.memoizeLast(shouldShowNoResultsMessage);
        const { vis, uiState, listenOnChange } = props;
        vis._setUiState(props.uiState);
        if (listenOnChange) {
            uiState.on('change', this.onUiStateChanged);
        }
    }
    render() {
        const { vis, visData, onInit, uiState } = this.props;
        const noResults = this.showNoResultsMessage(vis, visData);
        return (react_1.default.createElement("div", { className: "visualization" }, noResults ? (react_1.default.createElement(visualization_noresults_1.VisualizationNoResults, { onInit: onInit })) : (react_1.default.createElement(visualization_chart_1.VisualizationChart, { vis: vis, visData: visData, onInit: onInit, uiState: uiState }))));
    }
    shouldComponentUpdate(nextProps) {
        if (nextProps.uiState !== this.props.uiState) {
            throw new Error('Changing uiState on <Visualization/> is not supported!');
        }
        return true;
    }
    componentWillUnmount() {
        this.props.uiState.off('change', this.onUiStateChanged);
    }
    componentDidUpdate(prevProps) {
        const { listenOnChange } = this.props;
        // If the listenOnChange prop changed, we need to register or deregister from uiState
        if (prevProps.listenOnChange !== listenOnChange) {
            if (listenOnChange) {
                this.props.uiState.on('change', this.onUiStateChanged);
            }
            else {
                this.props.uiState.off('change', this.onUiStateChanged);
            }
        }
    }
    /**
     * In case something in the uiState changed, we need to force a redraw of
     * the visualization, since these changes could effect visualization rendering.
     */
    onUiStateChanged() {
        this.forceUpdate();
    }
}
exports.Visualization = Visualization;
