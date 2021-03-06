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
const internals_1 = require("../internals");
const type_1 = require("./type");
class ObjectType extends type_1.Type {
    constructor(props, options = {}) {
        const schemaKeys = {};
        for (const [key, value] of Object.entries(props)) {
            schemaKeys[key] = value.getSchema();
        }
        const schema = internals_1.internals
            .object()
            .keys(schemaKeys)
            .optional()
            .default();
        super(schema, options);
    }
    handleError(type, { reason, value }) {
        switch (type) {
            case 'any.required':
            case 'object.base':
                return `expected a plain object value, but found [${type_detect_1.default(value)}] instead.`;
            case 'object.allowUnknown':
                return `definition for this key is missing`;
            case 'object.child':
                return reason[0];
        }
    }
}
exports.ObjectType = ObjectType;
