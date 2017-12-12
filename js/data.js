'use strict';

(function () {

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

  window.data = {

    // Функция генерации объявления
    renderNotice: function (list) {
      var noticeTemplate = document.querySelector('template').content.querySelector('.map__card');
      var featuresArray = [];
      var imagesArray = [];
      var noticeElement = noticeTemplate.cloneNode(true);

      noticeElement.children[2].textContent = list.offer.title;
      noticeElement.children[3].children[0].textContent = list.location.x + ', ' + list.location.y;
      noticeElement.children[4].innerHTML = list.offer.price + '&#x20bd;/ночь';
      noticeElement.children[5].textContent = defineFlatType(list);
      noticeElement.children[6].textContent = list.offer.rooms + ' для ' + list.offer.guests + ' гостей';
      noticeElement.children[7].textContent = 'Зазед после ' + list.offer.checkin + ', выезд до ' + list.offer.checkout;
      noticeElement.children[9].textContent = list.offer.description;
      noticeElement.children[0].setAttribute('src', list.author.avatar);

      // Заполняем разметку удобствами
      var featuresNotice = noticeElement.querySelector('.popup__features');
      for (var j = 0; j < list.offer.features.length; j++) {
        featuresArray.push(createFeatures(j, list));
      }
      featuresNotice.innerHTML = featuresArray.join(' ');

      // Заполняем разметку фотографиями
      var imagesNotice = noticeElement.querySelector('.popup__pictures');
      for (j = 0; j < list.offer.photos.length; j++) {
        imagesArray.push(createPhotos(j, list));
      }
      imagesNotice.innerHTML = imagesArray.join(' ');

      return noticeElement;
    }
  };

  // Функция для создания списка удобств в рамках тега li
  function createFeatures(id, list) {
    return '<li class="feature feature--' + list.offer.features[id] + '"></li>';
  }

  // Функция для создания списка фотографий в рамках тега li
  function createPhotos(id, list) {
    return '<li><img src=' + list.offer.photos[id] + '></li>';
  }

})();
