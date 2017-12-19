'use strict';

(function () {

  // Тип жилья
  var flatType = {
    'flat': 'Квартира',
    'bungalo': 'Бунгало',
    'house': 'Дом'
  };

  window.data = {
    // Функция генерации объявления
    renderNotice: function (list) {
      var noticeTemplate = document.querySelector('template').content.querySelector('.map__card');
      var noticeElement = noticeTemplate.cloneNode(true);
      var featuresNotice = noticeElement.querySelector('.popup__features');
      var imagesNotice = noticeElement.querySelector('.popup__pictures');
      var featuresArray = [];
      var imagesArray = [];

      noticeElement.children[2].textContent = list.offer.title;
      noticeElement.children[3].children[0].textContent = list.location.x + ', ' + list.location.y;
      noticeElement.children[4].innerHTML = list.offer.price + '&#x20bd;/ночь';
      noticeElement.children[5].textContent = flatType[list.offer.type];
      noticeElement.children[6].textContent = list.offer.rooms + ' для ' + list.offer.guests + ' гостей';
      noticeElement.children[7].textContent = 'Зазед после ' + list.offer.checkin + ', выезд до ' + list.offer.checkout;
      noticeElement.children[9].textContent = list.offer.description;
      noticeElement.children[0].setAttribute('src', list.author.avatar);

      // Заполняем разметку удобствами
      list.offer.features.forEach(function (feature) {
        featuresArray.push('<li class="feature feature--' + feature + '"></li>');
        featuresNotice.innerHTML = featuresArray.join(' ');
      });

      // Заполняем разметку фотографиями
      list.offer.photos.forEach(function (image) {
        imagesArray.push('<li><img src=' + image + ' width = "45" height="45"></li>');
        imagesNotice.innerHTML = imagesArray.join(' ');
      });

      return noticeElement;
    }
  };
})();
