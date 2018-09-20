'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IndexMappings = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /*
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

var _lodash = require('lodash');

var _utils = require('../../utils');

var _lib = require('./lib');

const DEFAULT_INITIAL_DSL = {
  rootType: {
    type: 'object',
    properties: {}
  }
};

class IndexMappings {
  constructor(initialDsl = DEFAULT_INITIAL_DSL, mappingExtensions = []) {
    this._dsl = (0, _lodash.cloneDeep)(initialDsl);
    if (!(0, _lodash.isPlainObject)(this._dsl)) {
      throw new TypeError('initial mapping must be an object');
    }

    // ensure that we have a properties object in the dsl
    // and that the dsl can be parsed with getRootProperties() and kin
    this._setProperties((0, _lib.getRootProperties)(this._dsl) || {});

    // extend this._dsl with each extension (which currently come from uiExports.savedObjectMappings)
    mappingExtensions.forEach(({ properties, pluginId }) => {
      const rootProperties = (0, _lib.getRootProperties)(this._dsl);

      const conflicts = Object.keys(properties).filter(key => rootProperties.hasOwnProperty(key));

      const illegal = Object.keys(properties).filter(key => key.startsWith('_'));

      if (conflicts.length) {
        const props = (0, _utils.formatListAsProse)(conflicts);
        const owner = pluginId ? `registered by plugin ${pluginId} ` : '';
        throw new Error(`Mappings for ${props} ${owner}have already been defined`);
      }

      if (illegal.length) {
        const props = (0, _utils.formatListAsProse)(illegal);
        const owner = pluginId ? `registered by plugin ${pluginId} ` : '';
        throw new Error(`Property name${props.length > 1 ? 's' : ''} ${props} ${owner}are not allowed to start with an underscore (_)`);
      }

      this._setProperties(_extends({}, rootProperties, properties));
    });
  }

  getDsl() {
    return (0, _lodash.cloneDeep)(this._dsl);
  }

  _setProperties(newProperties) {
    const rootType = (0, _lib.getRootType)(this._dsl);
    this._dsl = _extends({}, this._dsl, {
      [rootType]: _extends({}, this._dsl[rootType], {
        properties: newProperties
      })
    });
  }
}
exports.IndexMappings = IndexMappings;