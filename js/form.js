'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var addressField = document.querySelector('#address');
  var mapPin = document.querySelector('.map__pin--main'); // главная метка

  var mainPinAddress = window.pin.findAddress(mapPin, false);
  addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top; // выставляем координаты метки в неактивном состоянии

  var pageDeactivate = function (flag) {
    var fieldsetCollection = document.querySelectorAll('form fieldset');
    fieldsetCollection.forEach(function (element) {
      element.disabled = flag;
    });
  };

  var pageActivate = function () {
    pageDeactivate(false);
    window.pin.renderSimilarAds();
    checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
    adForm.classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    mainPinAddress = window.pin.findAddress(mapPin, true); // координаты метки в активном состоянии
    addressField.value = mainPinAddress.left + ', ' + mainPinAddress.top;
  };

  pageDeactivate(true);

  var capacity = document.querySelector('#capacity');
  var roomNumber = document.querySelector('#room_number');

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

  mapPin.addEventListener('mousedown', function (evt) { // обработчик клика на главную метку
    if (evt.button === 0) {
      pageActivate();
    }
  });

  mapPin.addEventListener('keydown', function (evt) { // обработчик нажатия на главную метку
    if (evt.key === 'Enter') {
      pageActivate();
    }
  });

  capacity.addEventListener('change', onFieldChange); // событие изменение количества гостей
  roomNumber.addEventListener('change', onFieldChange); // событие изменение количества комнат
  adForm.addEventListener('submit', onFormSend); // событие отправки формы

  window.form = {
    checkCapacityValidity: checkCapacityValidity,
    pageActivate: pageActivate,
    pageDeactivate: pageDeactivate
  };
})();
