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
console.log(coordLimit);
  
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

      // var pinCoords = window.map.findAddress(pinHandle, true);

      if (pinHandle.offsetLeft > coordLimit.X_MAX) {
        // pinHandle.left = coordLimit.X_MAX;
        pinHandle.style.left = coordLimit.X_MAX;
        console.log(pinHandle.offsetLeft);
      } else if (pinHandle.offsetLeft < coordLimit.X_MIN) {
        // pinHandle.left = coordLimit.X_MIN;
        pinHandle.style.left = coordLimit.X_MIN;
        console.log(pinHandle.offsetLeft);
      } else {
        pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      }


      // if (pinCoords.top < coordLimit.Y_MAX && pinCoords.top > coordLimit.Y_MIN) {
      //   pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';
      // }

      // console.log('пин x:' + pinCoords.left);
      // console.log('пин y:' + pinCoords.top);
      // console.log('X_MAX:' + coordLimit.X_MAX);
      // console.log('X_MIN:' + coordLimit.X_MIN);
      // console.log('курсор X:' + moveEvt.clientX);

      window.page.drawPinCoords(true);
    };

    var onMouseUp = function () {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      window.page.drawPinCoords(true);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
