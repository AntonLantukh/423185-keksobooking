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
var formFieldset = document.querySelector('.form__element');
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;

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
pinContainer.addEventListener('mouseup', function () {
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
  var popup = noticeContainer.querySelector('.popup');
  var target = event.target.parentNode;
  if (event.target.tagName || 'BUTTON' && !event.target.classList.contains('map__pin--main') && event.keyCode === ENTER_KEYCODE) {
    return;
  }
  changeSelectPinActive(target);
  removePopup();
  createPopup(target.datashare);
  document.addEventListener('keydown', onPopEscPress);
});


// Закрытие попапа при клике на крестик
noticeContainer.addEventListener('mouseup', function () {
  var popup = noticeContainer.querySelector('.popup');
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close')) {
    popup.classList.add('hidden');
    diactivePin();
  }
});

// Закрытие попапа при клике на крестик
noticeContainer.addEventListener('keydown', function () {
  var popup = noticeContainer.querySelector('.popup');
  if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close') && event.keyCode === ENTER_KEYCODE) {
    popup.classList.add('hidden');
    diactivePin();
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
    enableFields(map, form);
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
function enableFields(map, form) {
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
function diactivePin() {
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
  noticeNode.classList.remove('hidden');
  noticeContainer.appendChild(noticeNode);
}

// Функция удаления попапа при нажатии на крестик
function onPopEscPress(event) {
  var popup = noticeContainer.querySelector('.popup');
  if (popup && event.keyCode === ESC_KEYCODE) {
    removePopup();
    diactivePin();
    document.removeEventListener('keydown', onPopEscPress);
  }
}
