'use strict';

// Константы-------------------------------------------------------------------------
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

// ----------------------------------------------------------------------------------
const map = document.querySelector(`.map`);
const mapWidth = map.clientWidth;

const mapFilterContainer = map.querySelector(`.map__filters-container`);

map.classList.remove(`map--faded`);

// -----------------------------------------------------------------------------------
const getRandomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

const getRandomArrayElement = (array) => array[Math.floor(Math.random() * array.length)];

const getRandomArray = (array) => {
  const end = getRandomNumber(0, array.length);
  return array.slice(0, end);
};
// -----------------------------------------------------------------------------------

// Функция, создает массив из сгенерированных обьектов--------------------------------
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

// Функия, генерирует метки, заполненные данными из масива mockArraySuite------------------
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

// Функция, генерирует карточу с информацией об объявлении----------------------------------

const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const renderCardTemplate = (cardData) => {
  const cardFragment = document.createDocumentFragment();

  const newCard = cardPopupTemplate.cloneNode(true);

  const popupFeatures = newCard.querySelector(`.popup__features`);// Массив с "фичами" обьявления
  const popupPhotos = newCard.querySelector(`.popup__photos`);// Массив с фото обьявления


  newCard.querySelector(`.popup__title`).textContent = cardData.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = cardData.offer.type;
  newCard.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;

  popupFeatures.innerHTML = ``;
  for (let i = 0; i < cardData.offer.features.length; i++) {
    const features = cardData.offer.features;
    const newLi = document.createElement(`li`);
    newLi.classList.add(`popup__feature`, `popup__feature--${features[i]}`);
    popupFeatures.appendChild(newLi);
  }

  popupPhotos.innerHTML = ``;
  for (let i = 0; i < cardData.offer.photos.length; i++) {
    const photosArr = cardData.offer.photos;
    const newImg = document.createElement(`img`);
    newImg.classList.add(`popup__photo`);
    newImg.src = photosArr[i];
    newImg.setAttribute(`width`, 45);
    newImg.setAttribute(`height`, 40);
    newImg.setAttribute(`alt`, `Фотография жилья`);
    popupPhotos.appendChild(newImg);
  }

  newCard.querySelector(`.popup__avatar`).src = cardData.author.avatar;

  cardFragment.appendChild(newCard);

  return cardFragment;
};

const getMockCard = renderCardTemplate(mockArrSuite[4]);
console.log(getMockCard);

map.insertBefore(getMockCard, mapFilterContainer);

