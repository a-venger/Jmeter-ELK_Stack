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
const type_detect_1 = __importDefault(require("type-detect"));
const errors_1 = require("../errors");
const internals_1 = require("../internals");
const type_1 = require("./type");
class MapOfType extends type_1.Type {
    constructor(keyType, valueType, options = {}) {
        const defaultValue = options.defaultValue;
        const schema = internals_1.internals.map().entries(keyType.getSchema(), valueType.getSchema());
        super(schema, {
            ...options,
            // Joi clones default values with `Hoek.clone`, and there is bug in cloning
            // of Map/Set/Promise/Error: https://github.com/hapijs/hoek/issues/228.
            // The only way to avoid cloning and hence the bug is to use function for
            // default value instead.
            defaultValue: defaultValue instanceof Map ? () => defaultValue : defaultValue,
        });
    }
    handleError(type, { entryKey, reason, value }, path) {
        switch (type) {
            case 'any.required':
            case 'map.base':
                return `expected value of type [Map] or [object] but got [${type_detect_1.default(value)}]`;
            case 'map.key':
            case 'map.value':
                const childPathWithIndex = reason.path.slice();
                childPathWithIndex.splice(path.length, 0, entryKey.toString());
                return new errors_1.SchemaTypeError(reason.message, childPathWithIndex);
        }
    }
}
exports.MapOfType = MapOfType;
