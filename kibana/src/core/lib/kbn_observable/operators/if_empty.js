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
const factories_1 = require("../factories");
const observable_1 = require("../observable");
/**
 * Modifies a stream so that when the source completes without emitting any
 * values a new observable is created via `factory()` (see `$fromCallback`) that
 * will be mirrored to completion.
 *
 * @param factory
 * @return
 */
function ifEmpty(factory) {
    return function ifEmptyOperation(source) {
        return new observable_1.Observable(observer => {
            let hasReceivedValue = false;
            const subs = [
                source.subscribe({
                    next(value) {
                        hasReceivedValue = true;
                        observer.next(value);
                    },
                    error(error) {
                        observer.error(error);
                    },
                    complete() {
                        if (hasReceivedValue) {
                            observer.complete();
                        }
                        else {
                            subs.push(factories_1.$fromCallback(factory).subscribe(observer));
                        }
                    },
                }),
            ];
            return () => {
                subs.forEach(sub => sub.unsubscribe());
                subs.length = 0;
            };
        });
    };
}
exports.ifEmpty = ifEmpty;
