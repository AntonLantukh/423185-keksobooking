'use strict';

(function () {

  window.load = function (onSuccess, onError) {

    // Определяем основные данные
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 1000;

    // Опредялем событие окончания загрузки ресурса и вешаем ошибки
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }
      if (error) {
        onError(error);
      }
    });

    // Событие ошибки начала загрузки
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // Событие превышения таймауту
    xhr.addEventListener('timeout', function () {
      onError('Превышен интервал ожидания');
    });

    // Устанавливаем соединение и отсылаем запрос
    xhr.open('GET', 'https://1510.dump.academy/keksobooking/data');
    xhr.send();
  };

  window.save = function (data, onSuccess, onError) {

    // Определяем основные данные
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';
    xhr.timeout = 1000;

    // Опредялем событие окончания загрузки ресурса и вешаем ошибки
    xhr.addEventListener('load', function () {
      var error;
      switch (xhr.status) {
        case 200:
          onSuccess(xhr.response);
          break;
        case 400:
          error = 'Неверный запрос';
          break;
        case 401:
          error = 'Пользователь не авторизован';
          break;
        case 404:
          error = 'Ничего не найдено';
          break;
        default:
          error = 'Неизвестный статус: ' + xhr.status + ' ' + xhr.statusText;
          break;
      }
      if (error) {
        onError(error);
      }
    });

    // Событие ошибки начала загрузки
    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });

    // Событие превышения таймауту
    xhr.addEventListener('timeout', function () {
      onError('Превышен интервал ожидания');
    });

    // Устанавливаем соединение и отсылаем запрос
    xhr.open('POST', 'https://1510.dump.academy/keksobooking');
    xhr.send(data);
  };
})();
