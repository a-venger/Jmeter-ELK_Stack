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
const actions_1 = require("../actions");
const embeddableIsInitializing = (embeddables, panelId) => ({
    ...embeddables,
    [panelId]: {
        error: undefined,
        initialized: false,
        metadata: {},
        stagedFilter: undefined,
    },
});
const embeddableIsInitialized = (embeddables, { panelId, metadata }) => ({
    ...embeddables,
    [panelId]: {
        ...embeddables[panelId],
        initialized: true,
        metadata: { ...metadata },
    },
});
const setStagedFilter = (embeddables, { panelId, stagedFilter }) => ({
    ...embeddables,
    [panelId]: {
        ...embeddables[panelId],
        stagedFilter,
    },
});
const embeddableError = (embeddables, payload) => ({
    ...embeddables,
    [payload.panelId]: {
        ...embeddables[payload.panelId],
        error: payload.error,
    },
});
const clearStagedFilters = (embeddables) => {
    const omitStagedFilters = (embeddable) => lodash_1.default.omit({ ...embeddable }, ['stagedFilter']);
    return lodash_1.default.mapValues(embeddables, omitStagedFilters);
};
const deleteEmbeddable = (embeddables, panelId) => {
    const embeddablesCopy = { ...embeddables };
    delete embeddablesCopy[panelId];
    return embeddablesCopy;
};
exports.embeddablesReducer = (embeddables = {}, action) => {
    switch (action.type) {
        case actions_1.EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZING:
            return embeddableIsInitializing(embeddables, action.payload);
        case actions_1.EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZED:
            return embeddableIsInitialized(embeddables, action.payload);
        case actions_1.EmbeddableActionTypeKeys.SET_STAGED_FILTER:
            return setStagedFilter(embeddables, action.payload);
        case actions_1.EmbeddableActionTypeKeys.CLEAR_STAGED_FILTERS:
            return clearStagedFilters(embeddables);
        case actions_1.EmbeddableActionTypeKeys.EMBEDDABLE_ERROR:
            return embeddableError(embeddables, action.payload);
        case actions_1.PanelActionTypeKeys.DELETE_PANEL:
            return deleteEmbeddable(embeddables, action.payload);
        default:
            return embeddables;
    }
};
