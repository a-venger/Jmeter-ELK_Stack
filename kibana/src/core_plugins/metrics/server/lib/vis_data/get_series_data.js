'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getSeriesData = getSeriesData;

var _get_request_params = require('./series/get_request_params');

var _get_request_params2 = _interopRequireDefault(_get_request_params);

var _handle_response_body = require('./series/handle_response_body');

var _handle_response_body2 = _interopRequireDefault(_handle_response_body);

var _handle_error_response = require('./handle_error_response');

var _handle_error_response2 = _interopRequireDefault(_handle_error_response);

var _get_annotations = require('./get_annotations');

var _get_annotations2 = _interopRequireDefault(_get_annotations);

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

function getSeriesData(req, panel) {
  const { callWithRequest } = req.server.plugins.elasticsearch.getCluster('data');
  const bodies = panel.series.map(series => (0, _get_request_params2.default)(req, panel, series));
  const params = {
    body: bodies.reduce((acc, items) => acc.concat(items), [])
  };
  return callWithRequest(req, 'msearch', params).then(resp => {
    const series = resp.responses.map((0, _handle_response_body2.default)(panel));
    return {
      [panel.id]: {
        id: panel.id,
        series: series.reduce((acc, series) => acc.concat(series), [])
      }
    };
  }).then(resp => {
    if (!panel.annotations || panel.annotations.length === 0) return resp;
    return (0, _get_annotations2.default)(req, panel).then(annotations => {
      resp[panel.id].annotations = annotations;
      return resp;
    });
  }).then(resp => {
    resp.type = panel.type;
    return resp;
  }).catch((0, _handle_error_response2.default)(panel));
}