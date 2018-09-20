'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ELASTIC_CLOUD_INSTRUCTIONS = undefined;

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _apm_client_instructions = require('./apm_client_instructions');

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

const SERVER_URL_INSTRUCTION = {
  title: 'APM Server endpoint',
  textPre: `Retrieve the APM Server URL from the Deployments section on the Elastic Cloud dashboard.
    You will also need the APM Server secret token, which was generated on deployment.`
};

const ELASTIC_CLOUD_INSTRUCTIONS = exports.ELASTIC_CLOUD_INSTRUCTIONS = {
  instructionSets: [{
    title: 'APM Agents',
    instructionVariants: [{
      id: _instruction_variant.INSTRUCTION_VARIANT.NODE,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.NODE_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.DJANGO,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.DJANGO_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.FLASK,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.FLASK_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RAILS,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.RAILS_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.RACK,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.RACK_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.JS,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.JS_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.GO,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.GO_CLIENT_INSTRUCTIONS]
    }, {
      id: _instruction_variant.INSTRUCTION_VARIANT.JAVA,
      instructions: [SERVER_URL_INSTRUCTION, ..._apm_client_instructions.JAVA_CLIENT_INSTRUCTIONS]
    }]
  }]
};