
/**
 * Kibana entry file
 *
 * This is programmatically created and updated, do not modify
 *
 * context: {
  "env": "production",
  "kbnVersion": "6.4.1",
  "buildNum": 17999,
  "plugins": [
    "apm",
    "apm_oss",
    "cloud",
    "console",
    "console_extensions",
    "dashboard_mode",
    "elasticsearch",
    "graph",
    "grokdebugger",
    "index_management",
    "input_control_vis",
    "inspector_views",
    "kbn_doc_views",
    "kbn_vislib_vis_types",
    "kibana",
    "kuery_autocomplete",
    "license_management",
    "logstash",
    "markdown_vis",
    "metric_vis",
    "metrics",
    "ml",
    "monitoring",
    "notifications",
    "region_map",
    "reporting",
    "searchprofiler",
    "security",
    "state_session_storage_redirect",
    "status_page",
    "table_vis",
    "tagcloud",
    "tile_map",
    "tilemap",
    "timelion",
    "vega",
    "watcher",
    "xpack_main"
  ]
}
 */

// import global polyfills before everything else
import 'babel-polyfill';
import 'custom-event-polyfill';
import 'whatwg-fetch';
import 'abortcontroller-polyfill';
import 'childnode-remove-polyfill';

import { CoreSystem } from '__kibanaCore__'

new CoreSystem({
  injectedMetadata: JSON.parse(document.querySelector('kbn-injected-metadata').getAttribute('data')),
  rootDomElement: document.body,
  requireLegacyFiles: () => {
    require('plugins/state_session_storage_redirect');
  }
}).start()
