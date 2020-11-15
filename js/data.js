'use strict';

(function () {

  // ------------------------------------------------------------------------------------------------------------------------

  const SUITE_QUANTITY = 8;

  const TYPES = { // ? используем Object.keys() и Object.values() для создания масива из ключей или значений
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const MIN_X = 0;
  const MAX_X = 1200;
  const MIN_Y = 130;
  const MAX_Y = 630;

  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.data = {
    TYPES,
    SUITE_QUANTITY,
    MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT,
    MIN_X,
    MAX_X,
    MIN_Y,
    MAX_Y,
  };

})();
