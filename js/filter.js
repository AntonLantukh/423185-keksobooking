'use strict';

(function () {

  var pinFilter = document.querySelector('.map__filters');
  var pinContainer = document.querySelector('.map__pins');
  var pinSelectors = Array.from(pinFilter.querySelectorAll('select'));
  var pinInputs = Array.from(pinFilter.querySelectorAll('input'));
  var filterNodes = pinSelectors.concat(pinInputs);
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
    debugger;
    filter();
  });

  // Функця фильтрации пинов
  function filter() {
    var pinNodes = Array.from(pinContainer.children).slice(2);
    var filterPins = pinNodes.filter(function (pinNode) {
      var isPassed = true;
      for (var key in pinNode.datashare.offer) {
        var isPassedKey;
        console.log(key);
        var value = pinNode[key];
        if (value === 'any' || (key === 'features' && filterObject[key].length === 0)) {
          continue;
        }
        if (key === 'price') {
          isPassedKey = priceFilter(filter[key], pinOffer[key])
        } else if (key === 'features') {
          isPassedKey = featuresFilter(filter[key], pinOffer[key])
        } else {
          isPassedKey = pinNode.datashared.offer[key] === value;
        }
        if (isPassedKey === false) {
          isPassed = false;
          break;
        }
      }
      return isPassed;
    });
  }


  pinNodes.forEach(function (pinNode) {
    pinNode.hidden = filterPins.includes(pinNode);
  });

  function priceFilter (typePrice, offerPrice) {
    if (typePrice === 'middle') {
      return 10000 >= offerPrice && offerPrice <= 50000
    } else if (typePrice === 'low') {
      return offerPrice <= 10000
    } else if (typePrice === 'high') {
      return 50000 >= offerPrice
    }
    return true
  }

  function featuresFilter (filterFeatures, offerFeatures) {
    var resultFeatures = filterFeatures.filter(function (filterFeature) {
      return offerFeatures.includes(filterFeature)
    })
    return resultFeatures.length === filterFeatures.length
  }
})();
