'use strict';

// Находим шаблон и контейнер для отрисовки метки
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// Находим шаблон и контейнер для отрисовки Объявления
var noticeTemplate = document.querySelector('template').content.querySelector('.map__card');
var noticeContainer = document.querySelector('.map');

// Элементы пинов и формы
var pinMain = document.querySelector('.map__pin--main');
var map = document.querySelector('.map--faded');
var form = document.querySelector('.notice__form--disabled');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

// Переменные для валидации формы
var arriveTime = document.querySelector('#timein');
var departureTime = document.querySelector('#timeout');
var houseType = document.querySelector('#type');
var housePrice = document.querySelector('#price');
var roomNumber = document.querySelector('#room_number');
var capacity = document.querySelector('#capacity');

// Объявляем переменные
var fakeOfferData = {
  'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  'address': '{{location.x}}, {{location.y}}',
  'price': range(1000, 1000000),
  'type': ['flat', 'house', 'bungalo'],
  'rooms': range(1, 5),
  'guests': range(1, 8),
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': '',
  'photos': []
};


// Поведение формы и карты при нажатии на пин
pinMain.addEventListener('mouseup', drawPins);

// Открытие попапа при клике
pinContainer.addEventListener('click', function () {
  var target = event.target.parentNode;
  if (target.tagName !== 'BUTTON' || target.classList.contains('map__pin--main')) {
    return;
  }
  changeSelectPinActive(target);
  removePopup();
  createPopup(target.datashare);

  document.addEventListener('keydown', onPopEscPress);
});

// Открытие попапа при нажатии на ENTER
pinContainer.addEventListener('keydown', function () {
  if (event.target.tagName !== 'BUTTON' || event.target.classList.contains('map__pin--main') || event.keyCode !== ENTER_KEYCODE) {
    return;
  }

  changeSelectPinActive(event.target);
  removePopup();
  createPopup(event.target.datashare);

  document.addEventListener('keydown', onPopEscPress);
});


// Закрытие попапа при клике на крестик
noticeContainer.addEventListener('click', function () {
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close')) {
    removePopup();
    diactivatePin();
  }
});

// Закрытие попапа при нажатии на ENTER
noticeContainer.addEventListener('keydown', function () {
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close') && event.keyCode === ENTER_KEYCODE) {
    removePopup();
    diactivatePin();
  }
});

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

// Добавляем синхронизацию на время отъезда
departureTime.addEventListener('change', function () {
  if (departureTime.options[0].selected === true) {
    arriveTime.options[0].selected = true;
  } else if (departureTime.options[1].selected === true) {
    arriveTime.options[1].selected = true;
  } else if (departureTime.options[2].selected === true) {
    arriveTime.options[2].selected = true;
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


// Функция генерации элемента (метки)
function createNotice(id, info) {
  var sliceFrom = range(0, info.features.length - 2);
  return {
    author: {'avatar': 'img/avatars/user0' + (id + 1) + '.png'},
    offer: {
      'title': shuffle(info.title).shift(),
      'address': (range(300, 900) - 40) + ', ' + (range(100, 500) - 40),
      'price': range(1000, 1000000),
      'type': info.type[range(0, 2)],
      'rooms': range(1, 5),
      'guests': range(1, 8),
      'checkin': info.checkin[range(0, 2)],
      'checkout': info.checkout[range(0, 2)],
      'features': shuffle(info.features).slice(sliceFrom),
      'description': '',
      'photos': []
    },
    location: {
      'x': range(300, 900) - 40,
      'y': range(100, 500) - 40
    }
  };
}

// Функция отрисовки метки
function renderPin(list) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + list.location.x + 'px' + '; top: ' + list.location.y + 'px');
  pinElement.children[0].setAttribute('src', list.author.avatar);

  return pinElement;
}

function drawPins() {
  // Задаем цикл для функции генерации элемента (метки)
  if (map.classList.contains('map--faded')) {
    for (var i = 0; i < 8; i++) {
      var pinObject = createNotice(i, fakeOfferData);
      var pinNode = renderPin(pinObject);
      pinNode.datashare = pinObject;
      fragment.appendChild(pinNode);
    }
    pinContainer.appendChild(fragment);

    var formFieldset = document.querySelectorAll('.form__element');
    enableFields(formFieldset);

    pinMain.removeEventListener('mouseup', drawPins);
  }
}

// Функция определения типа жилья
function defineFlatType(list) {
  var type;
  if (list.offer.type === 'flat') {
    type = 'Квартира';
  } else if (list.offer.type === 'bungalo') {
    type = 'Бунгало';
  } else if (list.offer.type === 'house') {
    type = 'Дом';
  }

  return type;
}

// Функция для создания списка удобств в рамках тега li
function createFeatures(id, list) {

  return '<li class="feature feature--' + list.offer.features[id] + '"></li>';
}

// Функция отрисовки объявления
function renderNotice(list) {
  var featuresArray = [];
  var noticeElement = noticeTemplate.cloneNode(true);
  noticeElement.children[2].textContent = list.offer.title;
  noticeElement.children[3].children[0].textContent = list.location.x + ', ' + list.location.y;
  noticeElement.children[4].innerHTML = list.offer.price + '&#x20bd;/ночь';
  noticeElement.children[5].textContent = defineFlatType(list);
  noticeElement.children[6].textContent = list.offer.rooms + ' для ' + list.offer.guests + ' гостей';
  noticeElement.children[7].textContent = 'Зазед после ' + list.offer.checkin + ', выезд до ' + list.offer.checkout;
  var featuresNotice = noticeElement.querySelector('.popup__features');
  for (var j = 0; j < list.offer.features.length; j++) {
    featuresArray.push(createFeatures(j, list));
  }
  featuresNotice.innerHTML = featuresArray.join(' ');
  noticeElement.children[9].textContent = list.offer.description;
  noticeElement.children[0].setAttribute('src', list.author.avatar);

  return noticeElement;
}

// Функция для определения случайного числа в диапазоне
function range(min, max) {

  return Math.round(Math.random() * (max - min) + min);
}

// Функция для перемешивания массива
function shuffle(array) {
  var counter = array.length;
  while (counter > 0) {
    var index = Math.floor(Math.random() * counter);
    counter--;
    var temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// Функция отображения скрытых полей
function enableFields(formFieldset) {
  for (var i = 0; i < formFieldset.length; i++) {
    formFieldset[i].disabled = false;
  }
  map.classList.remove('map--faded');
  form.classList.remove('notice__form--disabled');
}

// Функция смены класса активного пина
function changeSelectPinActive(targetNode) {
  var activePinNode = document.querySelector('.map__pin--active');
  if (activePinNode) {
    activePinNode.classList.toggle('map__pin--active');
  }
  targetNode.classList.add('map__pin--active');
}

// Функция снятия класса с неактивного пина
function diactivatePin() {
  var activePinNode = document.querySelector('.map__pin--active');
  if (activePinNode) {
    activePinNode.classList.remove('map__pin--active');
  }
}

// Функция удаления попапа
function removePopup() {
  var popup = noticeContainer.querySelector('.popup');
  if (popup) {
    popup.remove();
  }
}

// Функция рендера попапа
function createPopup(data) {
  var noticeNode = renderNotice(data);
  noticeContainer.appendChild(noticeNode);
}

// Функция удаления попапа при нажатии на крестик
function onPopEscPress(event) {
  var popup = noticeContainer.querySelector('.popup');
  if (popup && event.keyCode === ESC_KEYCODE) {
    removePopup();
    diactivatePin();
    document.removeEventListener('keydown', onPopEscPress);
  }
}
