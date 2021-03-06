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

import { uiModules } from 'ui/modules';
import wmsOptionsTemplate from './wms_options.html';
const module = uiModules.get('kibana');

module.directive('wmsOptions', function (serviceSettings) {
  return {
    restrict: 'E',
    template: wmsOptionsTemplate,
    replace: true,
    scope: {
      options: '='
    },
    link: function ($scope) {

      $scope.options.baseLayersAreLoaded = new Promise((resolve, reject) => {

        serviceSettings
          .getTMSServices()
          .then((allTMSServices) => {

            if (!$scope.options.tmsLayers) {
              $scope.options.tmsLayers = [];
            }

            const newBaseLayers = $scope.options.tmsLayers.slice();
            for (let i = 0; i < allTMSServices.length; i += 1) {
              const layerFromService = allTMSServices[i];
              const alreadyAdded = newBaseLayers.some((layer) => layerFromService.id === layer.id);
              if (!alreadyAdded) {
                newBaseLayers.push(layerFromService);
              }
            }
            $scope.options.tmsLayers = newBaseLayers;

            if (!$scope.options.selectedTmsLayer) {
              $scope.options.selectedTmsLayer = $scope.options.tmsLayers[0];
            }
            resolve(true);

          })
          .catch(function (e) {
            reject(e);
          });


      });


    }
  };
});
