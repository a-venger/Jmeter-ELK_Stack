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
/**
 * IMPORTANT: If you make changes to this API, please make sure to check that
 * the docs (docs/development/visualize/development-create-visualization.asciidoc)
 * are up to date.
 */
const chrome_1 = __importDefault(require("../../chrome"));
const query_filter_1 = require("../../filter_bar/query_filter");
const embedded_visualize_handler_1 = require("./embedded_visualize_handler");
class VisualizeLoader {
    constructor(savedVisualizations, Private) {
        this.savedVisualizations = savedVisualizations;
        this.Private = Private;
    }
    /**
     * Renders a saved visualization specified by its id into a DOM element.
     *
     * @param element The DOM element to render the visualization into.
     *    You can alternatively pass a jQuery element instead.
     * @param id The id of the saved visualization. This is the id of the
     *    saved object that is stored in the .kibana index.
     * @param params A list of parameters that will influence rendering.
     *
     * @return A promise that resolves to the
     *    handler for this visualization as soon as the saved object could be found.
     */
    async embedVisualizationWithId(element, savedVisualizationId, params) {
        return new Promise((resolve, reject) => {
            this.savedVisualizations.get(savedVisualizationId).then((savedObj) => {
                const handler = this.renderVis(element, savedObj, params);
                resolve(handler);
            }, reject);
        });
    }
    /**
     * Renders a saved visualization specified by its savedObject into a DOM element.
     * In most of the cases you will need this method, since it allows you to specify
     * filters, handlers, queries, etc. on the savedObject before rendering.
     *
     * @param element The DOM element to render the visualization into.
     *    You can alternatively pass a jQuery element instead.
     * @param savedObj The savedObject as it could be retrieved by the
     *    `savedVisualizations` service.
     * @param params A list of parameters that will influence rendering.
     *
     * @return The handler to the visualization.
     */
    embedVisualizationWithSavedObject(el, savedObj, params) {
        return this.renderVis(el, savedObj, params);
    }
    /**
     * Returns a promise, that resolves to a list of all saved visualizations.
     *
     * @return Resolves with a list of all saved visualizations as
     *    returned by the `savedVisualizations` service in Kibana.
     */
    getVisualizationList() {
        return this.savedVisualizations.find().then((result) => result.hits);
    }
    renderVis(container, savedObj, params) {
        const { vis, description, searchSource } = savedObj;
        vis.description = description;
        vis.searchSource = searchSource;
        if (!params.append) {
            container.innerHTML = '';
        }
        const element = document.createElement('div');
        element.className = 'visualize';
        element.setAttribute('data-test-subj', 'visualizationLoader');
        container.appendChild(element);
        // If params specified cssClass, we will set this to the element.
        if (params.cssClass) {
            params.cssClass.split(' ').forEach(cssClass => {
                element.classList.add(cssClass);
            });
        }
        // Apply data- attributes to the element if specified
        const dataAttrs = params.dataAttrs;
        if (dataAttrs) {
            Object.keys(dataAttrs).forEach(key => {
                element.setAttribute(`data-${key}`, dataAttrs[key]);
            });
        }
        const handlerParams = {
            ...params,
            // lets add query filter angular service to the params
            queryFilter: this.Private(query_filter_1.FilterBarQueryFilterProvider),
            // lets add Private to the params, we'll need to pass it to visualize later
            Private: this.Private,
        };
        return new embedded_visualize_handler_1.EmbeddedVisualizeHandler(element, savedObj, handlerParams);
    }
}
function VisualizeLoaderProvider(savedVisualizations, Private) {
    return new VisualizeLoader(savedVisualizations, Private);
}
exports.VisualizeLoaderProvider = VisualizeLoaderProvider;
/**
 * Returns a promise, that resolves with the visualize loader, once it's ready.
 * @return A promise, that resolves to the visualize loader.
 */
function getVisualizeLoader() {
    return chrome_1.default.dangerouslyGetActiveInjector().then($injector => {
        const Private = $injector.get('Private');
        return Private(VisualizeLoaderProvider);
    });
}
exports.getVisualizeLoader = getVisualizeLoader;
