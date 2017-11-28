'use strict';

// Находим шаблон и контейнер для отрисовки метки
var mapDisplay = document.querySelector('.map--faded');
var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
var fragment = document.createDocumentFragment();

// Находим шаблон и контейнер для отрисовки Объявления
var noticeTemplate = document.querySelector('template').content.querySelector('.map__card');
var noticeContainer = document.querySelector('.map');

// Объявляем переменные
var i = 1;
var elementsList = [];
var featuresArray = [];
var offer = {
  'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  'address': '{{location.x}}, {{location.y}}',
  'price': range(1000, 1000000),
  'type': ['flat', 'house', 'bungalo'],
  'rooms': Math.round(range(1, 5)),
  'guests': Math.round(range(1, 10)),
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': '',
  'photos': []
};


// Убираем класс .map--faded
mapDisplay.classList.remove('hidden');

// Задаем цикл для функции генерации элемента (метки)
for (var j = 0; j < 8; j++) {
  elementsList[j] = elementCreate(j, offer);
}

// Отрисовка меток через вызов функции в цикле
for (i = 0; i < elementsList.length; i++) {
  fragment.appendChild(renderPin(elementsList[i]));
}
pinContainer.appendChild(fragment);

// Отрисовка объявления через вызов функции в цикле
for (i = 0; i < 1; i++) {
  fragment.appendChild(noticeCreate(elementsList[i]));
}
noticeContainer.appendChild(fragment);


// Функция генерации элемента (метки)
function elementCreate(j, info) {
  var element = {
    author: {'avatar': 'img/avatars/user0' + i + '.png'},
    offer: {
      'title': info.title[j],
      'address': Math.round(range(300, 900)) - 40 + ', ' + Math.round(range(100, 500)) - 40,
      'price': Math.round(range(1000, 1000000)),
      'type': info.type[Math.round(range(0, 2))],
      'rooms': Math.round(range(1, 5)),
      'guests': Math.round(range(1, 8)),
      'checkin': info.checkin[Math.round(range(0, 2))],
      'checkout': info.checkout[Math.round(range(0, 2))],
      'features': chooseArrayPartRandom(shuffleArray(info.features)),
      'description': '',
      'photos': []
    },
    location: {
      'x': Math.round(range(300, 900)) - 40,
      'y': Math.round(range(100, 500)) - 40
    }
  };
  i++;
  return element;
}

// Функция отрисовки метки
function renderPin(list) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + list.location.x + 'px' + '; top: ' + list.location.y + 'px');
  pinElement.children[0].setAttribute('src', list.author.avatar);
  return pinElement;
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

// Функция для генерирования списка удобств
var renderFeatures = function (list) {
  return '<li class="feature feature--' + list.offer.features[i] + '"></li>';
};

// Функция отрисовки объявления
var noticeCreate = function (list) {
  var noticeElement = noticeTemplate.cloneNode(true);
  noticeElement.children[2].textContent = list.offer.title;
  noticeElement.children[3].children[0].textContent = list.location.x + ', ' + list.location.y;
  noticeElement.children[4].textContent = list.offer.price + '&#x20bd;/ночь';
  noticeElement.children[5].textContent = defineFlatType(list);
  noticeElement.children[6].textContent = list.offer.rooms + ' для ' + list.offer.guests + ' гостей';
  noticeElement.children[7].textContent = 'Зазед после ' + list.offer.checkin + ', выезд до ' + list.offer.checkout;
  var featuresNotice = noticeElement.querySelector('.popup__features');
  for (i = 0; i < list.offer.features.length; i++) {
    featuresArray.push(renderFeatures(list));
  }
  featuresNotice.innerHTML = featuresArray.join(' ');
  noticeElement.children[9].textContent = list.offer.description;
  noticeElement.children[0].setAttribute('src', list.author.avatar);
  return noticeElement;
};

// Функция для перемешивания массива
function shuffleArray(array) {
  for (i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

// Функция для определения случайного числа в диапазоне
function range(min, max) {
  return Math.random() * (max - min) + min;
}

// Функция для случайного обрезания массива
function chooseArrayPartRandom(featuresCut) {
  featuresCut = featuresCut.slice(Math.round(range(0, 4)));
  return featuresCut;
}
