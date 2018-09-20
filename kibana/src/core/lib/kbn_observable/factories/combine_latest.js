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
const observable_1 = require("../observable");
const from_1 = require("./from");
const pending = Symbol('awaiting first value');
/**
 * Creates an observable that combines the values by subscribing to all
 * observables passed and emiting an array with the latest value from each
 * observable once after each observable has emitted at least once, and again
 * any time an observable emits after that.
 *
 * @param {Observable...}
 * @return {Observable}
 */
function $combineLatest(...observables) {
    return new observable_1.Observable(observer => {
        // create an array that will receive values as observables
        // update and initialize it with `pending` symbols so that
        // we know when observables emit for the first time
        const values = observables.map(() => pending);
        let needFirstCount = values.length;
        let activeCount = values.length;
        const subs = observables.map((observable, i) => from_1.$from(observable).subscribe({
            next(value) {
                if (values[i] === pending) {
                    needFirstCount--;
                }
                values[i] = value;
                if (needFirstCount === 0) {
                    observer.next(values.slice());
                }
            },
            error(error) {
                observer.error(error);
                values.length = 0;
            },
            complete() {
                activeCount--;
                if (activeCount === 0) {
                    observer.complete();
                    values.length = 0;
                }
            },
        }));
        return () => {
            subs.forEach(sub => {
                sub.unsubscribe();
            });
            values.length = 0;
        };
    });
}
exports.$combineLatest = $combineLatest;
