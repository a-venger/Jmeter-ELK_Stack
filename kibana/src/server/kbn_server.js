'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _lodash = require('lodash');

var _bluebird = require('bluebird');

var _cluster = require('cluster');

var _utils = require('../utils');

var _configuration = require('./logging/configuration');

var _configuration2 = _interopRequireDefault(_configuration);

var _setup = require('./config/setup');

var _setup2 = _interopRequireDefault(_setup);

var _http = require('./http');

var _http2 = _interopRequireDefault(_http);

var _logging = require('./logging');

var _warnings = require('./warnings');

var _warnings2 = _interopRequireDefault(_warnings);

var _usage = require('./usage');

var _status = require('./status');

var _pid = require('./pid');

var _pid2 = _interopRequireDefault(_pid);

var _deprecation_warnings = require('./config/deprecation_warnings');

var _complete = require('./config/complete');

var _complete2 = _interopRequireDefault(_complete);

var _optimize = require('../optimize');

var _optimize2 = _interopRequireDefault(_optimize);

var _plugins = require('./plugins');

var Plugins = _interopRequireWildcard(_plugins);

var _index_patterns = require('./index_patterns');

var _saved_objects = require('./saved_objects');

var _sample_data = require('./sample_data');

var _mappings = require('./mappings');

var _server_extensions = require('./server_extensions');

var _ui = require('../ui');

var _sass = require('./sass');

var _core = require('../core');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

const rootDir = (0, _utils.fromRoot)('.');

class KbnServer {
  constructor(settings) {
    this.name = _utils.pkg.name;
    this.version = _utils.pkg.version;
    this.build = _utils.pkg.build || false;
    this.rootDir = rootDir;
    this.settings = settings || {};

    this.ready = (0, _lodash.constant)(this.mixin(Plugins.waitForInitSetupMixin,

    // sets this.config, reads this.settings
    _setup2.default, _core.injectIntoKbnServer,

    // sets this.server
    _http2.default,

    // adds methods for extending this.server
    _server_extensions.serverExtensionsMixin, _logging.loggingMixin, _deprecation_warnings.configDeprecationWarningsMixin, _warnings2.default, _usage.usageMixin, _status.statusMixin,

    // writes pid file
    _pid2.default,

    // find plugins and set this.plugins and this.pluginSpecs
    Plugins.scanMixin,

    // tell the config we are done loading plugins
    _complete2.default,

    // setup this.uiExports and this.uiBundles
    _ui.uiMixin, _index_patterns.indexPatternsMixin,

    // setup server.getKibanaIndexMappingsDsl()
    _mappings.kibanaIndexMappingsMixin,

    // setup saved object routes
    _saved_objects.savedObjectsMixin,

    // setup routes for installing/uninstalling sample data sets
    _sample_data.sampleDataMixin,

    // ensure that all bundles are built, or that the
    // watch bundle server is running
    _optimize2.default,

    // transpiles SCSS into CSS
    _sass.sassMixin,

    // initialize the plugins
    Plugins.initializeMixin,

    // notify any deferred setup logic that plugins have initialized
    Plugins.waitForInitResolveMixin, () => {
      if (this.config.get('server.autoListen')) {
        this.ready = (0, _lodash.constant)(Promise.resolve());
        return this.listen();
      }
    }));

    this.listen = (0, _lodash.once)(this.listen);
  }

  /**
   * Extend the KbnServer outside of the constraints of a plugin. This allows access
   * to APIs that are not exposed (intentionally) to the plugins and should only
   * be used when the code will be kept up to date with Kibana.
   *
   * @param {...function} - functions that should be called to mixin functionality.
   *                         They are called with the arguments (kibana, server, config)
   *                         and can return a promise to delay execution of the next mixin
   * @return {Promise} - promise that is resolved when the final mixin completes.
   */
  async mixin(...fns) {
    for (const fn of (0, _lodash.compact)((0, _lodash.flatten)(fns))) {
      await fn.call(this, this, this.server, this.config);
    }
  }

  /**
   * Tell the server to listen for incoming requests, or get
   * a promise that will be resolved once the server is listening.
   *
   * @return undefined
   */
  async listen() {
    await this.ready();

    const { server } = this;
    await (0, _bluebird.fromNode)(cb => server.start(cb));

    if (_cluster.isWorker) {
      // help parent process know when we are ready
      process.send(['WORKER_LISTENING']);
    }

    return server;
  }

  async close() {
    await (0, _bluebird.fromNode)(cb => this.server.stop(cb));
  }

  async inject(opts) {
    if (!this.server) {
      await this.ready();
    }

    return await this.server.inject(opts);
  }

  async applyLoggingConfiguration(config) {
    const loggingOptions = (0, _configuration2.default)(config);
    const subset = {
      ops: config.get('ops'),
      logging: config.get('logging')
    };
    const plain = JSON.stringify(subset, null, 2);
    this.server.log(['info', 'config'], 'New logging configuration:\n' + plain);
    this.server.plugins['even-better'].monitor.reconfigure(loggingOptions);
  }
}
exports.default = KbnServer;
module.exports = exports['default'];