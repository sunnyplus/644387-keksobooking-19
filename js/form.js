'use strict';

(function () {

  var offerPrice = {
    'bungalo': 0,
    'flat': 1000,
    'palace': 10000,
    'house': 5000
  };

  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var addressField = document.querySelector('#address');
  // var mapPin = document.querySelector('.map__pin--main'); // главная метка
  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

  var mainPinAddress = window.map.findAddress(false);
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
    mainPinAddress = window.map.findAddress(isActive);
    addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top;
    // window.form.mainPinAddress = mainPinAddress;
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
    formsReset();
    window.page.pageDeactivate();
  };

  var formsReset = function () {
    document.querySelector('.ad-form-header__preview img').src = 'img/muffin-grey.svg';
    adForm.reset();
    filtersForm.reset();
  };

  var onFormSubmitError = function (error) {
    window.page.createErrorPopup(error);
  };

  var onFormChange = function (evt) {
    if (evt.target.id === 'type') { // если меняется тип жилья, меняем минимальную цену
      document.querySelector('#price').min = offerPrice[evt.target.value];
      document.querySelector('#price').placeholder = offerPrice[evt.target.value];
    }
    if (evt.target.id === 'timein') {
      document.querySelector('#timeout').value = evt.target.value;
    }
    if (evt.target.id === 'timeout') {
      document.querySelector('#timein').value = evt.target.value;
    }
  };

  capacity.addEventListener('change', onFieldChange); // событие изменение количества гостей
  roomNumber.addEventListener('change', onFieldChange); // событие изменение количества комнат
  adForm.addEventListener('submit', onFormSend); // событие отправки формы
  adForm.addEventListener('change', onFormChange);

  window.form = {
    checkCapacityValidity: checkCapacityValidity,
    setPinCoords: setPinCoords,
    formsReset: formsReset
  };
})();
