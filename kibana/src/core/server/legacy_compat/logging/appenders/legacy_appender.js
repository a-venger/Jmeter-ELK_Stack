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
const schema_1 = require("../../../config/schema");
const { literal, object } = schema_1.schema;
/**
 * Simple appender that just forwards `LogRecord` to the legacy KbnServer log.
 * @internal
 */
class LegacyAppender {
    constructor(kbnServer) {
        this.kbnServer = kbnServer;
    }
    /**
     * Forwards `LogRecord` to the legacy platform that will layout and
     * write record to the configured destination.
     * @param record `LogRecord` instance to forward to.
     */
    append({ level, context, message, error, timestamp, meta = {} }) {
        const tags = [level.id.toLowerCase(), ...context.split('.'), ...(meta.tags || [])];
        this.kbnServer.log(tags, error || message, timestamp);
    }
    async dispose() {
        // noop
    }
}
LegacyAppender.configSchema = object({
    kind: literal('legacy-appender'),
});
exports.LegacyAppender = LegacyAppender;
