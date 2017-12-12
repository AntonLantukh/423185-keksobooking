'use strict';

(function () {

  // Переменные формы
  var form = document.querySelector('.notice__form--disabled');
  var formData = document.querySelector('.notice__form');
  var formReset = document.querySelector('.form__reset');
  var map = document.querySelector('.map--faded');

  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  // Массивы данных формы
  var checkTime = ['12:00', '13:00', '14:00'];
  var house = ['flat', 'bungalo', 'house', 'palace'];
  var price = [1000, 0, 5000, 10000];
  var rooms = ['1', '2', '3', '100'];
  var guests = ['1', '2', '3', '0'];

  window.form = {
    // Функция отображения скрытых полей
    enableFields: function (formFieldset) {
      for (var i = 0; i < formFieldset.length; i++) {
        formFieldset[i].disabled = false;
      }
      map.classList.remove('map--faded');
      form.classList.remove('notice__form--disabled');
    }
  };

  // Колбэк под двустороннюю синхронизацию
  var syncValue = function (secondElement, value) {
    secondElement.value = value;
  };

  // Колбэк под соотношение с мин
  var syncValueMin = function (secondElement, value) {
    secondElement.min = value;
    secondElement.placeholder = value;
  };

  // Колбэк под синхронизацию комнат и гостей
  var syncValueAsync = function (secondElement, value) {
    if (value === '100') {
      secondElement.value = '0';
    } else {
      secondElement.value = value;
    }
  };

  // Синхронизируем поле отъезда с полем заезда
  function checkInSync() {
    window.synchronizeFields(checkinTime, checkoutTime, checkTime, checkTime, syncValue);
  }

  // Синхронизируем поле заезда с полем отъезда
  function checkOutSync() {
    window.synchronizeFields(checkoutTime, checkinTime, checkTime, checkTime, syncValue);
  }

  // Синхронизируем поле жилья и цены
  function houseSync() {
    window.synchronizeFields(houseType, housePrice, house, price, syncValueMin);
  }

  // Синхронизируем поле комнат и гостей
  function roomSync() {
    window.synchronizeFields(roomNumber, capacity, rooms, guests, syncValueAsync);
  }

  // Вызываем обработчики
  checkinTime.addEventListener('change', checkInSync);
  checkoutTime.addEventListener('change', checkOutSync);
  houseType.addEventListener('change', houseSync);
  roomNumber.addEventListener('change', roomSync);

  form.addEventListener('submit', function (event) {
    event.preventDefault();
    window.backend.save(new FormData(formData), function () {
      formReset.click();
    }, onErrorCallback);
  });

  // Коллбэк для формы в случае ошибки
  var onErrorCallback = function (errorMessage) {
    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 100; top: 1600px; position: absolute; margin: 0 auto; width: 1200px; height: 40px; text-align: center;  background-color: rgb(253, 94, 83); font-size: 35px; color: white;';
    errorNode.textContent = errorMessage + '. Пожалуйста, перезагрузите страницу.';
    document.body.insertAdjacentElement('afterbegin', errorNode);
  };
})();
