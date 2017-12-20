'use strict';

(function () {

  // Переменные под загрузку файлов
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var dropZone = document.querySelectorAll('.drop-zone');

  var avatarInput = document.querySelector('#avatar');
  var photosInput = document.querySelector('#images');

  var dropImage = document.querySelector('.notice__preview').children[0];

  var photoContainer = document.querySelector('.form__photo-container');

  // Обработчики перетаскивания аватарки
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
    event.preventDefault();
    event.target.style.backgroundColor = '';
    uploadFile(event.dataTransfer.files[0], dropAvatarCallback);
  });

  dropZone[1].addEventListener('drop', function () {
    event.preventDefault();
    event.target.style.backgroundColor = '';
    uploadFile(event.dataTransfer.files[0], dropPhotosCallback);
  });

  // Событие загрузки через инпут
  avatarInput.addEventListener('change', function () {
    uploadFile(avatarInput.files[0], dropAvatarCallback);
  });

  photosInput.addEventListener('change', function () {
    uploadFile(photosInput.files[0], dropPhotosCallback);
  });


  // Функция загрузки через input для аватара и фото
  function uploadFile(fileChosen, callback) {
    var file = fileChosen;
    var fileName = file.name.toLowerCase();
    if (FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    })) {
      var reader = new FileReader();
      reader.addEventListener('load', callback);
      reader.readAsDataURL(fileChosen);
    }
  }

  // Коллбэк для обработчиков аватара
  function dropAvatarCallback(event) {
    dropImage.setAttribute('src', event.target.result);
  }

  // Коллбэк для обработчиков фото
  function dropPhotosCallback() {
    var imgNode = document.createElement('img');
    imgNode.setAttribute('src', event.target.result);
    imgNode.style = 'width: 70px; height: 70px';
    imgNode.setAttribute('draggable', true);
    photoContainer.appendChild(imgNode);
  }
})();
