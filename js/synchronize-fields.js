'use strict';

(function () {

  window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, syncValue) {
    var indexSelected = firstArray.indexOf(firstElement.value);
    var valueToTransfer = secondArray[indexSelected];
    syncValue(secondElement, valueToTransfer);
  };
})();
