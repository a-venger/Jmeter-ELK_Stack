"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A registry to store {@link AggTypeFieldFilter} which are used to filter down
 * available fields for a specific visualization and {@link AggType}.
 */
class AggTypeFieldFilters {
    constructor() {
        this.filters = new Set();
    }
    /**
     * Register a new {@link AggTypeFieldFilter} with this registry.
     * This will be used by the {@link #filter|filter method}.
     *
     * @param filter The filter to register.
     */
    addFilter(filter) {
        this.filters.add(filter);
    }
    /**
     * Returns the {@link any|fields} filtered by all registered filters.
     *
     * @param fields A list of fields that will be filtered down by this registry.
     * @param fieldParamType The fieldParamType for which the returning list will be used.
     * @param indexPattern The indexPattern for which the returning list will be used.
     * @param aggConfig The aggConfig for which the returning list will be used.
     * @return A filtered list of the passed fields.
     */
    filter(fields, fieldParamType, indexPattern, aggConfig) {
        const allFilters = Array.from(this.filters);
        const allowedAggTypeFields = fields.filter(field => {
            const isAggTypeFieldAllowed = allFilters.every(filter => filter(field, fieldParamType, indexPattern, aggConfig));
            return isAggTypeFieldAllowed;
        });
        return allowedAggTypeFields;
    }
}
exports.AggTypeFieldFilters = AggTypeFieldFilters;
const aggTypeFieldFilters = new AggTypeFieldFilters();
exports.aggTypeFieldFilters = aggTypeFieldFilters;
