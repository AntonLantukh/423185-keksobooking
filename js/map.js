'use strict';
// Функция для определения случайного числа в диапазоне
function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}
// Функция для случайного обрезания массива
function chooseArrayPartRandom(featuresCut) {
  featuresCut = featuresCut.slice(Math.round(getRandomArbitary(0, 4)));
  return featuresCut;
}
// Функция для перемешивания массива
function shuffleArray(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}
// Объявляем переменные
var elementsList = [];
// Содержимое объекта места жительства
var offer = {
  'title': ['Большая уютная квартира', 'Маленькая неуютная квартира', 'Огромный прекрасный дворец', 'Маленький ужасный дворец', 'Красивый гостевой домик', 'Некрасивый негостеприимный домик', 'Уютное бунгало далеко от моря', 'Неуютное бунгало по колено в воде'],
  'address': '{{location.x}}, {{location.y}}',
  'price': getRandomArbitary(1000, 1000000),
  'type': ['flat', 'house', 'bungalo'],
  'rooms': Math.round(getRandomArbitary(1, 5)),
  'guests': Math.round(getRandomArbitary(1, 10)),
  'checkin': ['12:00', '13:00', '14:00'],
  'checkout': ['12:00', '13:00', '14:00'],
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': '',
  'photos': []
};
// Функция генерации элемента
var i = 1;
var elementCreate = function (j, info) {
  var element = {
    author: {'avatar': 'img/avatars/user0' + i + '.png'},
    offer: {
      'title': info.title[j],
      'address': Math.round(getRandomArbitary(300, 900)) - 40 + ', ' + Math.round(getRandomArbitary(100, 500)) - 40,
      'price': Math.round(getRandomArbitary(1000, 1000000)),
      'type': info.type[Math.round(getRandomArbitary(0, 2))],
      'rooms': Math.round(getRandomArbitary(1, 5)),
      'guests': Math.round(getRandomArbitary(1, 8)),
      'checkin': info.checkin[Math.round(getRandomArbitary(0, 2))],
      'checkout': info.checkout[Math.round(getRandomArbitary(0, 2))],
      'features': chooseArrayPartRandom(shuffleArray(info.features)),
      'description': '',
      'photos': []
    },
    location: {
      'x': Math.round(getRandomArbitary(300, 900)) - 40,
      'y': Math.round(getRandomArbitary(100, 500)) - 40
    }
  };
  i++;
  return element;
};
// Задаем цикл для функции генерации элемента
for (var j = 0; j < 8; j++) {
  elementsList[j] = elementCreate(j, offer);
}
// Убираем класс .map--faded
var mapDisplay = document.querySelector('.map--faded');
mapDisplay.classList.remove('hidden');
// Находим шаблон и контейнер для отрисовки метки
var templateDoc = document.querySelector('template');
var pinTemplate = templateDoc.content.querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
// Функция отрисовки метки
var renderPin = function (list) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + list.location.x + 'px' + '; top: ' + list.location.y + 'px');
  pinElement.children[0].setAttribute('src', list.author.avatar);
  return pinElement;
};
// Отрисовка через вызов функции в цикле
var fragment = document.createDocumentFragment();
for (i = 0; i < elementsList.length; i++) {
  fragment.appendChild(renderPin(elementsList[i]));
}
pinContainer.appendChild(fragment);
// Находим шаблон и контейнер для отрисовки Объявления
var noticeTemplate = templateDoc.content.querySelector('.map__card');
var noticeContainer = document.querySelector('.map');
// Функция определения типа жилья
function declareFlatType(list) {
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
var featuresArray = [];
var renderFeatures = function (list) {
  return '<li class="feature feature--' + list.offer.features[i] + '"></li>';
};
// Функция отрисовки объявления
var renderNotice = function (list) {
  var noticeElement = noticeTemplate.cloneNode(true);
  noticeElement.children[2].textContent = list.offer.title;
  noticeElement.children[3].children[0].textContent = list.location.x + ', ' + list.location.y;
  noticeElement.children[4].textContent = list.offer.price + '&#x20bd;/ночь';
  noticeElement.children[5].textContent = declareFlatType(list);
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
// Отрисовка через вызов функции в цикле
for (i = 0; i < 1; i++) {
  fragment.appendChild(renderNotice(elementsList[i]));
}
noticeContainer.appendChild(fragment);
