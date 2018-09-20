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
 * Converts a Node.js-style callback API to a function that returns an
 * Observable.
 *
 * Does NOT handle functions whose callbacks have
 * more than two parameters. Only the first value after the
 * error argument will be returned.
 *
 * Example: Read a file from the filesystem and get the data as an Observable:
 *
 *     import fs from 'fs';
 *     var readFileAsObservable = $bindNodeCallback(fs.readFile);
 *     var result = readFileAsObservable('./roadNames.txt', 'utf8');
 *     result.subscribe(
 *       x => console.log(x),
 *       e => console.error(e)
 *     );
 */
function $bindNodeCallback(callbackFunc) {
    return function (...args) {
        const context = this;
        return new observable_1.Observable(observer => {
            function handlerFn(err, val, ...rest) {
                if (err != null) {
                    observer.error(err);
                }
                else if (rest.length > 0) {
                    // If we've received more than two arguments, the function doesn't
                    // follow the common Node.js callback style. We could return an array
                    // if that happened, but as most code follow the pattern we don't
                    // special case it for now.
                    observer.error(new Error('Node callback called with too many args'));
                }
                else {
                    observer.next(val);
                    observer.complete();
                }
            }
            callbackFunc.apply(context, args.concat([handlerFn]));
        });
    };
}
exports.$bindNodeCallback = $bindNodeCallback;
