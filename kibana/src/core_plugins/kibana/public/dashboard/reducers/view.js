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
const lodash_1 = require("lodash");
const actions_1 = require("../actions");
const types_1 = require("ui/embeddable/types");
const dashboard_view_mode_1 = require("../dashboard_view_mode");
const setVisibleContextMenuPanelId = (view, panelId) => ({
    ...view,
    visibleContextMenuPanelId: panelId,
});
const updateHidePanelTitles = (view, hidePanelTitles) => ({
    ...view,
    hidePanelTitles,
});
const minimizePanel = (view) => ({
    ...view,
    maximizedPanelId: undefined,
});
const maximizePanel = (view, panelId) => ({
    ...view,
    maximizedPanelId: panelId,
});
const updateIsFullScreenMode = (view, isFullScreenMode) => ({
    ...view,
    isFullScreenMode,
});
const updateTimeRange = (view, timeRange) => ({
    ...view,
    timeRange,
});
const updateFilters = (view, filters) => ({
    ...view,
    filters: lodash_1.cloneDeep(filters),
});
const updateQuery = (view, query) => ({
    ...view,
    query,
});
const updateUseMargins = (view, useMargins) => ({
    ...view,
    useMargins,
});
const updateViewMode = (view, viewMode) => ({
    ...view,
    viewMode,
});
exports.viewReducer = (view = {
    filters: [],
    hidePanelTitles: false,
    isFullScreenMode: false,
    query: { language: types_1.QueryLanguageType.LUCENE, query: '' },
    timeRange: { to: 'now', from: 'now-15m' },
    useMargins: true,
    viewMode: dashboard_view_mode_1.DashboardViewMode.VIEW,
}, action) => {
    switch (action.type) {
        case actions_1.ViewActionTypeKeys.MINIMIZE_PANEL:
            return minimizePanel(view);
        case actions_1.ViewActionTypeKeys.MAXIMIZE_PANEl:
            return maximizePanel(view, action.payload);
        case actions_1.ViewActionTypeKeys.SET_VISIBLE_CONTEXT_MENU_PANEL_ID:
            return setVisibleContextMenuPanelId(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_HIDE_PANEL_TITLES:
            return updateHidePanelTitles(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_TIME_RANGE:
            return updateTimeRange(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_USE_MARGINS:
            return updateUseMargins(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_VIEW_MODE:
            return updateViewMode(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_IS_FULL_SCREEN_MODE:
            return updateIsFullScreenMode(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_FILTERS:
            return updateFilters(view, action.payload);
        case actions_1.ViewActionTypeKeys.UPDATE_QUERY:
            return updateQuery(view, action.payload);
        default:
            return view;
    }
};
