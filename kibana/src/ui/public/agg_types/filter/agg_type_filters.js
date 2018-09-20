"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A registry to store {@link AggTypeFilter} which are used to filter down
 * available aggregations for a specific visualization and {@link AggConfig}.
 */
class AggTypeFilters {
    constructor() {
        this.filters = new Set();
    }
    /**
     * Register a new {@link AggTypeFilter} with this registry.
     *
     * @param filter The filter to register.
     */
    addFilter(filter) {
        this.filters.add(filter);
    }
    /**
     * Returns the {@link AggType|aggTypes} filtered by all registered filters.
     *
     * @param aggTypes A list of aggTypes that will be filtered down by this registry.
     * @param indexPattern The indexPattern for which this list should be filtered down.
     * @param aggConfig The aggConfig for which the returning list will be used.
     * @return A filtered list of the passed aggTypes.
     */
    filter(aggTypes, indexPattern, aggConfig) {
        const allFilters = Array.from(this.filters);
        const allowedAggTypes = aggTypes.filter(aggType => {
            const isAggTypeAllowed = allFilters.every(filter => filter(aggType, indexPattern, aggConfig));
            return isAggTypeAllowed;
        });
        return allowedAggTypes;
    }
}
exports.AggTypeFilters = AggTypeFilters;
const aggTypeFilters = new AggTypeFilters();
exports.aggTypeFilters = aggTypeFilters;
