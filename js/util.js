'use strict';
(() => {

  // ------------------------------------------------------------------------------------------------------------------------

  let ENTER_KEYCODE = 13;
  let ESC_KEYCODE = 27;

  // ------------------------------------------------------------------------------------------------------------------------

  const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

  const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length)];

  const getRandomArray = (array) => {
    const end = getRandomNumber(0, array.length);
    return array.slice(0, end);
  };


  const isEnterPressed = (evt) => {
    return evt.keyCode === ENTER_KEYCODE;
  };

  const isEscPressed = (evt) => {
    return evt.keyCode === ESC_KEYCODE;
  };

  const contains = (where, what) => {
    for (let i = 0; i < what.length; i++) {
      if (where.indexOf(what[i]) === -1) {
        return false;
      }
    }
    return true;
  };

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.util = {
    getRandomNumber,
    getRandomArrayElement,
    getRandomArray,
    isEnterPressed,
    isEscPressed,
    contains,
  };
})();
