'use strict';

// Функции. Рандомайзеры ----------------------------------------------------------------

const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArrayElement = (array) => array[getRandomNumber(0, array.length)];

const getRandomArray = (array) => {
  const end = getRandomNumber(0, array.length);
  return array.slice(0, end);
};


// ---------------------------------------------------------------------------------------

window.util = {
  getRandomNumber,
  getRandomArrayElement,
  getRandomArray,
};
