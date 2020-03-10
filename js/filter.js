'use strict';

(function () {
  var filtersForm = document.querySelector('.map__filters');
  var onFiltersFormChange = function (evt) {
		switch(evt.target.name) {
			case 'features':
				console.log('это фичи');
				break;
			case 'housing-price':
				console.log('изменилась цена');
				break;
			case 'housing-rooms':
				console.log('изменилось кол-во комнат');
				break;
			case 'housing-type':
				console.log('изменилcя тип жилья');
				break;
			case 'housing-guests':
				console.log('изменилось кол-во гостей');
				break;
			default:
				throw new Error('Неизвестный параметр ' + evt.target.name);
		}

    };

    filtersForm.addEventListener('change', onFiltersFormChange);
})();
