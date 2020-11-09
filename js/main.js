'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const getArrSuite = window.data.getArrSuite;
  const activeMap = window.map.active;
  const deActiveMap = window.map.deActive;
  const mapPin = window.map.pin;

  // Список констант и переменных----------------------------------------------------

  // Генерация массива из обьектов с данными обьявлений

  window.data.mockArrSuite = getArrSuite(SUITE_QUANTITY);

  // ДЕАКТИВАЦИЯ    карты по умочанию

  deActiveMap();

  // АКТИВАЦИЯ карты по клику мыши / нажатию на Enter

  const onPinMousedown = (evt) => {
    if (evt.button === 0) {
      activeMap();
    }
  };

  const onPinEnter = (evt) => {
    if (evt.key === `Enter`) {
      activeMap();
    }
  };

  mapPin.addEventListener(`mousedown`, onPinMousedown);
  mapPin.addEventListener(`keydown`, onPinEnter);

})();

