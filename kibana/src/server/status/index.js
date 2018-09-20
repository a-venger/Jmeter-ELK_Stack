'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusMixin = statusMixin;

var _server_status = require('./server_status');

var _server_status2 = _interopRequireDefault(_server_status);

var _metrics = require('./lib/metrics');

var _routes = require('./routes');

var _collectors = require('./collectors');

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

function statusMixin(kbnServer, server, config) {
  kbnServer.status = new _server_status2.default(kbnServer.server);

  const statsCollector = (0, _collectors.getOpsStatsCollector)(server, kbnServer);
  const { collectorSet } = server.usage;
  collectorSet.register(statsCollector);

  const { ['even-better']: evenBetter } = server.plugins;

  if (evenBetter) {
    const metrics = new _metrics.Metrics(config, server);

    evenBetter.monitor.on('ops', event => {
      metrics.capture(event).then(data => {
        kbnServer.metrics = data;
      }); // captures (performs transforms on) the latest event data and stashes the metrics for status/stats API payload
    });
  }

  // init routes
  (0, _routes.registerStatusPage)(kbnServer, server, config);
  (0, _routes.registerStatusApi)(kbnServer, server, config);
  (0, _routes.registerStatsApi)(kbnServer, server, config);
}