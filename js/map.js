'use strict';

(function () {
  // Отрисовка пинов и нотиса на карте
  function drawPins() {

    var map = document.querySelector('.map--faded');
    var fragment = document.createDocumentFragment();
    var pinContainer = document.querySelector('.map__pins');

    // Задаем цикл для функции генерации элемента (метки)
    if (map.classList.contains('map--faded')) {
      for (var i = 0; i < 8; i++) {
        var pinObject = window.data.createNotice(window.data.fakeOfferData, i);
        var pinNode = window.pin.renderPin(pinObject);
        pinNode.datashare = pinObject;
        fragment.appendChild(pinNode);
      }
      pinContainer.appendChild(fragment);

      var formFieldset = document.querySelectorAll('.form__element');
      window.form.enableFields(formFieldset);

      pinMain.removeEventListener('mouseup', drawPins);
    }
  }


  // Поведение формы и карты при нажатии на пин
  var pinMain = document.querySelector('.map__pin--main');
  pinMain.addEventListener('mouseup', drawPins);
})();
