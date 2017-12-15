'use strict';

(function () {
  // Выносим модуль xhr с в отдельную функцию
  var setup = function (onSuccessCallback, onErrorCallback) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccessCallback(xhr.response);
      } else {
        onErrorCallback('Произошла ошибка');
      }
    });
    xhr.addEventListener('error', function () {
      onErrorCallback('Произошла ошибка соединения');
    });
    xhr.addEventListener('timeout', function () {
      onErrorCallback('Превышен интервал ожидания');
    });

    return xhr;
  };

  window.backend = {
    // Функция подгрузки данных с сервера
    load: function (onSuccessCallback, onErrorCallback) {
      var xhr = setup(onSuccessCallback, onErrorCallback);
      // Устанавливаем соединение и отсылаем запрос
      xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
      xhr.send();
    },

    // Функция загрузки данных на сервер
    save: function (data, onSuccessCallback, onErrorCallback) {
      var xhr = setup(onSuccessCallback, onErrorCallback);
      // Устанавливаем соединение и отсылаем запрос
      xhr.open('POST', 'https://1510.dump.academy/keksobooking');
      xhr.send(data);
    }
  };
})();
