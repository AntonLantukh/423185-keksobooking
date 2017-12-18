'use strict';

(function () {

  // Переменные
  var map = document.querySelector('.map--faded');
  var fragment = document.createDocumentFragment();
  var pinContainer = document.querySelector('.map__pins');
  var pinMain = document.querySelector('.map__pin--main');


  // Загрузка данных
  window.backend.load(onSuccessCallback, onErrorCallback);
  pinMain.addEventListener('mouseup', renderMap);


  // Поведение формы и карты при нажатии на пин
  function renderMap() {
    // Задаем цикл для функции генерации элемента (метки)
    if (map.classList.contains('map--faded')) {
      for (var i = 0; i <= 4; i++) {
        var pinObject = window.map.noticeArray[i];
        var pinNode = window.pin.render(pinObject);
        pinNode.datashare = pinObject;
        fragment.appendChild(pinNode);
      }
      pinContainer.appendChild(fragment);
      var formFieldset = document.querySelectorAll('fieldset');
      window.form.enableFields(formFieldset);

      pinMain.removeEventListener('mouseup', renderMap);
    }
  }

  // Определяем коллбэки
  function onSuccessCallback(data) {
    window.map = {
      noticeArray: data
    };
  }

  function onErrorCallback(errorMessage) {
    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 100; top: 500px; position: absolute; margin: 0 auto; width: 1200px; height: 40px; text-align: center;  background-color: rgb(253, 94, 83); font-size: 35px; color: white;';
    errorNode.textContent = errorMessage + '. Пожалуйста, перезагрузите страницу.';
    document.body.insertAdjacentElement('afterbegin', errorNode);
  }
})();
