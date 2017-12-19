'use strict';

(function () {

  // Переменные под загрузку файлов
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
    renderDropAvatar();
  });

  dropZone[1].addEventListener('drop', function () {
    renderDropPhotos();
  });

  // Обработчики перетаскивания фотографий объекта
  photoContainer.addEventListener('dragover', function (event) {
    event.preventDefault();
    return false;
  });

  photoContainer.addEventListener('dragenter', function (event) {
    event.target.style.backgroundColor = 'white';
    event.preventDefault();
  });

  photoContainer.addEventListener('dragleave', function (event) {
    event.target.style.backgroundColor = '';
    event.preventDefault();
  });

  // Событие загрузки через инпут
  avatarInput.addEventListener('change', function () {
    uploadAvatar();
  });

  photosInput.addEventListener('change', function () {
    uploadPhotos();
  });


  // Функция загрузки через input для аватара
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

  // Функция загрузки через input для фото
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


  // Функция рендера аватарки после перетаскивания
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

  // Функция рендера фото после перетаскивания
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
    var imgCreated = photoContainer.querySelector('img');

    // Событие начала перетаскивания картинки в рамках контейнера с фотками
    imgNode.addEventListener('dragstart', function () {
      if (event.target.tagName.toLowerCase() === 'img') {
        event.dataTransfer.effectAllowed = 'move';
        event.dataTransfer.setData('text/plain', imgCreated.innerHTML);
      }
    });

    // Событие дропа картинки в рамках контейнера с фотками
    photoContainer.addEventListener('drop', function () {
      event.preventDefault();
      event.target.style.backgroundColor = '';
      event.dataTransfer.dropEffect = 'move';
      event.target.innerHTML = event.dataTransfer.getData('text/plain');
      photoContainer.appendChild(imgNode);
    });
  }
})();
