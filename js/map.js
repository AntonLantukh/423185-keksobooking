'use strict';
// Функция для определения случайного числа в диапазоне
function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}
// Содержимое объекта места жительства
var elementsList;
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
var elementCreate = function (i) {
  var element = {
    author: {'avatar': 'img/avatars/user0' + i + '.png'},
    offer: {
      'title': offer.title[i],
      'address': '{{location.x}}, {{location.y}}',
      'price': Math.round(getRandomArbitary(1000, 1000000)),
      'type': offer.type[Math.round(getRandomArbitary(0, 2))],
      'rooms': Math.round(getRandomArbitary(1, 5)),
      'guests': Math.round(getRandomArbitary(1, 10)),
      'checkin': offer.checkin[Math.round(getRandomArbitary(0, 2))],
      'checkout': offer.checkout[Math.round(getRandomArbitary(0, 2))],
      'features': offer.features.length = Math.round(getRandomArbitary(0, 5)),
      'description': '',
      'photos': []
    },
    location: {
      'x': getRandomArbitary(300, 900),
      'y': getRandomArbitary(100, 500)
    }
  };
  console.log(element);
  return element;
};
// Задаем цикл для функции
var i = 0;
for (var j = 0; j < 8; j++) {
  elementsList.push(elementCreate(i));
  console.log(elementsList);
  i++;
}
