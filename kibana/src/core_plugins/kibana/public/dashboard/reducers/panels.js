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
const deletePanel = (panels, panelId) => {
    const panelsCopy = { ...panels };
    delete panelsCopy[panelId];
    return panelsCopy;
};
const updatePanel = (panels, panelState) => ({
    ...panels,
    [panelState.panelIndex]: panelState,
});
const updatePanels = (panels, updatedPanels) => {
    const panelsCopy = { ...panels };
    Object.values(updatedPanels).forEach(panel => {
        panelsCopy[panel.panelIndex] = panel;
    });
    return panelsCopy;
};
const resetPanelTitle = (panels, panelId) => ({
    ...panels,
    [panelId]: {
        ...panels[panelId],
        title: undefined,
    },
});
const setPanelTitle = (panels, payload) => ({
    ...panels,
    [payload.panelId]: {
        ...panels[payload.panelId],
        title: payload.title,
    },
});
const setPanels = (panels, newPanels) => lodash_1.default.cloneDeep(newPanels);
exports.panelsReducer = (panels = {}, action) => {
    switch (action.type) {
        case actions_1.PanelActionTypeKeys.DELETE_PANEL:
            return deletePanel(panels, action.payload);
        case actions_1.PanelActionTypeKeys.UPDATE_PANEL:
            return updatePanel(panels, action.payload);
        case actions_1.PanelActionTypeKeys.UPDATE_PANELS:
            return updatePanels(panels, action.payload);
        case actions_1.PanelActionTypeKeys.RESET_PANEl_TITLE:
            return resetPanelTitle(panels, action.payload);
        case actions_1.PanelActionTypeKeys.SET_PANEl_TITLE:
            return setPanelTitle(panels, action.payload);
        case actions_1.PanelActionTypeKeys.SET_PANELS:
            return setPanels(panels, action.payload);
        default:
            return panels;
    }
};
