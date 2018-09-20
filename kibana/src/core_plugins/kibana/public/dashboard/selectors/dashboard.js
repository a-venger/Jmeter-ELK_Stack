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
exports.getPanels = (dashboard) => dashboard.panels;
exports.getPanel = (dashboard, panelId) => exports.getPanels(dashboard)[panelId];
exports.getPanelType = (dashboard, panelId) => exports.getPanel(dashboard, panelId).type;
exports.getEmbeddables = (dashboard) => dashboard.embeddables;
// TODO: rename panel.embeddableConfig to embeddableCustomization. Because it's on the panel that's stored on a
// dashboard, renaming this will require a migration step.
exports.getEmbeddableCustomization = (dashboard, panelId) => exports.getPanel(dashboard, panelId).embeddableConfig;
exports.getEmbeddable = (dashboard, panelId) => dashboard.embeddables[panelId];
exports.getEmbeddableError = (dashboard, panelId) => exports.getEmbeddable(dashboard, panelId).error;
exports.getEmbeddableTitle = (dashboard, panelId) => {
    const embeddable = exports.getEmbeddable(dashboard, panelId);
    return embeddable && embeddable.initialized && embeddable.metadata
        ? embeddable.metadata.title
        : '';
};
exports.getEmbeddableInitialized = (dashboard, panelId) => exports.getEmbeddable(dashboard, panelId).initialized;
exports.getEmbeddableStagedFilter = (dashboard, panelId) => exports.getEmbeddable(dashboard, panelId).stagedFilter;
exports.getEmbeddableMetadata = (dashboard, panelId) => exports.getEmbeddable(dashboard, panelId).metadata;
exports.getEmbeddableEditUrl = (dashboard, panelId) => {
    const embeddable = exports.getEmbeddable(dashboard, panelId);
    return embeddable && embeddable.initialized && embeddable.metadata
        ? embeddable.metadata.editUrl
        : '';
};
exports.getVisibleContextMenuPanelId = (dashboard) => dashboard.view.visibleContextMenuPanelId;
exports.getUseMargins = (dashboard) => dashboard.view.useMargins;
exports.getViewMode = (dashboard) => dashboard.view.viewMode;
exports.getFullScreenMode = (dashboard) => dashboard.view.isFullScreenMode;
exports.getHidePanelTitles = (dashboard) => dashboard.view.hidePanelTitles;
exports.getMaximizedPanelId = (dashboard) => dashboard.view.maximizedPanelId;
exports.getTimeRange = (dashboard) => dashboard.view.timeRange;
exports.getFilters = (dashboard) => dashboard.view.filters;
exports.getQuery = (dashboard) => dashboard.view.query;
exports.getMetadata = (dashboard) => dashboard.metadata;
exports.getTitle = (dashboard) => dashboard.metadata.title;
exports.getDescription = (dashboard) => dashboard.metadata.description;
exports.getContainerState = (dashboard, panelId) => {
    const time = exports.getTimeRange(dashboard);
    return {
        customTitle: exports.getPanel(dashboard, panelId).title,
        embeddableCustomization: lodash_1.default.cloneDeep(exports.getEmbeddableCustomization(dashboard, panelId) || {}),
        filters: exports.getFilters(dashboard),
        hidePanelTitles: exports.getHidePanelTitles(dashboard),
        isPanelExpanded: exports.getMaximizedPanelId(dashboard) === panelId,
        query: exports.getQuery(dashboard),
        timeRange: {
            from: time.from,
            to: time.to,
        },
        viewMode: exports.getViewMode(dashboard),
    };
};
/**
 * @return an array of filters any embeddables wish dashboard to apply
 */
exports.getStagedFilters = (dashboard) => lodash_1.default.compact(lodash_1.default.map(dashboard.embeddables, 'stagedFilter'));
