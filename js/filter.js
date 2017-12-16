'use strict';

(function () {

  var pinFilter = document.querySelector('.map__filters');
  var pinContainer = document.querySelector('.map__pins');
  var pinSelectors = Array.from(pinFilter.querySelectorAll('select'));
  var pinInputs = Array.from(pinFilter.querySelectorAll('input'));
  var filterNodes = pinSelectors.concat(pinInputs);
  var filterObject = {};
  var features = [];

  // Событие клика на фильтр
  pinFilter.addEventListener('change', function () {
    debugger;
    pinSelectors.forEach(function (array) {
      filterObject[array.name.substr(8)] = array.value;
    })
    pinInputs.forEach(function (array) {
      if (array.checked) {
        features.push(array.value);
      }
    })
    filterObject.features = features;
    console.log(filterObject);
  });
    // pinNodes.push.event.target;

  let filterPins = pinNodes.filter(function (pinNode) {
      let isPassed = true
      for (const key in filter) {
          let isPassedKey
          const pinOffer = pinNode.datashared.offer
          const value = filter[key]
          if (key === 'any' || (key === 'features' && filter[key].length === 0)) {
              continue
          }
          if (key === 'price') {
              isPassedKey = priceFilter(filter[key], pinOffer[key])
          } else if (key === 'features') {
              isPassedKey = featuresFilter(filter[key], pinOffer[key])
          } else {
              isPassedKey = pinNode.datashared.offer[key] === value
          }
          if (isPassedKey === false) {
              isPassed = false
              break
          }
      }
      return isPassed
  })


  pinNodes.forEach(function (pinNode) {
      pinNode.hidden = filterPins.includes(pinNode)
  })

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
      const resultFeatures = filterFeatures.filter(function (filterFeature) {
          return offerFeatures.includes(filterFeature)
      })
      return resultFeatures.length === filterFeatures.length
  }
})();
