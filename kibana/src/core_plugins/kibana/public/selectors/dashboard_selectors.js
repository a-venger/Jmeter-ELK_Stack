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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const DashboardSelectors = __importStar(require("../dashboard/selectors"));
exports.getDashboard = (state) => state.dashboard;
exports.getPanels = (state) => DashboardSelectors.getPanels(exports.getDashboard(state));
exports.getPanel = (state, panelId) => DashboardSelectors.getPanel(exports.getDashboard(state), panelId);
exports.getPanelType = (state, panelId) => DashboardSelectors.getPanelType(exports.getDashboard(state), panelId);
exports.getEmbeddables = (state) => DashboardSelectors.getEmbeddables(exports.getDashboard(state));
exports.getEmbeddableError = (state, panelId) => DashboardSelectors.getEmbeddableError(exports.getDashboard(state), panelId);
exports.getEmbeddableInitialized = (state, panelId) => DashboardSelectors.getEmbeddableInitialized(exports.getDashboard(state), panelId);
exports.getEmbeddableCustomization = (state, panelId) => DashboardSelectors.getEmbeddableCustomization(exports.getDashboard(state), panelId);
exports.getEmbeddableStagedFilter = (state, panelId) => DashboardSelectors.getEmbeddableStagedFilter(exports.getDashboard(state), panelId);
exports.getEmbeddableMetadata = (state, panelId) => DashboardSelectors.getEmbeddableMetadata(exports.getDashboard(state), panelId);
exports.getStagedFilters = (state) => DashboardSelectors.getStagedFilters(exports.getDashboard(state));
exports.getViewMode = (state) => DashboardSelectors.getViewMode(exports.getDashboard(state));
exports.getFullScreenMode = (state) => DashboardSelectors.getFullScreenMode(exports.getDashboard(state));
exports.getMaximizedPanelId = (state) => DashboardSelectors.getMaximizedPanelId(exports.getDashboard(state));
exports.getUseMargins = (state) => DashboardSelectors.getUseMargins(exports.getDashboard(state));
exports.getHidePanelTitles = (state) => DashboardSelectors.getHidePanelTitles(exports.getDashboard(state));
exports.getTimeRange = (state) => DashboardSelectors.getTimeRange(exports.getDashboard(state));
exports.getFilters = (state) => DashboardSelectors.getFilters(exports.getDashboard(state));
exports.getQuery = (state) => DashboardSelectors.getQuery(exports.getDashboard(state));
exports.getTitle = (state) => DashboardSelectors.getTitle(exports.getDashboard(state));
exports.getDescription = (state) => DashboardSelectors.getDescription(exports.getDashboard(state));
