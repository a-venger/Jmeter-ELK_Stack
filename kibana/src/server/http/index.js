'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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

var _url = require('url');

var _path = require('path');

var _lodash = require('lodash');

var _lodash2 = _interopRequireDefault(_lodash);

var _boom = require('boom');

var _boom2 = _interopRequireDefault(_boom);

var _hapi = require('hapi');

var _hapi2 = _interopRequireDefault(_hapi);

var _get_default_route = require('./get_default_route');

var _get_default_route2 = _interopRequireDefault(_get_default_route);

var _version_check = require('./version_check');

var _short_url_error = require('./short_url_error');

var _short_url_assert_valid = require('./short_url_assert_valid');

var _short_url_lookup = require('./short_url_lookup');

var _register_hapi_plugins = require('./register_hapi_plugins');

var _xsrf = require('./xsrf');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = async function (kbnServer, server, config) {
  kbnServer.server = new _hapi2.default.Server();
  server = kbnServer.server;

  const shortUrlLookup = (0, _short_url_lookup.shortUrlLookupProvider)(server);

  // Note that all connection options configured here should be exactly the same
  // as in `getServerOptions()` in the new platform (see `src/core/server/http/http_tools`).
  //
  // The only exception is `tls` property: TLS is entirely handled by the new
  // platform and we don't have to duplicate all TLS related settings here, we just need
  // to indicate to Hapi connection that TLS is used so that it can use correct protocol
  // name in `server.info` and `request.connection.info` that are used throughout Kibana.
  //
  // Any change SHOULD BE applied in both places.
  server.connection({
    host: config.get('server.host'),
    port: config.get('server.port'),
    tls: config.get('server.ssl.enabled'),
    listener: kbnServer.newPlatform.proxyListener,
    state: {
      strictHeader: false
    },
    routes: {
      cors: config.get('server.cors'),
      payload: {
        maxBytes: config.get('server.maxPayloadBytes')
      },
      validate: {
        options: {
          abortEarly: false
        }
      }
    }
  });

  (0, _register_hapi_plugins.registerHapiPlugins)(server);

  // provide a simple way to expose static directories
  server.decorate('server', 'exposeStaticDir', function (routePath, dirPath) {
    this.route({
      path: routePath,
      method: 'GET',
      handler: {
        directory: {
          path: dirPath,
          listing: false,
          lookupCompressed: true
        }
      },
      config: { auth: false }
    });
  });

  // helper for creating view managers for servers
  server.decorate('server', 'setupViews', function (path, engines) {
    this.views({
      path: path,
      isCached: config.get('optimize.viewCaching'),
      engines: _lodash2.default.assign({ jade: require('jade') }, engines || {})
    });
  });

  // attach the app name to the server, so we can be sure we are actually talking to kibana
  server.ext('onPreResponse', function (req, reply) {
    const response = req.response;

    const customHeaders = _extends({}, config.get('server.customResponseHeaders'), {
      'kbn-name': kbnServer.name
    });

    if (response.isBoom) {
      response.output.headers = _extends({}, response.output.headers, customHeaders);
    } else {
      Object.keys(customHeaders).forEach(name => {
        response.header(name, customHeaders[name]);
      });
    }

    return reply.continue();
  });

  server.route({
    path: '/',
    method: 'GET',
    handler: function (req, reply) {
      return reply.view('root_redirect', {
        hashRoute: `${config.get('server.basePath')}/app/kibana`,
        defaultRoute: (0, _get_default_route2.default)(kbnServer)
      });
    }
  });

  server.route({
    method: 'GET',
    path: '/{p*}',
    handler: function (req, reply) {
      const path = req.path;
      if (path === '/' || path.charAt(path.length - 1) !== '/') {
        return reply(_boom2.default.notFound());
      }
      const pathPrefix = config.get('server.basePath') ? `${config.get('server.basePath')}/` : '';
      return reply.redirect((0, _url.format)({
        search: req.url.search,
        pathname: pathPrefix + path.slice(0, -1)
      })).permanent(true);
    }
  });

  server.route({
    method: 'GET',
    path: '/goto/{urlId}',
    handler: async function (request, reply) {
      try {
        const url = await shortUrlLookup.getUrl(request.params.urlId, request);
        (0, _short_url_assert_valid.shortUrlAssertValid)(url);

        const uiSettings = request.getUiSettingsService();
        const stateStoreInSessionStorage = await uiSettings.get('state:storeInSessionStorage');
        if (!stateStoreInSessionStorage) {
          reply().redirect(config.get('server.basePath') + url);
          return;
        }

        const app = server.getHiddenUiAppById('stateSessionStorageRedirect');
        reply.renderApp(app, {
          redirectUrl: url
        });
      } catch (err) {
        reply((0, _short_url_error.handleShortUrlError)(err));
      }
    }
  });

  server.route({
    method: 'POST',
    path: '/shorten',
    handler: async function (request, reply) {
      try {
        (0, _short_url_assert_valid.shortUrlAssertValid)(request.payload.url);
        const urlId = await shortUrlLookup.generateUrlId(request.payload.url, request);
        reply(urlId);
      } catch (err) {
        reply((0, _short_url_error.handleShortUrlError)(err));
      }
    }
  });

  // Expose static assets (fonts, favicons).
  server.exposeStaticDir('/ui/fonts/{path*}', (0, _path.resolve)(__dirname, '../../ui/public/assets/fonts'));
  server.exposeStaticDir('/ui/favicons/{path*}', (0, _path.resolve)(__dirname, '../../ui/public/assets/favicons'));

  (0, _version_check.setupVersionCheck)(server, config);
  (0, _xsrf.setupXsrf)(server, config);
};

module.exports = exports['default'];