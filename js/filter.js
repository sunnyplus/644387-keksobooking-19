'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var filteredData;
  var onFiltersFormChange = function (evt) {
    switch (evt.target.name) {
      case 'features':
        // console.log('это фичи');
        break;
      case 'housing-price':
        // console.log('изменилась цена');
        break;
      case 'housing-rooms':
        // console.log('изменилось кол-во комнат');
        break;
      case 'housing-type':
        // console.log('изменилcя тип жилья');
        filteredData = window.map.similarAds.filter(function (it) {
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
