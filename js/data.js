'use strict';

(function () {
  // Импорт---------------------------------------------------------------------------------

  const getRandomNumber = window.util.getRandomNumber;
  const getRandomArrayElement = window.util.getRandomArrayElement;
  const getRandomArray = window.util.getRandomArray;

  // Константы-------------------------------------------------------------------------

  const SUITE_QUANTITY = 8;

  const TYPES = { // ? используем Object.keys() и Object.values() для создания масива из ключей или значений
    palace: `Дворец`,
    flat: `Квартира`,
    house: `Дом`,
    bungalow: `Бунгало`,
  };

  const ROOMS_QUANTITY = [1, 2, 3, 100];
  const GUESTS_QUANTITY = [3, 2, 1, 0];
  const CHECKIN = [`12:00`, `13:00`, `14:00`];
  const CHECKOUT = [`12:00`, `13:00`, `14:00`];
  const FEATURES = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];
  const SUITE_PHOTOS = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ];

  const MIN_X = 0;
  const MAX_X = 1200;
  const MIN_Y = 130;
  const MAX_Y = 630;

  const MAP_PIN_WIDTH = 65;
  const MAP_PIN_HEIGHT = 84;

  const MIN_PRICE = 500;
  const MAX_PRICE = 10000;

  // Создание массива с данными, сгенерированными рандомно----------------------------------

  const getArrSuite = (count) => {
    const arraySuiteData = [];

    for (let i = 0; i < count; i++) {
      const locationX = getRandomNumber(MIN_X, MAX_X);
      const locationY = getRandomNumber(MIN_Y, MAX_Y);

      arraySuiteData[i] = {
        author: {
          avatar: `img/avatars/user0${i + 1}.png`,
        },
        offer: {
          title: `Заголовок обьявления`,
          adress: `${locationX}, ${locationY}`,
          price: getRandomNumber(MIN_PRICE, MAX_PRICE),
          type: getRandomArrayElement(Object.keys(TYPES)),
          rooms: getRandomArrayElement(ROOMS_QUANTITY),
          guests: getRandomArrayElement(GUESTS_QUANTITY),
          checkin: getRandomArrayElement(CHECKIN),
          checkout: getRandomArrayElement(CHECKOUT),
          features: getRandomArray(FEATURES),
          description: `Описание предложения`,
          photos: getRandomArray(SUITE_PHOTOS),
        },
        location: {
          x: locationX,
          y: locationY
        },
        id: `${i + 1}`,
      };
    }
    return arraySuiteData;
  };


  window.data = {
    TYPES,
    SUITE_QUANTITY,
    MAP_PIN_WIDTH,
    MAP_PIN_HEIGHT,
    getArrSuite,
  };

})();
