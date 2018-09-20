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
const events_1 = require("events");
const lodash_1 = require("lodash");
const render_complete_1 = require("../../render_complete");
const timefilter_1 = require("../../timefilter");
const visualization_loader_1 = require("./visualization_loader");
const visualize_data_loader_1 = require("./visualize_data_loader");
const RENDER_COMPLETE_EVENT = 'render_complete';
/**
 * A handler to the embedded visualization. It offers several methods to interact
 * with the visualization.
 */
class EmbeddedVisualizeHandler {
    constructor(element, savedObject, params) {
        this.element = element;
        this.loaded = false;
        this.destroyed = false;
        this.listeners = new events_1.EventEmitter();
        this.shouldForceNextFetch = false;
        this.debouncedFetchAndRender = lodash_1.debounce(() => {
            if (this.destroyed) {
                return;
            }
            const forceFetch = this.shouldForceNextFetch;
            this.shouldForceNextFetch = false;
            this.fetch(forceFetch).then(this.render);
        }, 100);
        this.onUiStateChange = () => {
            this.fetchAndRender();
        };
        /**
         * Fetches new data and renders the chart. This will happen debounced for a couple
         * of milliseconds, to bundle fast successive calls into one fetch and render,
         * e.g. while resizing the window, this will be triggered constantly on the resize
         * event.
         *
         * @param  forceFetch=false Whether the request handler should be signaled to forceFetch
         *    (i.e. ignore caching in case it supports it). If at least one call to this
         *    passed `true` the debounced fetch and render will be a force fetch.
         */
        this.fetchAndRender = (forceFetch = false) => {
            this.shouldForceNextFetch = forceFetch || this.shouldForceNextFetch;
            this.debouncedFetchAndRender();
        };
        this.handleVisUpdate = () => {
            if (this.appState) {
                this.appState.vis = this.vis.getState();
                this.appState.save();
            }
            this.fetchAndRender();
        };
        /**
         * Force the fetch of new data and renders the chart again.
         */
        this.reload = () => {
            this.fetchAndRender(true);
        };
        this.fetch = (forceFetch = false) => {
            this.dataLoaderParams.aggs = this.vis.getAggConfig();
            this.dataLoaderParams.forceFetch = forceFetch;
            return this.dataLoader.fetch(this.dataLoaderParams);
        };
        this.render = (visData = null) => {
            return visualization_loader_1.visualizationLoader
                .render(this.element, this.vis, visData, this.uiState, {
                listenOnChange: false,
            })
                .then(() => {
                if (!this.loaded) {
                    this.loaded = true;
                    this.fetchAndRender();
                }
            });
        };
        const { searchSource, vis } = savedObject;
        const { appState, uiState, queryFilter, timeRange, filters, query, Private } = params;
        this.dataLoaderParams = {
            searchSource,
            timeRange,
            query,
            queryFilter,
            filters,
            uiState,
            aggs: vis.getAggConfig(),
            forceFetch: false,
        };
        // Listen to the first RENDER_COMPLETE_EVENT to resolve this promise
        this.firstRenderComplete = new Promise(resolve => {
            this.listeners.once(RENDER_COMPLETE_EVENT, resolve);
        });
        this.onRenderCompleteListener = () => {
            this.listeners.emit(RENDER_COMPLETE_EVENT);
        };
        element.addEventListener('renderComplete', this.onRenderCompleteListener);
        this.appState = appState;
        this.vis = vis;
        if (uiState) {
            vis._setUiState(uiState);
        }
        this.uiState = this.vis.getUiState();
        this.vis.on('update', this.handleVisUpdate);
        this.vis.on('reload', this.reload);
        this.uiState.on('change', this.onUiStateChange);
        timefilter_1.timefilter.on('autoRefreshFetch', this.reload);
        this.dataLoader = new visualize_data_loader_1.VisualizeDataLoader(vis, Private);
        this.renderCompleteHelper = new render_complete_1.RenderCompleteHelper(element);
        this.render();
    }
    /**
     * Update properties of the embedded visualization. This method does not allow
     * updating all initial parameters, but only a subset of the ones allowed
     * in {@link VisualizeUpdateParams}.
     *
     * @param params The parameters that should be updated.
     */
    update(params = {}) {
        // Apply data- attributes to the element if specified
        const dataAttrs = params.dataAttrs;
        if (dataAttrs) {
            Object.keys(dataAttrs).forEach(key => {
                if (dataAttrs[key] === null) {
                    this.element.removeAttribute(`data-${key}`);
                    return;
                }
                this.element.setAttribute(`data-${key}`, dataAttrs[key]);
            });
        }
        let fetchRequired = false;
        if (params.hasOwnProperty('timeRange')) {
            fetchRequired = true;
            this.dataLoaderParams.timeRange = params.timeRange;
        }
        if (params.hasOwnProperty('filters')) {
            fetchRequired = true;
            this.dataLoaderParams.filters = params.filters;
        }
        if (params.hasOwnProperty('query')) {
            fetchRequired = true;
            this.dataLoaderParams.query = params.query;
        }
        if (fetchRequired) {
            this.fetchAndRender();
        }
    }
    /**
     * Destroy the underlying Angular scope of the visualization. This should be
     * called whenever you remove the visualization.
     */
    destroy() {
        this.destroyed = true;
        this.debouncedFetchAndRender.cancel();
        timefilter_1.timefilter.off('autoRefreshFetch', this.reload);
        this.vis.removeListener('reload', this.reload);
        this.vis.removeListener('update', this.handleVisUpdate);
        this.element.removeEventListener('renderComplete', this.onRenderCompleteListener);
        this.uiState.off('change', this.onUiStateChange);
        visualization_loader_1.visualizationLoader.destroy(this.element);
        this.renderCompleteHelper.destroy();
    }
    /**
     * Return the actual DOM element (wrapped in jQuery) of the rendered visualization.
     * This is especially useful if you used `append: true` in the parameters where
     * the visualization will be appended to the specified container.
     */
    getElement() {
        return this.element;
    }
    /**
     * Opens the inspector for the embedded visualization. This will return an
     * handler to the inspector to close and interact with it.
     * @return An inspector session to interact with the opened inspector.
     */
    openInspector() {
        return this.vis.openInspector();
    }
    /**
     * Returns a promise, that will resolve (without a value) once the first rendering of
     * the visualization has finished. If you want to listen to consecutive rendering
     * events, look into the `addRenderCompleteListener` method.
     *
     * @returns Promise, that resolves as soon as the visualization is done rendering
     *    for the first time.
     */
    whenFirstRenderComplete() {
        return this.firstRenderComplete;
    }
    /**
     * Adds a listener to be called whenever the visualization finished rendering.
     * This can be called multiple times, when the visualization rerenders, e.g. due
     * to new data.
     *
     * @param {function} listener The listener to be notified about complete renders.
     */
    addRenderCompleteListener(listener) {
        this.listeners.addListener(RENDER_COMPLETE_EVENT, listener);
    }
    /**
     * Removes a previously registered render complete listener from this handler.
     * This listener will no longer be called when the visualization finished rendering.
     *
     * @param {function} listener The listener to remove from this handler.
     */
    removeRenderCompleteListener(listener) {
        this.listeners.removeListener(RENDER_COMPLETE_EVENT, listener);
    }
}
exports.EmbeddedVisualizeHandler = EmbeddedVisualizeHandler;
