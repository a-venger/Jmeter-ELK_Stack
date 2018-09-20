'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.defaults = exports.allById = exports.all = undefined;
exports.get = get;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const all = exports.all = [{
  id: 'red',
  title: 'Red',
  icon: 'danger',
  severity: 1000,
  nicknames: ['Danger Will Robinson! Danger!']
}, {
  id: 'uninitialized',
  title: 'Uninitialized',
  icon: 'spinner',
  severity: 900,
  nicknames: ['Initializing']
}, {
  id: 'yellow',
  title: 'Yellow',
  icon: 'warning',
  severity: 800,
  nicknames: ['S.N.A.F.U', 'I\'ll be back', 'brb']
}, {
  id: 'green',
  title: 'Green',
  icon: 'success',
  severity: 0,
  nicknames: ['Looking good']
}, {
  id: 'disabled',
  title: 'Disabled',
  severity: -1,
  icon: 'toggle-off',
  nicknames: ['Am I even a thing?']
}]; /*
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

const allById = exports.allById = _lodash2.default.indexBy(exports.all, 'id');

const defaults = exports.defaults = {
  icon: 'question',
  severity: Infinity
};

function get(id) {
  return exports.allById[id] || _lodash2.default.defaults({ id: id }, exports.defaults);
}