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
const redux_actions_1 = require("redux-actions");
var PanelActionTypeKeys;
(function (PanelActionTypeKeys) {
    PanelActionTypeKeys["DELETE_PANEL"] = "DELETE_PANEL";
    PanelActionTypeKeys["UPDATE_PANEL"] = "UPDATE_PANEL";
    PanelActionTypeKeys["RESET_PANEl_TITLE"] = "RESET_PANEl_TITLE";
    PanelActionTypeKeys["SET_PANEl_TITLE"] = "SET_PANEl_TITLE";
    PanelActionTypeKeys["UPDATE_PANELS"] = "UPDATE_PANELS";
    PanelActionTypeKeys["SET_PANELS"] = "SET_PANELS";
})(PanelActionTypeKeys = exports.PanelActionTypeKeys || (exports.PanelActionTypeKeys = {}));
exports.deletePanel = redux_actions_1.createAction(PanelActionTypeKeys.DELETE_PANEL);
exports.updatePanel = redux_actions_1.createAction(PanelActionTypeKeys.UPDATE_PANEL);
exports.resetPanelTitle = redux_actions_1.createAction(PanelActionTypeKeys.RESET_PANEl_TITLE);
exports.setPanelTitle = redux_actions_1.createAction(PanelActionTypeKeys.SET_PANEl_TITLE);
exports.updatePanels = redux_actions_1.createAction(PanelActionTypeKeys.UPDATE_PANELS);
exports.setPanels = redux_actions_1.createAction(PanelActionTypeKeys.SET_PANELS);
