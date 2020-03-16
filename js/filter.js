'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingPrices = {
    'any': {
      'min': 0,
      'max': 10000000
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
      'max': 10000000
    }
  };

  var backUpData;

  var onFiltersFormChange = function () {

    var formData = new FormData(filtersForm);

    backUpData = window.map.similarAds.slice();
    var filteredData = [];
    var isFeaturesAvailable = function (features) {
      var featureAvailable;
      for (var k = 0; k < formData.getAll('features').length; k++) {
        if (features.indexOf(formData.getAll('features')[k]) === -1) {
          featureAvailable = false;
          break;
        } else {
          featureAvailable = true;
        }
      }
      return featureAvailable;
    };

    for (var i = 0; i < backUpData.length; i++) {
      var j = 1;
      if (isFeaturesAvailable(backUpData[i].offer.features)) {
        filteredData.push(backUpData[i]);
        console.log(isFeaturesAvailable(backUpData[i].offer.features));
        j = j + 1;
      }
      if (j === 5) {
        break;
      }
    }
    reDrawSimilarAds(filteredData);
    // if (formData.getAll('features').length > 0) {
    //   formData.getAll('features').forEach(function (element) {
    //     filteredData = filteredData.filter(function (it) {
    //       return it.offer.features.indexOf(element) !== -1;
    //     });
    //   });

    // }
    // if (formData.getAll('housing-type')[0] !== 'any') {
    //   filteredData = filteredData.filter(function (it) {
    //     return it.offer.type === formData.getAll('housing-type')[0];
    //   });
    // }
    // if (formData.getAll('housing-rooms')[0] !== 'any') {
    //   filteredData = filteredData.filter(function (it) {
    //     return it.offer.rooms === Number(formData.getAll('housing-rooms')[0]);
    //   });
    // }
    // if (formData.getAll('housing-guests')[0] !== 'any') {
    //   filteredData = filteredData.filter(function (it) {
    //     return it.offer.guests === Number(formData.getAll('housing-guests')[0]);
    //   });
    // }
    // if (formData.getAll('housing-price')[0] !== 'any') {
    //   filteredData = filteredData.filter(function (it) {
    //     return it.offer.price === housingPrices[formData.getAll('housing-price')[0]]['min'];
    //   });
    // }
    if (document.querySelector('.map__card')) {
      document.querySelector('.map__card').remove();
    }
  };
  filtersForm.addEventListener('change', onFiltersFormChange);

  var amount = function (initialData, dataAmount) {
    return initialData.slice(0, dataAmount);
  };

  var reDrawSimilarAds = function (filteredSimilarAds) {
    document.querySelectorAll('.map__pin').forEach(function (element) {
      if (element.className === 'map__pin') {
        element.remove();
      }
      window.map.drawSimilarAds(filteredSimilarAds);
    });
  };

  window.filter = {
    amount: amount
  };
})();
