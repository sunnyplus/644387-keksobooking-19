'use strict';

(function () {
  var pinHandle = document.querySelector('.map__pin--main');
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

      pinHandle.style.left = (pinHandle.offsetLeft - shift.x) + 'px';
      pinHandle.style.top = (pinHandle.offsetTop - shift.y) + 'px';

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

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
