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
const actions_1 = require("../actions");
const updateTitle = (metadata, title) => ({
    ...metadata,
    title,
});
const updateDescription = (metadata, description) => ({
    ...metadata,
    description,
});
exports.metadataReducer = (metadata = {
    description: '',
    title: '',
}, action) => {
    switch (action.type) {
        case actions_1.MetadataActionTypeKeys.UPDATE_TITLE:
            return updateTitle(metadata, action.payload);
        case actions_1.MetadataActionTypeKeys.UPDATE_DESCRIPTION:
            return updateDescription(metadata, action.payload);
        default:
            return metadata;
    }
};
