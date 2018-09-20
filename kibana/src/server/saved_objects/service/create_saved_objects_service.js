'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createSavedObjectsService = createSavedObjectsService;

var _mappings = require('../../mappings');

var _lib = require('./lib');

var _saved_objects_client = require('./saved_objects_client');

function createSavedObjectsService(server) {
  const onBeforeWrite = async () => {
    const adminCluster = server.plugins.elasticsearch.getCluster('admin');

    try {
      const index = server.config().get('kibana.index');
      await adminCluster.callWithInternalUser('indices.putTemplate', {
        name: `kibana_index_template:${index}`,
        body: {
          template: index,
          settings: {
            number_of_shards: 1,
            auto_expand_replicas: '0-1'
          },
          mappings: server.getKibanaIndexMappingsDsl()
        }
      });
    } catch (error) {
      server.log(['debug', 'savedObjects'], {
        tmpl: 'Attempt to write indexTemplate for SavedObjects index failed: <%= err.message %>',
        es: {
          resp: error.body,
          status: error.status
        },
        err: {
          message: error.message,
          stack: error.stack
        }
      });

      // We reject with `es.ServiceUnavailable` because writing an index
      // template is a very simple operation so if we get an error here
      // then something must be very broken
      throw new adminCluster.errors.ServiceUnavailable();
    }
  };

  const mappings = server.getKibanaIndexMappingsDsl();
  const repositoryProvider = new _lib.SavedObjectsRepositoryProvider({
    index: server.config().get('kibana.index'),
    mappings,
    onBeforeWrite
  });

  const scopedClientProvider = new _lib.ScopedSavedObjectsClientProvider({
    index: server.config().get('kibana.index'),
    mappings,
    onBeforeWrite,
    defaultClientFactory({
      request
    }) {
      const { callWithRequest } = server.plugins.elasticsearch.getCluster('admin');
      const callCluster = (...args) => callWithRequest(request, ...args);

      const repository = repositoryProvider.getRepository(callCluster);

      return new _saved_objects_client.SavedObjectsClient(repository);
    }
  });

  return {
    types: Object.keys((0, _mappings.getRootPropertiesObjects)(mappings)),
    SavedObjectsClient: _saved_objects_client.SavedObjectsClient,
    SavedObjectsRepository: _lib.SavedObjectsRepository,
    getSavedObjectsRepository: (...args) => repositoryProvider.getRepository(...args),
    getScopedSavedObjectsClient: (...args) => scopedClientProvider.getClient(...args),
    setScopedSavedObjectsClientFactory: (...args) => scopedClientProvider.setClientFactory(...args),
    addScopedSavedObjectsClientWrapperFactory: (...args) => scopedClientProvider.addClientWrapperFactory(...args)
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