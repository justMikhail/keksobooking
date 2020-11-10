'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const getOffers = window.data.getOffers;
  const activeMap = window.map.active;
  const deActiveMap = window.map.deActive;
  const mainPin = window.map.mainPin;

  // Список констант и переменных----------------------------------------------------

  // Генерация массива из обьектов с данными обьявлений

  window.data.mockOffers = getOffers(SUITE_QUANTITY); // !offers

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

  mainPin.addEventListener(`mousedown`, onPinMousedown);
  mainPin.addEventListener(`keydown`, onPinEnter);

})();

