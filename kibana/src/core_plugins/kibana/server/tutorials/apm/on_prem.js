'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.onPremInstructions = onPremInstructions;

var _instruction_variant = require('../../../common/tutorials/instruction_variant');

var _apm_server_instructions = require('./apm_server_instructions');

var _apm_client_instructions = require('./apm_client_instructions');

function onPremInstructions(apmIndexPattern) {

  return {
    instructionSets: [{
      title: 'APM Server',
      instructionVariants: [{
        id: _instruction_variant.INSTRUCTION_VARIANT.OSX,
        instructions: [_apm_server_instructions.DOWNLOAD_SERVER_OSX, _apm_server_instructions.EDIT_CONFIG, _apm_server_instructions.START_SERVER_UNIX]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.DEB,
        instructions: [_apm_server_instructions.DOWNLOAD_SERVER_DEB, _apm_server_instructions.EDIT_CONFIG, _apm_server_instructions.START_SERVER_UNIX]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.RPM,
        instructions: [_apm_server_instructions.DOWNLOAD_SERVER_RPM, _apm_server_instructions.EDIT_CONFIG, _apm_server_instructions.START_SERVER_UNIX]
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.WINDOWS,
        instructions: _apm_server_instructions.WINDOWS_SERVER_INSTRUCTIONS
      }],
      statusCheck: {
        title: 'APM Server status',
        text: 'Make sure APM Server is running before you start implementing the APM agents.',
        btnLabel: 'Check APM Server status',
        success: 'You have correctly setup APM-Server',
        error: 'APM-Server has still not connected to Elasticsearch',
        esHitsCheck: {
          index: apmIndexPattern,
          query: {
            bool: {
              filter: {
                exists: {
                  field: 'listening'
                }
              }
            }
          }
        }
      }
    }, {
      title: 'APM Agents',
      instructionVariants: [{
        id: _instruction_variant.INSTRUCTION_VARIANT.NODE,
        instructions: _apm_client_instructions.NODE_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.DJANGO,
        instructions: _apm_client_instructions.DJANGO_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.FLASK,
        instructions: _apm_client_instructions.FLASK_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.RAILS,
        instructions: _apm_client_instructions.RAILS_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.RACK,
        instructions: _apm_client_instructions.RACK_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.JS,
        instructions: _apm_client_instructions.JS_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.GO,
        instructions: _apm_client_instructions.GO_CLIENT_INSTRUCTIONS
      }, {
        id: _instruction_variant.INSTRUCTION_VARIANT.JAVA,
        instructions: _apm_client_instructions.JAVA_CLIENT_INSTRUCTIONS
      }],
      statusCheck: {
        title: 'Agent status',
        text: 'Make sure your application is running and the agents are sending data.',
        btnLabel: 'Check agent status',
        success: 'Data successfully received from one or more agents',
        error: `No data has been received from agents yet`,
        esHitsCheck: {
          index: apmIndexPattern,
          query: {
            bool: {
              filter: {
                exists: {
                  field: 'processor.name'
                }
              }
            }
          }
        }
      }
    }]
  };
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