'use strict';

(function () {

  var dropAvatar = document.querySelector('.drop-zone');
  var avatarInput = document.querySelector('#avatar');
  var dropImage = document.querySelector('.notice__preview').children[0];

  // Обработчики перетаскивания
  dropAvatar.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  // Событие конца перетаскивания
  dropAvatar.addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = 'white';
    event.preventDefault();
  });

  // Событие начала перетаскивания
  dropAvatar.addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });

  // Событие дроп на указанной зоне
  dropAvatar.addEventListener('drop', function () {
    renderDrop();
  });

  // Событие загрузки через инпут
  avatarInput.addEventListener('change', function () {
    downloadAvatar();
  });

  // Функция загрузки через input
  function downloadAvatar() {
    event.preventDefault();
    console.log(event);
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', function (evt) {
      dropImage.setAttribute('src', evt.target.result);
    });
    reader.readAsDataURL(event.target.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'avatar': event.target.files[0]
    };
  }

  // Обработчик перетаскивания
  function renderDrop() {
    event.preventDefault();
    console.log(event);
    event.target.style.backgroundColor = '';
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', function (evt) {
      dropImage.setAttribute('src', evt.target.result);
    });
    reader.readAsDataURL(event.dataTransfer.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'avatar': event.dataTransfer.files[0]
    };
  }


})();
