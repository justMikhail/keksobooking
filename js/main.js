'use strict';

// Константы===========================================================================
const SUITE_QUANTITY = 8;

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const SUITE_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const map = document.querySelector(`.map`);
const mapWidth = map.clientWidth;

map.classList.remove(`map--faded`);

// ===================================================================================
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomArray = (array) => {
  const end = getRandomNumber(0, array.length);
  return array.slice(0, end);
};
// ===================================================================================

// Функция, создает массив из сгенерированных обьектов================================
const getArrSuite = (count) => {
  const arraySuiteData = [];

  for (let i = 0; i < count; i++) {
    const locationX = getRandomNumber(1, mapWidth);
    const locationY = getRandomNumber(130, 630);

    arraySuiteData[i] = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: `Заголовок обьявления`,
        adress: `${locationX}, ${locationY}`,
        price: getRandomNumber(500, 10000),
        type: getRandomArrayElement(TYPES),
        rooms: getRandomNumber(1, 4),
        guests: getRandomNumber(1, 10),
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
    };
  }
  return arraySuiteData;
};

const mockArrSuite = getArrSuite(SUITE_QUANTITY);

// Функия, генерирует метки, заполненные данными из масива mockArraySuite=================
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPinTemplate = (pins) => {
  const pinFragment = document.createDocumentFragment();

  for (let i = 0; i < pins.length; i++) {
    const newPin = pinTemplate.cloneNode(true);
    const pinImg = newPin.querySelector(`img`);
    newPin.style = `left: ${pins[i].location.x - pinImg.width / 2}px; top: ${pins[i].location.y - pinImg.height}px;`;
    pinImg.src = pins[i].author.avatar;
    pinImg.alt = pins[i].offer.title;

    pinFragment.appendChild(newPin);
  }
  return pinFragment;
};

const getMockPins = renderPinTemplate(mockArrSuite);
const mapSection = document.querySelector(`.map__pins`);

mapSection.appendChild(getMockPins);

// ========================================================================================
