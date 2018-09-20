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
const observable_1 = require("./observable");
/**
 * A Subject is a special type of Observable that allows values to be
 * multicasted to many Observers. While plain Observables are unicast (each
 * subscribed Observer owns an independent execution of the Observable),
 * Subjects are multicast.
 *
 * Every Subject is an Observable. Given a Subject, you can subscribe to it in
 * the same way you subscribe to any Observable, and you will start receiving
 * values normally. From the perspective of the Observer, it cannot tell whether
 * the Observable execution is coming from a plain unicast Observable or a
 * Subject.
 *
 * Internally to the Subject, `subscribe` does not invoke a new execution that
 * delivers values. It simply registers the given Observer in a list of
 * Observers, similarly to how `addListener` usually works in other libraries
 * and languages.
 *
 * Every Subject is an Observer. It is an object with the methods `next(v)`,
 * `error(e)`, and `complete()`. To feed a new value to the Subject, just call
 * `next(theValue)`, and it will be multicasted to the Observers registered to
 * listen to the Subject.
 *
 * Learn more about Subjects:
 * - http://reactivex.io/documentation/subject.html
 * - http://davesexton.com/blog/post/To-Use-Subject-Or-Not-To-Use-Subject.aspx
 */
class Subject extends observable_1.Observable {
    constructor() {
        super(observer => this.registerObserver(observer));
        this.observers = new Set();
        this.isStopped = false;
    }
    /**
     * @param value The value that will be forwarded to every observer subscribed
     * to this subject.
     */
    next(value) {
        for (const observer of this.observers) {
            observer.next(value);
        }
    }
    /**
     * @param error The error that will be forwarded to every observer subscribed
     * to this subject.
     */
    error(error) {
        this.thrownError = error;
        this.isStopped = true;
        for (const observer of this.observers) {
            observer.error(error);
        }
        this.observers.clear();
    }
    /**
     * Completes all the subscribed observers, then clears the list of observers.
     */
    complete() {
        this.isStopped = true;
        for (const observer of this.observers) {
            observer.complete();
        }
        this.observers.clear();
    }
    /**
     * Returns an observable, so the observer methods are hidden.
     */
    asObservable() {
        return new observable_1.Observable(observer => this.subscribe(observer));
    }
    registerObserver(observer) {
        if (this.isStopped) {
            if (this.thrownError !== undefined) {
                observer.error(this.thrownError);
            }
            else {
                observer.complete();
            }
        }
        else {
            this.observers.add(observer);
            return () => this.observers.delete(observer);
        }
    }
}
exports.Subject = Subject;
