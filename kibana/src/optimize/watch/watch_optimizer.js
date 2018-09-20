'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _rxjs = require('rxjs');

var Rx = _interopRequireWildcard(_rxjs);

var _operators = require('rxjs/operators');

var _base_optimizer = require('../base_optimizer');

var _base_optimizer2 = _interopRequireDefault(_base_optimizer);

var _bundles_route = require('../bundles_route');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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

const STATUS = {
  RUNNING: 'optimizer running',
  SUCCESS: 'optimizer completed successfully',
  FAILURE: 'optimizer failed with stats',
  FATAL: 'optimizer failed without stats'
};

class WatchOptimizer extends _base_optimizer2.default {
  constructor(opts) {
    super(opts);

    this.compilerRunStartHandler = (watchingCompiler, cb) => {
      this.status$.next({
        type: STATUS.RUNNING
      });

      cb();
    };

    this.compilerWatchErrorHandler = error => {
      if (error) {
        this.status$.next({
          type: STATUS.FATAL,
          error
        });
      }
    };

    this.compilerDoneHandler = stats => {
      this.initialBuildComplete = true;
      const seconds = parseFloat((stats.endTime - stats.startTime) / 1000).toFixed(2);

      if (stats.hasErrors() || stats.hasWarnings()) {
        this.status$.next({
          type: STATUS.FAILURE,
          seconds,
          error: this.failedStatsToError(stats)
        });
      } else {
        this.status$.next({
          type: STATUS.SUCCESS,
          seconds
        });
      }
    };

    this.onStatusChangeHandler = ({ type, seconds, error }) => {
      switch (type) {
        case STATUS.RUNNING:
          if (!this.initialBuildComplete) {
            this.log(['info', 'optimize'], {
              tmpl: 'Optimization started',
              bundles: this.uiBundles.getIds()
            });
          }
          break;

        case STATUS.SUCCESS:
          this.log(['info', 'optimize'], {
            tmpl: 'Optimization <%= status %> in <%= seconds %> seconds',
            bundles: this.uiBundles.getIds(),
            status: 'success',
            seconds
          });
          break;

        case STATUS.FAILURE:
          // errors during initialization to the server, unlike the rest of the
          // errors produced here. Lets not muddy the console with extra errors
          if (!this.initializing) {
            this.log(['fatal', 'optimize'], {
              tmpl: 'Optimization <%= status %> in <%= seconds %> seconds<%= err %>',
              bundles: this.uiBundles.getIds(),
              status: 'failed',
              seconds,
              err: error
            });
          }
          break;

        case STATUS.FATAL:
          this.log('fatal', error);
          process.exit(1);
          break;
      }
    };

    this.log = opts.log || (() => null);
    this.prebuild = opts.prebuild || false;
    this.status$ = new Rx.ReplaySubject(1);
  }

  async init() {
    this.initializing = true;
    this.initialBuildComplete = false;

    // log status changes
    this.status$.subscribe(this.onStatusChangeHandler);
    await this.uiBundles.resetBundleDir();
    await this.initCompiler();

    this.compiler.plugin('watch-run', this.compilerRunStartHandler);
    this.compiler.plugin('done', this.compilerDoneHandler);
    this.compiler.watch({ aggregateTimeout: 200 }, this.compilerWatchErrorHandler);

    if (this.prebuild) {
      await this.onceBuildOutcome();
    }

    this.initializing = false;
  }

  bindToServer(server, basePath) {
    // pause all requests received while the compiler is running
    // and continue once an outcome is reached (aborting the request
    // with an error if it was a failure).
    server.ext('onRequest', (request, reply) => {
      this.onceBuildOutcome().then(() => reply.continue()).catch(reply);
    });

    server.route((0, _bundles_route.createBundlesRoute)({
      bundlesPath: this.compiler.outputPath,
      basePublicPath: basePath
    }));
  }

  async onceBuildOutcome() {
    return await this.status$.pipe((0, _operators.mergeMap)(this.mapStatusToOutcomes), (0, _operators.take)(1)).toPromise();
  }

  mapStatusToOutcomes({ type, error }) {
    switch (type) {
      case STATUS.RUNNING:
        return [];

      case STATUS.SUCCESS:
        return [true];

      case STATUS.FAILURE:
      case STATUS.FATAL:
        return Rx.throwError(error);
    }
  }

}
exports.default = WatchOptimizer;
module.exports = exports['default'];