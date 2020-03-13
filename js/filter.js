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
  
  var onFiltersFormChange = function (evt) {
	var filteredData = window.map.similarAds.slice();
    switch (evt.target.name) {
      case 'features':
        // console.log('это фичи');
        break;
      case 'housing-price':
		filteredData = filteredData.filter(function (it) {
			return it.offer.price > housingPrices[evt.target.value]['min'];
		});
		reDrawSimilarAds(filteredData);
        break;
      case 'housing-rooms':
        // console.log('изменилось кол-во комнат');
        break;
      case 'housing-type':
        filteredData = filteredData.filter(function (it) {
          return it.offer.type === evt.target.value;
        });
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

  // var housingType = function (initialData, offerTypeValue) {

  // };

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
