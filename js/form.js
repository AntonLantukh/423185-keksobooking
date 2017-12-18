'use strict';

(function () {

  // Переменные формы
  var dialogHandle = document.querySelector('.map__pin--main');
  var address = document.querySelector('#address');

  var form = document.querySelector('.notice__form--disabled');
  var formData = document.querySelector('.notice__form');
  var formReset = document.querySelector('.form__reset');
  var map = document.querySelector('.map--faded');

  var titleNotice = document.querySelector('#title');

  var checkinTime = document.querySelector('#timein');
  var checkoutTime = document.querySelector('#timeout');

  var houseType = document.querySelector('#type');
  var housePrice = document.querySelector('#price');

  var roomNumber = document.querySelector('#room_number');
  var capacity = document.querySelector('#capacity');

  var dropAvatar = document.querySelector('.drop-zone');
  var inputAvatar = document.querySelector('#avatar');
  var dropImage = document.querySelector('.notice__preview').children[0];

  // Массивы данных формы
  var checkTimes = ['12:00', '13:00', '14:00'];
  var houses = ['flat', 'bungalo', 'house', 'palace'];
  var prices = [1000, 0, 5000, 10000];
  var rooms = ['1', '2', '3', '100'];
  var guests = ['1', '2', '3', '0'];


  // Вызываем обработчики
  titleNotice.addEventListener('invalid', setValidityTitle);
  housePrice.addEventListener('invalid', setValidityPrice);
  checkinTime.addEventListener('change', checkInSync);
  checkoutTime.addEventListener('change', checkOutSync);
  houseType.addEventListener('change', houseSync);
  roomNumber.addEventListener('change', roomSync);

  // Обработчики перетаскивания
  dropAvatar.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  // Событие конца перетаскивания
  dropAvatar.addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = 'white';
    event.preventDefault();
  });

  // Событие начала перетаскивания
  dropAvatar.addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });

  // Событие дроп на указанной зоне
  dropAvatar.addEventListener('drop', function () {
    renderDrop();
  });


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


  // Обработчик перетаскивания
  function renderDrop() {
    event.preventDefault();
    event.target.style.backgroundColor = '';
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', function (evt) {
      dropImage.setAttribute('src', evt.target.result);
    });
    reader.readAsDataURL(event.dataTransfer.files[0]);
  }

  // Обработчик формы для отсылки на сервер
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = new FormData(formData);
    data.append('avatar', dropImage.src);
    window.backend.save(data, function () {
      formToReset();
    }, onErrorCallback);
  });

  // Колбэк под двустороннюю синхронизацию
  function syncValue(secondElement, value) {
    secondElement.value = value;
  }

  // Колбэк под соотношение с мин
  function syncValueMin(secondElement, value) {
    secondElement.min = value;
    secondElement.placeholder = value;
  }

  // Колбэк под синхронизацию комнат и гостей
  function syncValueAsync(secondElement, value) {
    if (value === '100') {
      secondElement.value = '0';
    } else {
      secondElement.value = value;
    }
  }

  // Функция кастомной валидации для заголовка
  function setValidityTitle() {
    if (titleNotice.validity.tooShort) {
      titleNotice.setCustomValidity('Минимальная длина заголовка: 30 символов');
    } else if (titleNotice.validity.tooLong) {
      titleNotice.setCustomValidity('Максимальная длина заголовка: 100 символов');
    } else if (titleNotice.validity.valueMissing) {
      titleNotice.setCustomValidity('Обязательное поле');
    } else {
      titleNotice.setCustomValidity('');
    }
  }

  // Функция кастомной валидации для цены
  function setValidityPrice() {
    if (housePrice.validity.rangeUnderflow) {
      housePrice.setCustomValidity('Минимальная цена: ' + housePrice.min + ' р.');
    } else if (housePrice.validity.rangeOverflow) {
      housePrice.setCustomValidity('Максимальная цена: 1000000 р.');
    } else if (housePrice.validity.valueMissing) {
      housePrice.setCustomValidity('Обязательное поле');
    } else {
      housePrice.setCustomValidity('');
    }
  }

  // Синхронизируем поле отъезда с полем заезда
  function checkInSync() {
    window.synchronizeFields(checkinTime, checkoutTime, checkTimes, checkTimes, syncValue);
  }

  // Синхронизируем поле заезда с полем отъезда
  function checkOutSync() {
    window.synchronizeFields(checkoutTime, checkinTime, checkTimes, checkTimes, syncValue);
  }

  // Синхронизируем поле жилья и цены
  function houseSync() {
    window.synchronizeFields(houseType, housePrice, houses, prices, syncValueMin);
  }

  // Синхронизируем поле комнат и гостей
  function roomSync() {
    window.synchronizeFields(roomNumber, capacity, rooms, guests, syncValueAsync);
  }

  function formToReset() {
    formReset.click();
    var pinPlaceY = dialogHandle.offsetTop;
    var pinPlaceX = dialogHandle.offsetLeft;
    var mainPinAfter = 22;
    var mainPinHeight = dialogHandle.offsetHeight / 2 + mainPinAfter;
    // Выводим текущие координаты в адресное строку
    address.value = 'x: ' + (pinPlaceX) + ', y: ' + (pinPlaceY + mainPinHeight);
  }

  // Коллбэк для формы в случае ошибки
  function onErrorCallback(errorMessage) {
    var errorNode = document.createElement('div');
    errorNode.style = 'z-index: 100; top: 1600px; position: absolute; margin: 0 auto; width: 1200px; height: 40px; text-align: center;  background-color: rgb(253, 94, 83); font-size: 35px; color: white;';
    errorNode.textContent = errorMessage + '. Пожалуйста, перезагрузите страницу.';
    document.body.insertAdjacentElement('afterbegin', errorNode);
  }
})();
