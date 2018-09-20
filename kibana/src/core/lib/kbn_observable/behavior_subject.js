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
const subject_1 = require("./subject");
/**
 * A BehaviorSubject is a Subject that has a _current_ value.
 *
 * Whenever an observer subscribes to a BehaviorSubject, it begins by emitting
 * the item most recently emitted by the source Observable (or a seed/default
 * value if none has yet been emitted) and then continues to emit any other
 * items emitted later by the source Observable(s).
 */
class BehaviorSubject extends subject_1.Subject {
    constructor(value) {
        super();
        this.value = value;
    }
    /**
     * @returns The current value of the BehaviorSubject. Most of the time this
     * shouldn't be used directly, but there are situations were it can come in
     * handy. Usually a BehaviorSubject is used so you immediately receive the
     * latest/current value when subscribing.
     */
    getValue() {
        if (this.thrownError !== undefined) {
            throw this.thrownError;
        }
        return this.value;
    }
    next(value) {
        if (!this.isStopped) {
            this.value = value;
        }
        return super.next(value);
    }
    registerObserver(observer) {
        if (!this.isStopped) {
            observer.next(this.value);
        }
        return super.registerObserver(observer);
    }
}
exports.BehaviorSubject = BehaviorSubject;
