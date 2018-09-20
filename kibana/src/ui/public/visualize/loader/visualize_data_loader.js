"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const lodash_1 = require("lodash");
const vis_request_handlers_1 = require("../../registry/vis_request_handlers");
const vis_response_handlers_1 = require("../../registry/vis_response_handlers");
// @ts-ignore No typing present
const elasticsearch_errors_1 = require("../../elasticsearch_errors");
const notify_1 = require("ui/notify");
function getHandler(from, type) {
    if (typeof type === 'function') {
        return type;
    }
    const handlerDesc = from.find(handler => handler.name === type);
    if (!handlerDesc) {
        throw new Error(`Could not find handler "${type}".`);
    }
    return handlerDesc.handler;
}
class VisualizeDataLoader {
    constructor(vis, Private) {
        this.vis = vis;
        const { requestHandler, responseHandler } = vis.type;
        const requestHandlers = Private(vis_request_handlers_1.VisRequestHandlersRegistryProvider);
        const responseHandlers = Private(vis_response_handlers_1.VisResponseHandlersRegistryProvider);
        this.requestHandler = getHandler(requestHandlers, requestHandler);
        this.responseHandler = getHandler(responseHandlers, responseHandler);
    }
    async fetch(params) {
        this.vis.filters = { timeRange: params.timeRange };
        try {
            // searchSource is only there for courier request handler
            const requestHandlerResponse = await this.requestHandler(this.vis, params);
            // No need to call the response handler when there have been no data nor has been there changes
            // in the vis-state (response handler does not depend on uiStat
            const canSkipResponseHandler = this.previousRequestHandlerResponse &&
                this.previousRequestHandlerResponse === requestHandlerResponse &&
                this.previousVisState &&
                lodash_1.isEqual(this.previousVisState, this.vis.getState());
            this.previousVisState = this.vis.getState();
            this.previousRequestHandlerResponse = requestHandlerResponse;
            if (!canSkipResponseHandler) {
                this.visData = await Promise.resolve(this.responseHandler(this.vis, requestHandlerResponse));
            }
            return this.visData;
        }
        catch (e) {
            params.searchSource.cancelQueued();
            this.vis.requestError = e;
            if (elasticsearch_errors_1.isTermSizeZeroError(e)) {
                return notify_1.toastNotifications.addDanger(`Your visualization ('${this.vis.title}') has an error: it has a term ` +
                    `aggregation with a size of 0. Please set it to a number greater than 0 to resolve ` +
                    `the error.`);
            }
            notify_1.toastNotifications.addDanger({
                title: 'Error in visualization',
                text: e.message,
            });
        }
    }
}
exports.VisualizeDataLoader = VisualizeDataLoader;
