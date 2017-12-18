'use strict';

(function () {

  var dropZone = document.querySelectorAll('.drop-zone');

  var avatarInput = document.querySelector('#avatar');
  var photosInput = document.querySelector('#images');

  var dropImage = document.querySelector('.notice__preview').children[0];

  var photoContainer = document.querySelector('.form__photo-container');

  // Обработчики перетаскивания
  dropZone[0].addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  dropZone[1].addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  // Событие конца перетаскивания
  dropZone[0].addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = 'white';
    event.preventDefault();
  });

  dropZone[1].addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = 'white';
    event.preventDefault();
  });

  // Событие начала перетаскивания
  dropZone[0].addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });

  dropZone[1].addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });

  // Событие дроп на указанной зоне
  dropZone[0].addEventListener('drop', function () {
    renderDropAvatar();
  });

  dropZone[1].addEventListener('drop', function () {
    renderDropPhotos();
  });

  // Событие загрузки через инпут
  avatarInput.addEventListener('change', function () {
    uploadAvatar();
  });

  photosInput.addEventListener('change', function () {
    uploadPhotos();
  });

  // Функция загрузки через input
  function uploadAvatar() {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', dropAvatarCallback);
    reader.readAsDataURL(event.target.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'avatar': event.target.files[0]
    };
  }

  function uploadPhotos() {
    event.preventDefault();
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', dropPhotosCallback);
    reader.readAsDataURL(event.target.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'photos': event.target.files
    };
  }

  // Обработчик перетаскивания
  function renderDropAvatar() {
    event.preventDefault();
    event.target.style.backgroundColor = '';
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', dropAvatarCallback);
    reader.readAsDataURL(event.dataTransfer.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'avatar': event.dataTransfer.files[0]
    };
  }

  function renderDropPhotos() {
    event.preventDefault();
    event.target.style.backgroundColor = '';
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      var reader = new FileReader();
    }
    reader.addEventListener('load', dropPhotosCallback);
    reader.readAsDataURL(event.dataTransfer.files[0]);

    // Передаем файл для вставки в форму
    window.formFragnDrop = {
      'photos': event.dataTransfer.files
    };
  }

  // Коллбэки для обработчиков аватара
  function dropAvatarCallback(evt) {
    dropImage.setAttribute('src', evt.target.result);
  }

  function dropPhotosCallback(evt) {
    var imgNode = document.createElement('img');
    imgNode.setAttribute('src', evt.target.result);
    imgNode.style = 'width: 70px; height: 70px';
    photoContainer.appendChild(imgNode);
  }

})();
