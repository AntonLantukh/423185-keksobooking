'use strict';

(function () {

  // Перетаскивание пина
  var dialogHandle = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');
  var body = document.querySelector('body');

  var limitYTop = 100;
  var limitYBottom = 500;
  var limitXLeft = body.offsetLeft;
  var limitXRight = body.offsetLeft + body.offsetWidth;

  var mainPinAfter = 22;
  var mainPinHeight = dialogHandle.offsetHeight / 2 + mainPinAfter;

  dialogHandle.addEventListener('mousedown', function (event) {
    event.preventDefault();

    var startCoords = {
      x: event.clientX,
      y: event.clientY,
    };
    var onMouseMove = function (moveEvent) {
      moveEvent.preventDefault();
      var shift = {
        x: startCoords.x - moveEvent.clientX,
        y: startCoords.y - moveEvent.clientY
      };
      startCoords = {
        x: moveEvent.clientX,
        y: moveEvent.clientY
      };

      // Высчитываем рамки для передвижения пина
      var pinPlaceY = dialogHandle.offsetTop - shift.y;
      var pinPlaceX = dialogHandle.offsetLeft - shift.x;

      if (pinPlaceY > limitYBottom) {
        pinPlaceY = limitYBottom;
      } else if (pinPlaceY < limitYTop) {
        pinPlaceY = limitYTop;
      } else {
        pinPlaceY = dialogHandle.offsetTop - shift.y;
      }

      if (pinPlaceX > limitXRight) {
        pinPlaceX = limitXRight;
      } else if (pinPlaceX < limitXLeft) {
        pinPlaceX = limitXLeft;
      } else {
        pinPlaceX = dialogHandle.offsetLeft - shift.x;
      }

      // Отрисовывем движение на карте
      dialogHandle.style.top = pinPlaceY + 'px';
      dialogHandle.style.left = pinPlaceX + 'px';

      // Выводим текущие координаты в адресное строку
      address.value = 'x: ' + (pinPlaceX) + ', y: ' + (pinPlaceY + mainPinHeight);
    };
    var onMouseUp = function (upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
})();
