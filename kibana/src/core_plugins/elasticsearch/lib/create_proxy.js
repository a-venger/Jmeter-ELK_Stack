'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createPath = createPath;
exports.createProxy = createProxy;

var _create_agent = require('./create_agent');

var _create_agent2 = _interopRequireDefault(_create_agent);

var _map_uri = require('./map_uri');

var _map_uri2 = _interopRequireDefault(_map_uri);

var _lodash = require('lodash');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function createPath(prefix, path) {
  path = path[0] === '/' ? path : `/${path}`;
  prefix = prefix[0] === '/' ? prefix : `/${prefix}`;

  return `${prefix}${path}`;
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

function createProxy(server, method, path, config) {
  const proxies = new Map([['/elasticsearch', server.plugins.elasticsearch.getCluster('data')]]);

  const responseHandler = function (err, upstreamResponse, request, reply) {
    if (err) {
      reply(err);
      return;
    }

    if (upstreamResponse.headers.location) {
      // TODO: Workaround for #8705 until hapi has been updated to >= 15.0.0
      upstreamResponse.headers.location = encodeURI(upstreamResponse.headers.location);
    }

    reply(null, upstreamResponse);
  };

  for (const [proxyPrefix, cluster] of proxies) {
    const options = {
      method,
      path: createPath(proxyPrefix, path),
      config: {
        timeout: {
          socket: cluster.getRequestTimeout()
        }
      },
      handler: {
        proxy: {
          mapUri: (0, _map_uri2.default)(cluster, proxyPrefix),
          agent: (0, _create_agent2.default)({
            url: cluster.getUrl(),
            ssl: cluster.getSsl()
          }),
          xforward: true,
          timeout: cluster.getRequestTimeout(),
          onResponse: responseHandler
        }
      }
    };

    (0, _lodash.assign)(options.config, config);

    server.route(options);
  }
}