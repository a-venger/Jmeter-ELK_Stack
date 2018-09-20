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
/**
 * Create an observable that mirrors a promise. If the promise resolves the
 * observable will emit the resolved value and then complete. If it rejects then
 * the observable will error.
 *
 * @param {Promise<T>}
 * @return {Observable<T>}
 */
function $fromPromise(promise) {
    return new observable_1.Observable(observer => {
        promise.then(value => {
            observer.next(value);
            observer.complete();
        }, error => {
            observer.error(error);
        });
    });
}
exports.$fromPromise = $fromPromise;
