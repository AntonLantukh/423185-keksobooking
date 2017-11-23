'use strict';

function getRandomArbitary(min, max) {
  return Math.random() * (max - min) + min;
}


var mapStructure = [];
var author = {'avatar': 'img/avatars/user{{xx}}.png'};
var offer = {
  'title': '"Большая уютная квартира", "Маленькая неуютная квартира", "Огромный прекрасный дворец", "Маленький ужасный дворец", "Красивый гостевой домик", "Некрасивый негостеприимный домик", "Уютное бунгало далеко от моря", "Неуютное бунгало по колено в воде"',
  'address': '{{location.x}}, {{location.y}}',
  'price': getRandomArbitary(1000, 1000000),
  'type': 'flat, house или bungalo',
  'rooms': Math.round(getRandomArbitary(1, 5)),
  'guests': Math.round(getRandomArbitary(1, 10)),
  'checkin': '12:00, 13:00, 14:00',
  'checkout': '12:00, 13:00, 14:00',
  'features': ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'],
  'description': '',
  'photos': []
};
var location = {
  'x': getRandomArbitary(300, 900),
  'y': getRandomArbitary(100, 500)
};
