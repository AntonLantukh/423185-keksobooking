'use strict';

(function () {

  // Синхронизируем поля
  window.synchronizeFields = function (firstElement, secondElement, firstArray, secondArray, syncValueCallback) {
    var indexSelected = firstArray.indexOf(firstElement.value);
    var valueToTransfer = secondArray[indexSelected];
    syncValueCallback(secondElement, valueToTransfer);
  };
})();
