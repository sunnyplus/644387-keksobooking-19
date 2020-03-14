'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var housingPrices = {
    'any': {
      'min': 0,
      'max': 1000000
    },
    'low': {
      'min': 0,
      'max': 9999
    },
    'middle': {
      'min': 10000,
      'max': 50000
    },
    'high': {
      'min': 50000,
      'max': 1000000
    }
  }

  var filteredData;
  
  var onFiltersFormChange = function (evt) {

    var fd = new FormData(filtersForm);
    filteredData = window.backend.similarAds.slice();

    if (fd.getAll('features').length > 0) {
      fd.getAll('features').forEach(function (element) {
        filteredData = filteredData.filter(function (it) {
          return it.offer.features.indexOf(element) !== -1;
        });
      });
    }
    if (fd.getAll('housing-type')[0] !== 'any') {
      filteredData = filteredData.filter(function (it) {
        return it.offer.type === fd.getAll('housing-type')[0];
      });
    }
    if (fd.getAll('housing-rooms')[0] !== 'any') {
      filteredData = filteredData.filter(function (it) {
        return it.offer.rooms === Number(fd.getAll('housing-rooms')[0]);
      });
    }
    if (fd.getAll('housing-guests')[0] !== 'any') {
      filteredData = filteredData.filter(function (it) {
        return it.offer.guests === Number(fd.getAll('housing-guests')[0]);
      });
    }
    if (fd.getAll('housing-price')[0] !== 'any') {
      filteredData = filteredData.filter(function (it) {
        return it.offer.price === housingPrices[fd.getAll('housing-price')[0]]['min']
      });
    }
    console.log(filteredData);
    reDrawSimilarAds(filteredData);

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
