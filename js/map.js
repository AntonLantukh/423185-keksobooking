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
var elementCreate = function (j) {
  var element = {
    author: {'avatar': 'img/avatars/user0' + i + '.png'},
    offer: {
      'title': offer.title[j],
      'address': '{{location.x}}, {{location.y}}',
      'price': Math.round(getRandomArbitary(1000, 1000000)),
      'type': offer.type[Math.round(getRandomArbitary(0, 2))],
      'rooms': Math.round(getRandomArbitary(1, 5)),
      'guests': Math.round(getRandomArbitary(1, 10)),
      'checkin': offer.checkin[Math.round(getRandomArbitary(0, 2))],
      'checkout': offer.checkout[Math.round(getRandomArbitary(0, 2))],
      'features': chooseArrayPartRandom(offer.features),
      'description': '',
      'photos': []
    },
    location: {
      'x': Math.round(getRandomArbitary(300, 900)),
      'y': Math.round(getRandomArbitary(100, 500))
    }
  };
  i++;
  return element;
};
// Задаем цикл для функции генерации элемента
for (var j = 0; j < 8; j++) {
  elementsList[j] = elementCreate(j);
}
// Убираем класс .map--faded
var mapDisplay = document.querySelector('.map--faded');
mapDisplay.classList.remove('hidden');
// Находим шаблон и контейнер для отрисовки метки
var templateDoc = document.querySelector('template');
var pinTemplate = templateDoc.content.querySelector('.map__pin');
var pinContainer = document.querySelector('.map__pins');
// Функция отрисовки метки
var renderPin = function (elementsList) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + elementsList.location.x + 'px' + '; top: ' + elementsList.location.y + 'px');
  pinElement.children[0].setAttribute('src', elementsList.author.avatar);
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
function declareFlatType(elementsList) {
  if (elementsList.offer.type === 'flat') {
    return 'Квартира';
  } else if (elementsList.offer.type === 'bungalo') {
    return 'Бунгало';
  } else if (elementsList.offer.type === 'house') {
    return 'Дом';
  }
}
// Функция для генерирования списка удобств
var featuresArray = [];
var renderFeatures = function (elementsList) {
  return '<li class="feature feature--' + elementsList.offer.features[i] + '"></li>';
};
// Функция отрисовки объявления
var renderNotice = function (elementsList) {
  var noticeElement = noticeTemplate.cloneNode(true);
  noticeElement.children[2].textContent = elementsList.offer.title;
  noticeElement.children[3].children[0].textContent = elementsList.location.x + ', ' + elementsList.location.y;
  noticeElement.children[4].textContent = elementsList.offer.price + '&#x20bd;/ночь';
  noticeElement.children[5].textContent = declareFlatType(elementsList);
  noticeElement.children[6].textContent = elementsList.offer.rooms + ' для ' + elementsList.offer.guests + ' гостей';
  noticeElement.children[7].textContent = 'Зазед после ' + elementsList.offer.checkin + ', выезд до ' + elementsList.offer.checkout;
  var featuresNotice = noticeElement.querySelector('.popup__features');
  for (i = 0; i < elementsList.offer.features.length; i++) {
    featuresArray.push(renderFeatures(elementsList));
  }
  featuresNotice.innerHTML = featuresArray.join(' ');
  noticeElement.children[9].textContent = elementsList.offer.description;
  noticeElement.children[0].setAttribute('src', elementsList.author.avatar);
  console.log(noticeElement.children[0]);
  return noticeElement;
};
// Отрисовка через вызов функции в цикле
for (i = 0; i < 1; i++) {
  fragment.appendChild(renderNotice(elementsList[i]));
}
noticeContainer.appendChild(fragment);
