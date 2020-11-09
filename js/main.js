'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const activeMap = window.map.active;
  const deActiveMap = window.map.deActive;
  const mapPin = window.map.pin;

  // Список констант и переменных----------------------------------------------------

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

