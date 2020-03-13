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

  if (document.querySelector('.map__card')) {
    document.querySelector('.map__card').remove();
  }
    switch (evt.target.name) {
      case 'features':
        // console.log('это фичи');
        break;
      case 'housing-price':
		// filteredData = filteredData.filter(function (it) {
		// 	return it.offer.price > housingPrices[evt.target.value]['min'];
		// });
		reDrawSimilarAds(filteredData);
        break;
      case 'housing-rooms':
        // console.log('изменилось кол-во комнат');
        break;
      case 'housing-type':
        if (evt.target.value !== 'any') {
          filteredData = window.backend.similarAds.slice().filter(function (it, i) {
            return it.offer.type === evt.target.value;
            });
        } else {
          filteredData = window.backend.similarAds.slice();
        }
        filteredData = amount(filteredData, 5);
		    reDrawSimilarAds(filteredData);
        break;
      case 'housing-guests':
        // console.log('изменилось кол-во гостей');
        break;
      default:
        throw new Error('Неизвестный параметр ' + evt.target.name);
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
