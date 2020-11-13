'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const getOffers = window.data.getOffers;
  const activateMap = window.map.activate;
  const deActivateMap = window.map.deActivate;
  const mainPin = window.map.mainPin;
  const onActiveMainPinMouseDown = window.move.onActiveMainPinMouseDown;


  // Список констант и переменных----------------------------------------------------

  // Генерация массива из обьектов с данными обьявлений

  window.data.mockOffers = getOffers(SUITE_QUANTITY);

  // ДЕАКТИВАЦИЯ    карты по умочанию

  deActivateMap();

  // АКТИВАЦИЯ карты по клику мыши / нажатию на Enter

  const onMainPinClick = (evt) => {
    if (evt.button === 0) {
      activateMap();
      mainPin.removeEventListener(`click`, onMainPinClick);
    }
  };

  const onMainPinKeyDown = (evt) => {
    if (evt.key === `Enter`) {
      activateMap();
      mainPin.removeEventListener(`click`, onMainPinClick);
    }
  };

  mainPin.addEventListener(`click`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  mainPin.addEventListener(`mousedown`, onActiveMainPinMouseDown);

})();


