'use strict';

(function () {

  var noticeContainer = document.querySelector('.map');
  var pinContainer = document.querySelector('.map__pins');
  var ESC_KEYCODE = 27;
  var ENTER_KEYCODE = 13;

  // Функция удаления попапа
  function removePopup(popup) {
    if (popup) {
      popup.remove();
    }
  }

  // Функция удаления попапа при нажатии на крестик
  function onPopEscPress(event) {
    var popup = noticeContainer.querySelector('.popup');
    if (popup && event.keyCode === ESC_KEYCODE) {
      removePopup(popup);
      window.pin.diactivatePin();
      document.removeEventListener('keydown', onPopEscPress);
    } else {
      return;
    }
  }

  // Обработчики события для попапа

  // Открытие попапа при клике
  pinContainer.addEventListener('click', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    var target = event.target.parentNode;
    if (target.tagName !== 'BUTTON' || target.classList.contains('map__pin--main')) {
      return;
    }
    window.pin.changeSelectPinActive(target);
    removePopup(popup);
    window.show.createPopup(event.target.parentNode.datashare);

    document.addEventListener('keydown', onPopEscPress);
  });

  // Открытие попапа при нажатии на ENTER
  pinContainer.addEventListener('keydown', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName !== 'BUTTON' || event.target.classList.contains('map__pin--main') || event.keyCode !== ENTER_KEYCODE) {
      return;
    }

    window.pin.changeSelectPinActive(event.target);
    removePopup(popup);
    window.show.createPopup(event.target.datashare);

    document.addEventListener('keydown', onPopEscPress);
  });

  // Закрытие попапа при клике на крестик
  noticeContainer.addEventListener('click', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close')) {
      removePopup(popup);
      window.pin.diactivatePin();
    }
  });

  // Закрытие попапа при нажатии на ENTER
  noticeContainer.addEventListener('keydown', function (event) {
    var popup = noticeContainer.querySelector('.popup');
    if (event.target.tagName === 'BUTTON' && event.target.classList.contains('popup__close') && event.keyCode === ENTER_KEYCODE) {
      removePopup(popup);
      window.pin.diactivatePin();
    }
  });
})();
