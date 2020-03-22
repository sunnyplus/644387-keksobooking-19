'use strict';

(function () {

  var PIN_POINTER_HEIGHT = 22;
  var MIN_Y = 130;
  var MAX_Y = 630;

  var pinsMap = document.querySelector('.map');
  var pinHandle = document.querySelector('.map__pin--main');

  var pointerPinOffset = pinHandle.clientWidth / 2;

  var coordLimit = {
    Y_MIN: MIN_Y - pinHandle.offsetHeight - PIN_POINTER_HEIGHT,
    Y_MAX: MAX_Y - pinHandle.offsetHeight - PIN_POINTER_HEIGHT,
    X_MIN: -pointerPinOffset,
    X_MAX: pinsMap.clientWidth - pointerPinOffset
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

      var x = pinHandle.offsetLeft - shift.x;
      var y = pinHandle.offsetTop - shift.y;


      if (x < coordLimit.X_MIN) {
        x = coordLimit.X_MIN;
      }

      if (x > coordLimit.X_MAX) {
        x = coordLimit.X_MAX;
      }

      if (y < coordLimit.Y_MIN) {
        y = coordLimit.Y_MIN;
      }

      if (y > coordLimit.Y_MAX) {
        y = coordLimit.Y_MAX;
      }

      pinHandle.style.left = x + 'px';
      pinHandle.style.top = y + 'px';

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
