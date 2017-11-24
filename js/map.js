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
var elementCreate = function (j) {
  var element = {
    author: {'avatar': 'img/avatars/user0' + j + '.png'},
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
  console.log(element);
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
var pinTemplate = document.querySelector('map__pin');
var pinContainer = document.querySelector('map');
// Функция отрисовки метки
var renderPin = function (elementsList) {
  var pinElement = pinTemplate.cloneNode(true);
  pinElement.setAttribute('style', 'left: ' + elementsList.location.x + ';');
  pinElement.setAttribute('style', 'right: ' + elementsList.location.y + ';');
  pinElement.setAttribute('src', 'right: ' + elementsList.location.y + ';');
  pinElement.querySelector('.setup-similar-label').textContent = wizard.name;
  pinElement.querySelector('.wizard-coat').style.fill = wizard.coatColor;
  return pinElement;
}
