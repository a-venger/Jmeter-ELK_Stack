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
const redux_actions_1 = require("redux-actions");
const selectors_1 = require("../../selectors");
const panels_1 = require("./panels");
var EmbeddableActionTypeKeys;
(function (EmbeddableActionTypeKeys) {
    EmbeddableActionTypeKeys["EMBEDDABLE_IS_INITIALIZING"] = "EMBEDDABLE_IS_INITIALIZING";
    EmbeddableActionTypeKeys["EMBEDDABLE_IS_INITIALIZED"] = "EMBEDDABLE_IS_INITIALIZED";
    EmbeddableActionTypeKeys["SET_STAGED_FILTER"] = "SET_STAGED_FILTER";
    EmbeddableActionTypeKeys["CLEAR_STAGED_FILTERS"] = "CLEAR_STAGED_FILTERS";
    EmbeddableActionTypeKeys["EMBEDDABLE_ERROR"] = "EMBEDDABLE_ERROR";
})(EmbeddableActionTypeKeys = exports.EmbeddableActionTypeKeys || (exports.EmbeddableActionTypeKeys = {}));
exports.embeddableIsInitializing = redux_actions_1.createAction(EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZING);
exports.embeddableIsInitialized = redux_actions_1.createAction(EmbeddableActionTypeKeys.EMBEDDABLE_IS_INITIALIZED);
exports.setStagedFilter = redux_actions_1.createAction(EmbeddableActionTypeKeys.SET_STAGED_FILTER);
exports.clearStagedFilters = redux_actions_1.createAction(EmbeddableActionTypeKeys.CLEAR_STAGED_FILTERS);
exports.embeddableError = redux_actions_1.createAction(EmbeddableActionTypeKeys.EMBEDDABLE_ERROR);
/**
 * The main point of communication from the embeddable to the dashboard. Any time state in the embeddable
 * changes, this function will be called. The data is then extracted from EmbeddableState and stored in
 * redux so the appropriate actions are taken and UI updated.
 *
 * @param changeData.panelId - the id of the panel whose state has changed.
 * @param changeData.embeddableState - the new state of the embeddable.
 */
function embeddableStateChanged(changeData) {
    const { panelId, embeddableState } = changeData;
    return (dispatch, getState) => {
        // Translate embeddableState to things redux cares about.
        const customization = selectors_1.getEmbeddableCustomization(getState(), panelId);
        if (!lodash_1.default.isEqual(embeddableState.customization, customization)) {
            const originalPanelState = selectors_1.getPanel(getState(), panelId);
            const newPanelState = {
                ...originalPanelState,
                embeddableConfig: lodash_1.default.cloneDeep(embeddableState.customization),
            };
            dispatch(panels_1.updatePanel(newPanelState));
        }
        if (embeddableState.stagedFilter) {
            dispatch(exports.setStagedFilter({ stagedFilter: embeddableState.stagedFilter, panelId }));
        }
    };
}
exports.embeddableStateChanged = embeddableStateChanged;
