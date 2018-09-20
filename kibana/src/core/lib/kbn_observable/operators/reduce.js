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
const lib_1 = require("../lib");
const if_empty_1 = require("./if_empty");
const last_1 = require("./last");
const scan_1 = require("./scan");
/**
 * Applies the accumulator function to every value in the source observable and
 * emits the return value when the source completes.
 *
 * It's like {@link scan}, but only emits when the source observable completes,
 * not the current accumulation whenever the source emits a value.
 *
 * If no values are emitted, the `initialValue` will be emitted.
 *
 * @param accumulator The accumulator function called on each source value.
 * @param initialValue The initial accumulation value.
 * @return An Observable that emits a single value that is the result of
 * accumulating the values emitted by the source Observable.
 */
function reduce(accumulator, initialValue) {
    return function reduceOperation(source) {
        return lib_1.pipe(scan_1.scan(accumulator, initialValue), if_empty_1.ifEmpty(() => initialValue), last_1.last())(source);
    };
}
exports.reduce = reduce;
