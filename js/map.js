'use strict';

(function () {
  // Отрисовка пинов и нотиса на карте
  //  Определяем коллбэк для отрисовки пинов и нотиса на карте
  var onSuccess = function (data) {

    var map = document.querySelector('.map--faded');
    var fragment = document.createDocumentFragment();
    var pinContainer = document.querySelector('.map__pins');

    // Поведение формы и карты при нажатии на пин
    var pinMain = document.querySelector('.map__pin--main');
    pinMain.addEventListener('mouseup', renderMap);

    function renderMap() {
      // Задаем цикл для функции генерации элемента (метки)
      if (map.classList.contains('map--faded')) {
        for (var i = 0; i < 10; i++) {
          var pinObject = data[i];
          var pinNode = window.pin.renderPin(pinObject);
          pinNode.datashare = pinObject;
          fragment.appendChild(pinNode);
        }
        pinContainer.appendChild(fragment);

        var formFieldset = document.querySelectorAll('.form__element');
        window.form.enableFields(formFieldset);

        pinMain.removeEventListener('mouseup', renderMap);
      }
    }
  };

  window.load(onSuccess, onError);

  // Определяем коллбэки
  var onError = function (message) {
    console.error(message);
  };
})();
