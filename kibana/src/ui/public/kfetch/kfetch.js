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
require("isomorphic-fetch");
const lodash_1 = require("lodash");
const url_1 = __importDefault(require("url"));
const chrome_1 = __importDefault(require("../chrome"));
// @ts-ignore not really worth typing
const metadata_1 = require("../metadata");
class FetchError extends Error {
    constructor(res, body) {
        super(res.statusText);
        this.res = res;
        this.body = body;
        // captureStackTrace is only available in the V8 engine, so any browser using
        // a different JS engine won't have access to this method.
        if (Error.captureStackTrace) {
            Error.captureStackTrace(this, FetchError);
        }
    }
}
function kfetch(fetchOptions, kibanaOptions) {
    // fetch specific options with defaults
    const { pathname, query, ...combinedFetchOptions } = lodash_1.merge({
        method: 'GET',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            'kbn-version': metadata_1.metadata.version,
        },
    }, fetchOptions);
    // kibana specific options with defaults
    const combinedKibanaOptions = {
        prependBasePath: true,
        ...kibanaOptions,
    };
    const fullUrl = url_1.default.format({
        pathname: combinedKibanaOptions.prependBasePath ? chrome_1.default.addBasePath(pathname) : pathname,
        query,
    });
    const fetching = new Promise(async (resolve, reject) => {
        const res = await fetch(fullUrl, combinedFetchOptions);
        if (res.ok) {
            return resolve(await res.json());
        }
        try {
            // attempt to read the body of the response
            return reject(new FetchError(res, await res.json()));
        }
        catch (_) {
            // send FetchError without the body if we are not be able to read the body for some reason
            return reject(new FetchError(res));
        }
    });
    return fetching;
}
exports.kfetch = kfetch;
