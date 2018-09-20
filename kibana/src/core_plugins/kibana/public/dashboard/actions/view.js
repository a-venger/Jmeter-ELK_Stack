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
var ViewActionTypeKeys;
(function (ViewActionTypeKeys) {
    ViewActionTypeKeys["UPDATE_VIEW_MODE"] = "UPDATE_VIEW_MODE";
    ViewActionTypeKeys["SET_VISIBLE_CONTEXT_MENU_PANEL_ID"] = "SET_VISIBLE_CONTEXT_MENU_PANEL_ID";
    ViewActionTypeKeys["MAXIMIZE_PANEl"] = "MAXIMIZE_PANEl";
    ViewActionTypeKeys["MINIMIZE_PANEL"] = "MINIMIZE_PANEL";
    ViewActionTypeKeys["UPDATE_IS_FULL_SCREEN_MODE"] = "UPDATE_IS_FULL_SCREEN_MODE";
    ViewActionTypeKeys["UPDATE_USE_MARGINS"] = "UPDATE_USE_MARGINS";
    ViewActionTypeKeys["UPDATE_HIDE_PANEL_TITLES"] = "UPDATE_HIDE_PANEL_TITLES";
    ViewActionTypeKeys["UPDATE_TIME_RANGE"] = "UPDATE_TIME_RANGE";
    ViewActionTypeKeys["UPDATE_FILTERS"] = "UPDATE_FILTERS";
    ViewActionTypeKeys["UPDATE_QUERY"] = "UPDATE_QUERY";
})(ViewActionTypeKeys = exports.ViewActionTypeKeys || (exports.ViewActionTypeKeys = {}));
exports.updateViewMode = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_VIEW_MODE);
exports.setVisibleContextMenuPanelId = redux_actions_1.createAction(ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID);
exports.maximizePanel = redux_actions_1.createAction(ViewActionTypeKeys.MAXIMIZE_PANEl);
exports.minimizePanel = redux_actions_1.createAction(ViewActionTypeKeys.MINIMIZE_PANEL);
exports.updateIsFullScreenMode = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE);
exports.updateUseMargins = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_USE_MARGINS);
exports.updateHidePanelTitles = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES);
exports.updateTimeRange = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_TIME_RANGE);
exports.updateFilters = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_FILTERS);
exports.updateQuery = redux_actions_1.createAction(ViewActionTypeKeys.UPDATE_QUERY);
