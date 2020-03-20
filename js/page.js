'use strict';

(function () {

  var main = document.querySelector('main');
  var adForm = document.querySelector('.ad-form');
  var filtersForm = document.querySelector('.map__filters');
  var userAvatar = document.querySelector('#avatar');
  var userPreview = document.querySelector('.ad-form-header__preview img');

  var formActivate = function (form, flag) {

    form.querySelectorAll('form fieldset').forEach(function (element) {
      element.disabled = flag;
    });

    form.querySelectorAll('form select').forEach(function (element) {
      element.disabled = flag;
    });

    window.avatar.setUserAvatar(userAvatar, userPreview);
  };

  var onTryAgainButtonPress = function (evt) {
    evt.preventDefault();
    document.querySelector('.error').remove();
    pageDeactivate();
  };

  var onEscapePress = function (evt) {
    evt.preventDefault();
    if (evt.key === 'Escape') {
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
    errorButton.addEventListener('click', onTryAgainButtonPress);
  };

  var pageActivate = function () {

    formActivate(adForm, false); // активация формы adForm disabled = false

    window.backend.load(window.data.onSuccess, createErrorPopup);

    window.form.checkCapacityValidity(); // проверка на валидность поля capacity (кол-во гостей)
    document.querySelector('.ad-form').classList.remove('ad-form--disabled');
    document.querySelector('.map').classList.remove('map--faded');
    window.form.setPinCoords(true);
  };

  var pageDeactivate = function () {

    formActivate(adForm, true);
    formActivate(filtersForm, true);
    document.querySelector('.ad-form').classList.add('ad-form--disabled');
    document.querySelector('.map').classList.add('map--faded');
    document.querySelector('.map__pin--main').focus();
    window.map.pinDrop();
  };

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
