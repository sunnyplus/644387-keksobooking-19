'use strict';

(function () {

  var MAX_ADS = 5;

  var filtersForm = document.querySelector('.map__filters');
  var housingPrices = {
    'any': {
      'min': 0,
      'max': 1000000
    },
    'low': {
      'min': 0,
      'max': 10000
    },
    'middle': {
      'min': 10000,
      'max': 50000
    },
    'high': {
      'min': 50000,
      'max': 1000000
    }
  };

  var backUpData;

  var filterData = function () {

    var formFilterData = new FormData(filtersForm);

    backUpData = window.data.similarAds.slice();
    var filteredData = [];

    var isFeaturesAvailable = function (features) {
      var featureAvailable;
      var activeFeatures = [];
      document.querySelectorAll('.map__features input[name=features]:checked').forEach(function (feature) {
        activeFeatures.push(feature.value);
      });
      for (var k = 0; k < activeFeatures.length; k++) {
        if (features.indexOf(activeFeatures[k]) === -1) {
          featureAvailable = false;
          break;
        } else {
          featureAvailable = true;
        }
      }
      return featureAvailable;
    };


    var getformData = function (formData, inputName) {
      return formData.get(inputName);
    };

    for (var i = 0; i < backUpData.length; i++) {
      if ((backUpData[i].offer.type === getformData(formFilterData, 'housing-type') || getformData(formFilterData, 'housing-type') === 'any')
      && (backUpData[i].offer.rooms === Number(getformData(formFilterData, 'housing-rooms')) || getformData(formFilterData, 'housing-rooms') === 'any')
      && (backUpData[i].offer.guests === Number(getformData(formFilterData, 'housing-guests')) || getformData(formFilterData, 'housing-guests') === 'any')
      && (backUpData[i].offer.price > housingPrices[getformData(formFilterData, 'housing-price')]['min'] && backUpData[i].offer.price < housingPrices[getformData(formFilterData, 'housing-price')]['max'])
      && (isFeaturesAvailable(backUpData[i].offer.features) || formFilterData.getAll('features').length === 0)) {
        filteredData.push(backUpData[i]);
      }
      if (filteredData.length === MAX_ADS) {
        break;
      }
    }

    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
    reDrawSimilarAds(filteredData);
  };

  var onFiltersFormChange = function () {
    window.debounce(filterData);
  };

  filtersForm.addEventListener('change', onFiltersFormChange);

  var reDrawSimilarAds = function (filteredSimilarAds) {
    window.map.pinDrop();
    window.map.drawSimilarAds(filteredSimilarAds);
  };
})();
