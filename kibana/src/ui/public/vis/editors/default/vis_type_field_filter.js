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
const filter_1 = require("../../../agg_types/param_types/filter");
const _prop_filter_1 = require("../../../filters/_prop_filter");
const filterByType = _prop_filter_1.propFilter('type');
/**
 * This filter uses the {@link FieldParamType|fieldParamType} information
 * and limits available fields based on that.
 */
filter_1.aggTypeFieldFilters.addFilter((field, fieldParamType, indexPattern, aggConfig) => {
    const { onlyAggregatable, scriptable, filterFieldTypes } = fieldParamType;
    const filters = lodash_1.isFunction(filterFieldTypes)
        ? filterFieldTypes.bind(fieldParamType, aggConfig.vis)
        : filterFieldTypes;
    if ((onlyAggregatable && !field.aggregatable) || (!scriptable && field.scripted)) {
        return false;
    }
    if (!filters) {
        return true;
    }
    return filterByType([field], filters).length !== 0;
});
