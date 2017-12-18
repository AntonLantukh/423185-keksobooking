'use strict';

(function () {

  window.pin = {
    // Функция создания пина
    render: function (list) {
      var pinTemplate = document.querySelector('template').content.querySelector('.map__pin');
      var pinElement = pinTemplate.cloneNode(true);
      pinElement.setAttribute('style', 'left: ' + list.location.x + 'px' + '; top: ' + list.location.y + 'px');
      pinElement.children[0].setAttribute('src', list.author.avatar);

      return pinElement;
    },

    // Функция смены класса активного пина
    changeSelectActive: function (targetNode) {
      var activePinNode = document.querySelector('.map__pin--active');
      if (activePinNode) {
        activePinNode.classList.toggle('map__pin--active');
      }
      targetNode.classList.add('map__pin--active');
    },

    // Функция снятия класса с неактивного пина
    diactivate: function () {
      var activePinNode = document.querySelector('.map__pin--active');
      if (activePinNode) {
        activePinNode.classList.remove('map__pin--active');
      }
    }
  };
})();
