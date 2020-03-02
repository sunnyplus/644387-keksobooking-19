'use strict';

(function () {

  var PIN_POINTER_HEIGHT = 22;

  var pinsMap = document.querySelector('.map__pins');
  var pinHandle = document.querySelector('.map__pin--main');

  var coordLimit = {
    Y_MIN: 130 - pinHandle.offsetHeight - PIN_POINTER_HEIGHT,
    Y_MAX: 630 - pinHandle.offsetHeight - PIN_POINTER_HEIGHT,
    X_MIN: pinsMap.offsetLeft - pinHandle.offsetWidth / 2,
    X_MAX: pinsMap.offsetWidth - pinHandle.offsetWidth / 2
  };

  pinHandle.addEventListener('mousedown', function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      if (pinHandle.offsetLeft > coordLimit.X_MAX) {
        pinHandle.style.left = coordLimit.X_MAX;
      } else if (pinHandle.offsetLeft < coordLimit.X_MIN) {
        pinHandle.style.left = coordLimit.X_MIN;
      } else {
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      }

      if (pinHandle.offsetTop > coordLimit.Y_MAX) {
        pinHandle.style.top = coordLimit.Y_MAX;
      } else if (pinHandle.offsetTop < coordLimit.Y_MIN) {
        pinHandle.style.top = coordLimit.Y_MIN;
      } else {
        pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      }

      window.form.setPinCoords(true);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.form.setPinCoords(true);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
