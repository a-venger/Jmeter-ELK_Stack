'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createInstallRoute = undefined;

var _joi = require('joi');

var _joi2 = _interopRequireDefault(_joi);

var _load_data = require('./lib/load_data');

var _create_index_name = require('./lib/create_index_name');

var _translate_timestamp = require('./lib/translate_timestamp');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

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

const createInstallRoute = exports.createInstallRoute = () => ({
  path: '/api/sample_data/{id}',
  method: 'POST',
  config: {
    validate: {
      params: _joi2.default.object().keys({
        id: _joi2.default.string().required()
      }).required()
    },
    handler: async (request, reply) => {
      const server = request.server;
      const sampleDataset = server.getSampleDatasets().find(sampleDataset => {
        return sampleDataset.id === request.params.id;
      });
      if (!sampleDataset) {
        return reply().code(404);
      }

      const { callWithRequest } = server.plugins.elasticsearch.getCluster('data');
      const index = (0, _create_index_name.createIndexName)(server, sampleDataset.id);
      const insertCmd = {
        index: {
          _index: index,
          _type: '_doc'
        }
      };

      // clean up any old installation of dataset
      try {
        await callWithRequest(request, 'indices.delete', { index: index });
      } catch (err) {
        // ignore delete errors
      }

      try {
        const createIndexParams = {
          index: index,
          body: {
            settings: {
              index: {
                number_of_shards: 1,
                number_of_replicas: 0
              }
            },
            mappings: {
              _doc: {
                properties: sampleDataset.fields
              }
            }
          }
        };
        await callWithRequest(request, 'indices.create', createIndexParams);
      } catch (err) {
        const errMsg = `Unable to create sample data index "${index}", error: ${err.message}`;
        server.log(['warning'], errMsg);
        return reply(errMsg).code(err.status);
      }

      const nowReference = (0, _translate_timestamp.dateToIso8601IgnoringTime)(new Date());
      function updateTimestamps(doc) {
        sampleDataset.timeFields.forEach(timeFieldName => {
          if (doc[timeFieldName]) {
            doc[timeFieldName] = sampleDataset.preserveDayOfWeekTimeOfDay ? (0, _translate_timestamp.translateTimeRelativeToWeek)(doc[timeFieldName], sampleDataset.currentTimeMarker, nowReference) : (0, _translate_timestamp.translateTimeRelativeToDifference)(doc[timeFieldName], sampleDataset.currentTimeMarker, nowReference);
          }
        });
        return doc;
      }
      const bulkInsert = async docs => {
        const bulk = [];
        docs.forEach(doc => {
          bulk.push(insertCmd);
          bulk.push(updateTimestamps(doc));
        });
        const resp = await callWithRequest(request, 'bulk', { body: bulk });
        if (resp.errors) {
          server.log(['warning'], `sample_data install errors while bulk inserting. Elasticsearch response: ${JSON.stringify(resp, null, ' ')}`);
          return Promise.reject(new Error(`Unable to load sample data into index "${index}", see kibana logs for details`));
        }
      };
      (0, _load_data.loadData)(sampleDataset.dataPath, bulkInsert, async (err, count) => {
        if (err) {
          server.log(['warning'], `sample_data install errors while loading data. Error: ${err}`);
          return reply(err.message).code(500);
        }

        const createResults = await request.getSavedObjectsClient().bulkCreate(sampleDataset.savedObjects, { overwrite: true });
        const errors = createResults.saved_objects.filter(savedObjectCreateResult => {
          return savedObjectCreateResult.hasOwnProperty('error');
        });
        if (errors.length > 0) {
          server.log(['warning'], `sample_data install errors while loading saved objects. Errors: ${errors.join(',')}`);
          return reply(`Unable to load kibana saved objects, see kibana logs for details`).code(403);
        }

        return reply({ docsLoaded: count, kibanaSavedObjectsLoaded: sampleDataset.savedObjects.length });
      });
    }
  }
});