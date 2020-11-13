'use strict';
(function () {

  // Функции. Рандомайзеры ----------------------------------------------------------------

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length)];

  const getRandomArray = (array) => {
    const end = getRandomNumber(0, array.length);
    return array.slice(0, end);
  };

  let ENTER_KEYCODE = 13;
  let ESC_KEYCODE = 27;

  const isKeyBoardEvent = (evt) => {
    return evt instanceof KeyboardEvent;
  };

  const isEnterPressed = (evt) => {
    return evt.keyCode === ENTER_KEYCODE;
  };

  const isEscPressed = (evt) => {
    return evt.keyCode === ESC_KEYCODE;
  };


  // ---------------------------------------------------------------------------------------

  window.util = {
    getRandomNumber,
    getRandomArrayElement,
    getRandomArray,
    isKeyBoardEvent,
    isEnterPressed,
    isEscPressed,
  };
})();
