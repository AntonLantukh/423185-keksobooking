'use strict';

(function () {

  var pinFilter = document.querySelector('.map__filters');
  var pinContainer = document.querySelector('.map__pins');
  var pinSelectors = Array.from(pinFilter.querySelectorAll('select'));
  var pinInputs = Array.from(pinFilter.querySelectorAll('input'));
  var filterObject = {};
  var features = [];

  // Событие клика на фильтр, создание динамиского объекта с фильтрами
  pinFilter.addEventListener('change', function () {
    pinSelectors.forEach(function (array) {
      filterObject[array.name.substr(8)] = array.value;
    });
    pinInputs.forEach(function (array) {
      if (array.checked) {
        features.push(array.value);
      }
    });
    filterObject.features = features;
    filterPins();
  });

  // Функця фильтрации пинов
  function filterPins() {
    var pinNodes = Array.from(pinContainer.children).slice(2);
    debugger;
    pinNodes.filter(function (pinNode) {
      var isPassed = true;
      var offer = pinNode.datashare.offer;
      for (var key in offer) {
        console.log(offer);
        var isPassedKey;
        console.log(key);
        var value = offer[key];
        if (filterObject[key] === 'any') {
          continue;
        } else if (key === 'type') {
          isPassedKey = typeFilter(value);
        } else if (key === 'rooms') {
          isPassedKey = roomsFilter(value);
        } else if (key === 'price') {
          isPassedKey = priceFilter(value);
        } else if (key === 'guests') {
          isPassedKey = guestsFilter(value);
        } else if (key === 'features') {
          isPassedKey = featuresFilter(offer);
        }
        if (isPassedKey === false) {
          isPassed = false;
          break;
        }
      }
      if (isPassed === false) {
        pinNode.classList.add('hidden');
      } else if (isPassed === true && pinNode.hidden === true) {
        pinNode.classList.remove('hidden');
      }
    });
  }

  // Проверка совпадения типа жилья
  function typeFilter(value) {
    if (filterObject.type === value) {

      return true;
    }
    return false;
  }

  // Проверка совпадения кол-ва комнат
  function roomsFilter(value) {
    if (filterObject.rooms === value) {

      return true;
    }
    return false;
  }
  // Проверка совпадения кол-ва гостией
  function guestsFilter(value) {
    if (filterObject.guests === value) {

      return true;
    }
    return false;
  }

  // Проервка совпадения цены
  function priceFilter(value) {
    if (filterObject.price === 'middle') {
      return value <= 10000 && value <= 50000;
    } else if (filterObject.price === 'low') {
      return value <= 10000;
    } else if (filterObject.price === 'high') {
      return value <= 50000;
    }
    return false;
  }

  // Проверка совпадния удобств
  function featuresFilter(offer) {
    filterObject[features].filter(function (filterFeature) {
      if (filterFeature.includes(offer)) {
        return true;
      }
    });
    return false;
  }

  // Отображение пинов
  //  pinNodes.forEach(function (pinNode) {
  //    pinNode.hidden = filterPins.includes(pinNode);
  //  });
})();
