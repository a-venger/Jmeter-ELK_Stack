"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const filter_1 = require("../../../agg_types/filter");
const _prop_filter_1 = require("../../../filters/_prop_filter");
const filterByName = _prop_filter_1.propFilter('name');
/**
 * This filter checks the defined aggFilter in the schemas of that visualization
 * and limits available aggregations based on that.
 */
filter_1.aggTypeFilters.addFilter((aggType, indexPatterns, aggConfig) => {
    const doesSchemaAllowAggType = filterByName([aggType], aggConfig.schema.aggFilter).length !== 0;
    return doesSchemaAllowAggType;
});
