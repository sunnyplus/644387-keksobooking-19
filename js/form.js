'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var mapPin = document.querySelector('.map__pin--main'); // главная метка
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  var mainPinAddress = window.map.findAddress(mapPin, false);
  addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top; // выставляем координаты метки в неактивном состоянии

  var checkCapacityValidity = function () {

    if ((parseInt(roomNumber.value, 10) !== 100 && parseInt(capacity.value, 10) === 0)
      || (parseInt(roomNumber.value, 10) === 100 && parseInt(capacity.value, 10) !== 0)
      || (parseInt(roomNumber.value, 10) < parseInt(capacity.value, 10))) {
      capacity.setCustomValidity('выбранное количество гостей не подходит под количество комнат');
    } else {
      capacity.setCustomValidity('');
    }
  };

  var onFieldChange = function () {
    checkCapacityValidity();
  };

  var onFormSend = function () {
    checkCapacityValidity();
  };

  capacity.addEventListener('change', onFieldChange); // событие изменение количества гостей
  roomNumber.addEventListener('change', onFieldChange); // событие изменение количества комнат
  adForm.addEventListener('submit', onFormSend); // событие отправки формы

  window.form = {
    checkCapacityValidity: checkCapacityValidity
  };
})();
