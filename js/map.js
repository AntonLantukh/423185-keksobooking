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

// Убираем класс .map--faded
mapDisplay.classList.remove('hidden');

// Задаем цикл для функции генерации элемента (метки)
for (var i = 0; i < 8; i++) {
  var pinObject = pinCreate(i, fakeOfferData);
  var pinNode = renderPin(pinObject);

  fragment.appendChild(pinNode);

  // Блок с данными о метке рендерим только для первого оффера
  if (i === 0) {
    var noticeNode = renderNotice(pinObject);
    noticeContainer.appendChild(noticeNode);
  }
}

pinContainer.appendChild(fragment);

// Функция генерации элемента (метки)
function pinCreate(id, info) {
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
