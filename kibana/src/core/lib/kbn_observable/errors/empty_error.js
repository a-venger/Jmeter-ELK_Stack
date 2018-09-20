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
class EmptyError extends Error {
    constructor(producer) {
        super(`EmptyError: ${producer} requires source stream to emit at least one value.`);
        this.code = 'K$_EMPTY_ERROR';
        // We're forching this to `any` as `captureStackTrace` is not a standard
        // property, but a v8 specific one. There are node typings that we might
        // want to use, see https://github.com/DefinitelyTyped/DefinitelyTyped/blob/master/types/node/index.d.ts#L47
        Error.captureStackTrace(this, EmptyError);
    }
}
exports.EmptyError = EmptyError;
