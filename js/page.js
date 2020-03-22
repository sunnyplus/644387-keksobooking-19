'use strict';

(function () {

  var PIN_POINTER_HEIGHT = 22;
  var INITIAL_COORDS = {
    x: 602,
    y: 462
  };

  var main = document.querySelector('main');
  var addressField = document.querySelector('#address');
  var mainPin = document.querySelector('.map__pin--main');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var userAvatar = document.querySelector('#avatar');
  var houseAvatar = document.querySelector('#images');
  var userPreview = document.querySelector('.ad-form-header__preview img');
  var resetButton = document.querySelector('.ad-form__reset');

  window.avatar.setUserAvatar(userAvatar, userPreview);
  window.avatar.setUserAvatar(houseAvatar);

  var formActivate = function (form, flag) {

    form.querySelectorAll('form fieldset').forEach(function (element) {
      element.disabled = flag;
    });

    form.querySelectorAll('form select').forEach(function (element) {
      element.disabled = flag;
    });
  };

  var onTryAgainErrorButtonPress = function (evt) {
    evt.preventDefault();
    if (document.querySelector('.map__filter').disabled === true) {
      pageDeactivate();
    }
    document.querySelector('.error').remove();
  };

  var onEscapePress = function (evt) {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      var successPopup = document.querySelector('.success');
      if (successPopup) {
        successPopup.remove();
      }
      var card = document.querySelector('.map__card');
      if (card) {
        card.remove();
      }
      document.removeEventListener('keydown', window.page.onEscapePress);
    }
  };

  var onPopupClick = function (evt) {
    evt.stopPropagation();
    if (evt.target.className === 'success') {
      document.querySelector('.success').remove();
      document.removeEventListener('keydown', window.page.onEscapePress);
    }
  };

  var createSuccessPopup = function () {
    var successFragment = document.createDocumentFragment();
    var successPopup = document.querySelector('#success').content.querySelector('.success').cloneNode(true);
    successFragment.append(successPopup);
    main.append(successFragment);
  };

  var createErrorPopup = function (error) {
    var errorFragment = document.createDocumentFragment();
    var errorPopup = document.querySelector('#error').content.querySelector('.error').cloneNode(true);
    errorPopup.querySelector('.error__message').textContent = error;
    errorFragment.append(errorPopup);
    main.append(errorFragment);
    var errorButton = errorPopup.querySelector('.error__button');
    errorButton.focus();
    errorButton.addEventListener('click', onTryAgainErrorButtonPress);
  };

  var pageActivate = function () {

    window.page.isPageActive = true;
    formActivate(adForm, false);

    window.backend.load(window.data.onSuccess, createErrorPopup);

    window.form.checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    window.form.setPinCoords(true);
  };

  var pageDeactivate = function () {

    window.page.isPageActive = false;
    formActivate(adForm, true);
    formActivate(filtersForm, true);
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.map__pin--main').focus();
    window.map.pinDrop();
    window.util.dropElement('.map__card');
    setInitialCoords();
  };

  var setInitialCoords = function () {
    addressField.value = INITIAL_COORDS.x + ', ' + INITIAL_COORDS.y;
    mainPin.style.left = (INITIAL_COORDS.x - Math.floor(mainPin.offsetWidth / 2)) + 'px';
    mainPin.style.top = (INITIAL_COORDS.y - mainPin.offsetheight - PIN_POINTER_HEIGHT) + 'px';
  };

  var onResetButtonPress = function (evt) {
    evt.preventDefault();
    window.form.formsReset();
    window.map.pinDrop();
    window.util.dropElement('.map__card');
    setInitialCoords();
    pageDeactivate();
  };

  resetButton.addEventListener('click', onResetButtonPress);

  formActivate(adForm, true);
  formActivate(filtersForm, true);

  window.page = {
    pageActivate: pageActivate,
    pageDeactivate: pageDeactivate,
    createErrorPopup: createErrorPopup,
    createSuccessPopup: createSuccessPopup,
    onEscapePress: onEscapePress,
    onPopupClick: onPopupClick,
    formActivate: formActivate
  };
})();
