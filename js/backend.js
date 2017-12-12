'use strict';

(function () {

  window.load = function (onSuccessCallback, onErrorCallback) {

    // Определяем основные данные
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 5000;

    // Опредялем событие окончания загрузки ресурса и вешаем ошибки
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccessCallback(xhr.response);
      } else {
        onErrorCallback('Произошла ошибка ' + xhr.status + '' + xhr.statusText);
      }
    });

    // Событие ошибки начала загрузки
    xhr.addEventListener('error', function () {
      onErrorCallback('Произошла ошибка соединения');
    });

    // Событие превышения таймауту
    xhr.addEventListener('timeout', function () {
      onErrorCallback('Превышен интервал ожидания');
    });

    // Устанавливаем соединение и отсылаем запрос
    xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.save = function (data, onSuccessCallback, onErrorCallback) {

    // Определяем основные данные
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 1000;

    // Опредялем событие окончания загрузки ресурса и вешаем ошибки
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        onSuccessCallback(xhr.response);
      } else {
        onErrorCallback('Произошла ошибка ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    // Событие ошибки начала загрузки
    xhr.addEventListener('error', function () {
      onErrorCallback('Произошла ошибка соединения');
    });

    // Событие превышения таймауту
    xhr.addEventListener('timeout', function () {
      onErrorCallback('Превышен интервал ожидания');
    });

    // Устанавливаем соединение и отсылаем запрос
    xhr.open('POST', 'https://1510.dump.academy/keksobooking');
    xhr.send(data);
  };
})();
