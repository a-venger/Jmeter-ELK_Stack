'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tutorialsMixin = tutorialsMixin;

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _tutorial_schema = require('../core_plugins/kibana/common/tutorials/tutorial_schema');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function tutorialsMixin(kbnServer, server) {
  const tutorials = [];

  server.decorate('server', 'getTutorials', () => {
    return _lodash2.default.cloneDeep(tutorials);
  });

  server.decorate('server', 'registerTutorial', specProvider => {
    const { error, value } = _joi2.default.validate(specProvider(server), _tutorial_schema.tutorialSchema);

    if (error) {
      throw new Error(`Unable to register tutorial spec because its invalid. ${error}`);
    }

    tutorials.push(value);
  });
} /*
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