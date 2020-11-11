'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const getOffers = window.data.getOffers;
  const activeMap = window.map.active;
  const deActiveMap = window.map.deActive;
  const mainPin = window.map.mainPin;
  const onActiveMainPinMouseDown = window.move.onActiveMainPinMouseDown;


  // Список констант и переменных----------------------------------------------------

  // Генерация массива из обьектов с данными обьявлений

  window.data.mockOffers = getOffers(SUITE_QUANTITY);

  // ДЕАКТИВАЦИЯ    карты по умочанию

  deActiveMap();

  // АКТИВАЦИЯ карты по клику мыши / нажатию на Enter

  const onMainPinMousedown = (evt) => {
    if (evt.button === 0) {
      activeMap();
    }
  };

  const onMainPinEnter = (evt) => {
    if (evt.key === `Enter`) {
      activeMap();
    }
  };

  mainPin.addEventListener(`mousedown`, onMainPinMousedown);
  mainPin.addEventListener(`keydown`, onMainPinEnter);
  mainPin.addEventListener(`mousedown`, onActiveMainPinMouseDown);

})();


