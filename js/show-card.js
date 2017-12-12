'use strict';

(function () {

  window.show = {
    // Функция создания пина
    createPopup: function (data) {
      var noticeContainer = document.querySelector('.map');
      var noticeNode = window.data.renderNotice(data);
      noticeContainer.appendChild(noticeNode);
    }
  };
  console.log(window.noticeArray);
})();
