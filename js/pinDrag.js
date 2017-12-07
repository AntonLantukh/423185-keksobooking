'use strict';

(function () {

  // Перетаскивание пина
  var dialogHandle = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  dialogHandle.addEventListener('mousedown', function (event) {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
      y: event.clientY
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

      // Задаем проверку координаты Y для выставления лимитов
      var limitY = dialogHandle.offsetTop - shift.y;
      var pinShift = 0;

      if (limitY > 446) {
        limitY = 446;
        pinShift = 54;
      } else if (limitY < 54) {
        limitY = 46;
        pinShift = 54;
      } else {
        limitY = dialogHandle.offsetTop - shift.y;
      }

      dialogHandle.style.top = limitY + 'px';
      dialogHandle.style.left = (dialogHandle.offsetLeft - shift.x) + 'px';

      // Выводим текущие координаты в адресное строку
      address.value = 'x: ' + (dialogHandle.offsetLeft - shift.x) + ', y: ' + (limitY + pinShift);
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
