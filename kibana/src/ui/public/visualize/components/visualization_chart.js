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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importDefault(require("react"));
const Rx = __importStar(require("rxjs"));
const operators_1 = require("rxjs/operators");
const render_complete_1 = require("../../render_complete");
const resize_checker_1 = require("../../resize_checker");
const update_status_1 = require("../../vis/update_status");
class VisualizationChart extends react_1.default.Component {
    constructor(props) {
        super(props);
        this.chartDiv = react_1.default.createRef();
        this.containerDiv = react_1.default.createRef();
        this.renderSubject = new Rx.Subject();
        const render$ = this.renderSubject.asObservable().pipe(operators_1.share());
        const success$ = render$.pipe(operators_1.tap(() => {
            if (this.chartDiv.current) {
                render_complete_1.dispatchRenderStart(this.chartDiv.current);
            }
        }), operators_1.filter(({ vis, visData, container }) => vis && container && (!vis.type.requiresSearch || visData)), operators_1.debounceTime(100), operators_1.switchMap(async ({ vis, visData, container }) => {
            if (!this.visualization) {
                // This should never happen, since we only should trigger another rendering
                // after this component has mounted and thus the visualization implementation
                // has been initialized
                throw new Error('Visualization implementation was not initialized on first render.');
            }
            vis.size = [container.clientWidth, container.clientHeight];
            const status = update_status_1.getUpdateStatus(vis.type.requiresUpdateStatus, this, this.props);
            return this.visualization.render(visData, status);
        }));
        const requestError$ = render$.pipe(operators_1.filter(({ vis }) => vis.requestError));
        this.renderSubscription = Rx.merge(success$, requestError$).subscribe(() => {
            if (this.chartDiv.current !== null) {
                render_complete_1.dispatchRenderComplete(this.chartDiv.current);
            }
        });
    }
    render() {
        return (react_1.default.createElement("div", { className: "vis-container", tabIndex: 0, ref: this.containerDiv },
            react_1.default.createElement("span", { className: "kuiScreenReaderOnly" },
                this.props.vis.type.title,
                " visualization, not yet accessible"),
            react_1.default.createElement("div", { "aria-hidden": !this.props.vis.type.isAccessible, className: "visualize-chart", ref: this.chartDiv })));
    }
    componentDidMount() {
        if (!this.chartDiv.current || !this.containerDiv.current) {
            throw new Error('chartDiv and currentDiv reference should always be present.');
        }
        const { vis, onInit } = this.props;
        const Visualization = vis.type.visualization;
        this.visualization = new Visualization(this.chartDiv.current, vis);
        if (onInit) {
            // In case the visualization implementation has an isLoaded function, we
            // call that and wait for the result to resolve (in case it was a promise).
            const visLoaded = this.visualization.isLoaded && this.visualization.isLoaded();
            Promise.resolve(visLoaded).then(onInit);
        }
        // We know that containerDiv.current will never be null, since we will always
        // have rendered and the div is always rendered into the tree (i.e. not
        // inside any condition).
        this.resizeChecker = new resize_checker_1.ResizeChecker(this.containerDiv.current);
        this.resizeChecker.on('resize', () => this.startRenderVisualization());
        this.startRenderVisualization();
    }
    componentDidUpdate() {
        this.startRenderVisualization();
    }
    componentWillUnmount() {
        if (this.renderSubscription) {
            this.renderSubscription.unsubscribe();
        }
        if (this.resizeChecker) {
            this.resizeChecker.destroy();
        }
        if (this.visualization) {
            this.visualization.destroy();
        }
    }
    startRenderVisualization() {
        if (this.containerDiv.current && this.chartDiv.current) {
            this.renderSubject.next({
                vis: this.props.vis,
                visData: this.props.visData,
                container: this.containerDiv.current,
            });
        }
    }
}
exports.VisualizationChart = VisualizationChart;
