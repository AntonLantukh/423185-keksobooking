'use strict';

(function () {

  var noticeContainer = document.querySelector('.map');
  var pinContainer = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;


  // Обработчики события для попапа
  // Открытие попапа при клике
  pinContainer.addEventListener('click', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName === 'textPath' || event.target.parentElement.tagName === 'svg' || event.target.classList.contains('map__pin--main') || event.target.parentElement.classList.contains('map__pin--main') || event.target.parentElement.tagName === 'DIV') {
      return;
    }
    var dataForFunctions = event.target.tagName === 'IMG' ? event.target.parentElement : event.target;
    window.pin.changeSelectActive(dataForFunctions);
    window.card.remove(popup);
    window.show.createPopup(dataForFunctions.datashare);

    document.addEventListener('keydown', onPopEscPress);
  });

  // Открытие попапа при нажатии на ENTER
  pinContainer.addEventListener('keydown', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName !== 'BUTTON' || event.target.classList.contains('map__pin--main') || event.keyCode !== ENTER_KEYCODE) {
      return;
    }

    window.pin.changeSelectActive(event.target);
    window.card.remove(popup);
    window.show.createPopup(event.target.datashare);

    document.addEventListener('keydown', onPopEscPress);
  });

  // Закрытие попапа при клике на крестик
  noticeContainer.addEventListener('click', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close')) {
      window.card.remove(popup);
      window.pin.diactivate();
    }
  });

  // Закрытие попапа при нажатии на ENTER
  noticeContainer.addEventListener('keydown', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close') && event.keyCode === ENTER_KEYCODE) {
      window.card.remove(popup);
      window.pin.diactivate();
    }
  });

  window.card = {
    // Функция удаления попапа
    remove: function (popup) {
      if (popup) {
        popup.remove();
      }
    }
  };

  // Функция удаления попапа при нажатии на крестик
  function onPopEscPress(event) {
    var popup = noticeContainer.querySelector('.popup');
    if (popup && event.keyCode === ESC_KEYCODE) {
      window.card.remove(popup);
      window.pin.diactivate();
      document.removeEventListener('keydown', onPopEscPress);
    } else {
      return;
    }
  }
})();
