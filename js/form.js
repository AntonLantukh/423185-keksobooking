'use strict';

(function () {

  var form = document.querySelector('.notice__form--disabled');
  var map = document.querySelector('.map--faded');

  var arriveTime = document.querySelector('#timein');
  var departureTime = document.querySelector('#timeout');
  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');
  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

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


  // Правила синхронизации для формы

  // Добавляем синхронизацию на время заезда
  arriveTime.addEventListener('change', function () {
    if (arriveTime.options[0].selected === true) {
      departureTime.options[0].selected = true;
    } else if (arriveTime.options[1].selected === true) {
      departureTime.options[1].selected = true;
    } else if (arriveTime.options[2].selected === true) {
      departureTime.options[2].selected = true;
    }
  });

  // Добавляем синхронизацию к типу жилья
  houseType.addEventListener('change', function () {
    if (houseType.options[0].selected === true) {
      housePrice.min = 1000;
      housePrice.placeholder = 1000;
    } else if (houseType.options[1].selected === true) {
      housePrice.min = 0;
      housePrice.placeholder = 0;
    } else if (houseType.options[2].selected === true) {
      housePrice.min = 5000;
      housePrice.placeholder = 5000;
    } else if (houseType.options[3].selected === true) {
      housePrice.min = 10000;
      housePrice.placeholder = 10000;
    }
  });

  // Добавляем синхронизацию количества комнат
  roomNumber.addEventListener('change', function () {
    if (roomNumber.options[0].selected === true) {
      capacity.options[2].selected = true;
    } else if (roomNumber.options[1].selected === true) {
      capacity.options[1].selected = true;
    } else if (roomNumber.options[2].selected === true) {
      capacity.options[0].selected = true;
    } else if (roomNumber.options[3].selected === true) {
      capacity.options[3].selected = true;
    }
  });
})();
