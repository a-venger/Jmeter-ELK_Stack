"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var flattenOptionGroups = exports.flattenOptionGroups = function flattenOptionGroups(optionsOrGroups) {
  return optionsOrGroups.reduce(function (options, optionOrGroup) {
    if (optionOrGroup.options) {
      options.push.apply(options, _toConsumableArray(optionOrGroup.options));
    } else {
      options.push(optionOrGroup);
    }
    return options;
  }, []);
};

var getSelectedOptionForSearchValue = exports.getSelectedOptionForSearchValue = function getSelectedOptionForSearchValue(searchValue, selectedOptions) {
  var normalizedSearchValue = searchValue.toLowerCase();
  return selectedOptions.find(function (option) {
    return option.label.toLowerCase() === normalizedSearchValue;
  });
};

var collectMatchingOption = function collectMatchingOption(accumulator, option, selectedOptions, normalizedSearchValue, isPreFiltered) {
  // Only show options which haven't yet been selected.
  var selectedOption = getSelectedOptionForSearchValue(option.label, selectedOptions);
  if (selectedOption) {
    return false;
  }

  // If the options have already been prefiltered then we can skip filtering against the search value.
  if (isPreFiltered) {
    accumulator.push(option);
    return;
  }

  if (!normalizedSearchValue) {
    accumulator.push(option);
    return;
  }

  var normalizedOption = option.label.trim().toLowerCase();
  if (normalizedOption.includes(normalizedSearchValue)) {
    accumulator.push(option);
  }
};

var getMatchingOptions = exports.getMatchingOptions = function getMatchingOptions(options, selectedOptions, searchValue, isPreFiltered) {
  var normalizedSearchValue = searchValue.trim().toLowerCase();
  var matchingOptions = [];

  options.forEach(function (option) {
    if (option.options) {
      var matchingOptionsForGroup = [];
      option.options.forEach(function (groupOption) {
        collectMatchingOption(matchingOptionsForGroup, groupOption, selectedOptions, normalizedSearchValue, isPreFiltered);
      });
      if (matchingOptionsForGroup.length > 0) {
        // Add option for group label
        matchingOptions.push({ label: option.label, isGroupLabelOption: true });
        // Add matching options for group
        matchingOptions.push.apply(matchingOptions, matchingOptionsForGroup);
      }
    } else {
      collectMatchingOption(matchingOptions, option, selectedOptions, normalizedSearchValue, isPreFiltered);
    }
  });
  return matchingOptions;
};