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

  var setPinCoords = function (isActive) { // установка координат в активном/неактивном состояниях
    mainPinAddress = window.map.findAddress(mapPin, isActive);
    addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top;
  };

  var onFieldChange = function () {
    checkCapacityValidity();
  };

  var onFormSend = function (evt) {
    evt.preventDefault();
    checkCapacityValidity();
    window.backend.upload(new FormData(adForm), onFormSubmitSuccess, onFormSubmitError);
  };

  var onFormSubmitSuccess = function () {
    window.page.createSuccessPopup();
    document.addEventListener('keydown', window.page.onEscapePress);
    document.querySelector('.success').addEventListener('click', window.page.onPopupClick);
  };

  var onFormSubmitError = function (error) {
    window.page.createErrorPopup(error);
  };

  var onFormChange = function (evt) {
    switch (evt.target.id) {
      case 'timein':
        document.querySelector('#timeout').value = evt.target.value;
        break;
      case 'timeout':
        document.querySelector('#timein').value = evt.target.value;
        break;
      default:
        throw new Error('Несуществующий id: ' + evt.target.id);
    }
  };

  capacity.addEventListener('change', onFieldChange); // событие изменение количества гостей
  roomNumber.addEventListener('change', onFieldChange); // событие изменение количества комнат
  adForm.addEventListener('submit', onFormSend); // событие отправки формы
  adForm.addEventListener('change', onFormChange);

  window.form = {
    checkCapacityValidity: checkCapacityValidity,
    setPinCoords: setPinCoords
  };
})();
