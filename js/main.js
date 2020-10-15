'use strict';

// Константы-------------------------------------------------------------------------

const SUITE_QUANTITY = 8;

const TYPES = [`palace`, `flat`, `house`, `bungalow`];
const TYPES_RUS = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  house: `Дом`,
  palace: `Дворец`
};
const ROOMS_QUANTITY = [1, 2, 3, 100];
const GUESTS_QUANTITY = [3, 2, 1, 0];
const CHECKIN = [`12:00`, `13:00`, `14:00`];
const CHECKOUT = [`12:00`, `13:00`, `14:00`];
const FEATURES = [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`];
const SUITE_PHOTOS = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
];

const MIN_Y = 130;
const MAX_Y = 630;

const MAP_PIN_WIDTH = 65;
const MAP_PIN_HEIGHT = 84;

const MIN_PRICE = 500;
const MAX_PRICE = 10000;

// ----------------------------------------------------------------------------------

const map = document.querySelector(`.map`);
const mapWidth = map.clientWidth;

const mapFilterContainer = map.querySelector(`.map__filters-container`);

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
    const locationY = getRandomNumber(MIN_Y, MAX_Y);

    arraySuiteData[i] = {
      author: {
        avatar: `img/avatars/user0${i + 1}.png`,
      },
      offer: {
        title: `Заголовок обьявления`,
        adress: `${locationX}, ${locationY}`,
        price: getRandomNumber(MIN_PRICE, MAX_PRICE),
        type: getRandomArrayElement(TYPES),
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
    };
  }
  return arraySuiteData;
};

const mockArrSuite = getArrSuite(SUITE_QUANTITY);

// Генерируются метки, заполненные данными из переданного масива------------------------

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const renderPins = (pins) => {
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

const getMockPins = renderPins(mockArrSuite);
const mapSection = document.querySelector(`.map__pins`);

// mapSection.appendChild(getMockPins);

// Генерируется карточка с информацией об объявлении----------------------------------

const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);

const renderCard = (cardData) => {
  const cardFragment = document.createDocumentFragment();

  const newCard = cardPopupTemplate.cloneNode(true);

  const popupFeatures = newCard.querySelector(`.popup__features`);// DOM-элемент с "фичами" обьявления
  const popupPhotos = newCard.querySelector(`.popup__photos`);// DOM-элемент с фото обьявления

  newCard.querySelector(`.popup__title`).textContent = cardData.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = TYPES_RUS[cardData.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;

  popupFeatures.innerHTML = ``;
  for (let i = 0; i < cardData.offer.features.length; i++) {
    const feature = cardData.offer.features[i];
    const newLi = document.createElement(`li`);
    newLi.classList.add(`popup__feature`, `popup__feature--${feature}`);
    popupFeatures.appendChild(newLi);
  }

  popupPhotos.innerHTML = ``;
  for (let i = 0; i < cardData.offer.photos.length; i++) {
    const photoFromArr = cardData.offer.photos[i];
    const newImg = document.createElement(`img`);
    newImg.classList.add(`popup__photo`);
    newImg.src = photoFromArr;
    newImg.setAttribute(`width`, 45);
    newImg.setAttribute(`height`, 40);
    newImg.setAttribute(`alt`, `Фотография жилья`);
    popupPhotos.appendChild(newImg);
  }

  newCard.querySelector(`.popup__avatar`).src = cardData.author.avatar;

  cardFragment.appendChild(newCard);

  return cardFragment;
};

// const getMockCard = renderCard(mockArrSuite[getRandomNumber(0, SUITE_QUANTITY)]);

// map.insertBefore(getMockCard, mapFilterContainer);

// Активация карты. Валидация формы------------------------------------------------------------------------------------------

const mapPin = document.querySelector(`.map__pin--main`); // Метка на карте

const mapFilter = document.querySelector(`.map__filters-container`); // Фильтр обьявлений на карте
const adForm = document.querySelector(`.ad-form`); // Форма. ГЛАВНАЯ
const inputAdress = adForm.querySelector(`#address`); // Форма. Адресс

// БЛОКИРОВКА формы

const blockForm = (form) => {
  const arrFormElements = Array.from(form.children); // создание массива из элементов формы
  arrFormElements.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

// РАЗБЛОКИРОВКА формы

const unblockForm = (form) => {
  const arrFormElements = Array.from(form.children); // создание массива из элементов формы
  arrFormElements.forEach((element) => {
    element.removeAttribute(`disabled`, `disabled`);
  });
};

// Получение значений координат адреса (АКТИВНАЯ карта)

const getActiveMapAdress = () => {
  const mapPinX = parseInt(mapPin.style.left, 10); // Нач. коорд. X
  const mapPinY = parseInt(mapPin.style.top, 10); // Нач. коорд. Y
  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + MAP_PIN_HEIGHT}`;
};

// Получение значений координат адреса (НЕАКТИВНАЯ карта)

const getDeactiveMapAdressValue = function () {
  const mapPinX = parseInt(mapPin.style.left, 10); // Нач. коорд. X
  const mapPinY = parseInt(mapPin.style.top, 10); // Нач. коорд. Y
  inputAdress.value = `${mapPinX + Math.round(MAP_PIN_WIDTH / 2)}, ${mapPinY + Math.round(MAP_PIN_WIDTH / 2)}`;
};

// АКТИВАЦИЯ карты и меток похожих обьявлений

const activeMap = () => {
  map.classList.remove(`map--faded`);
  document.querySelector(`.ad-form`).classList.remove(`ad-form--disabled`);

  mapSection.appendChild(getMockPins);

  unblockForm(adForm);
  unblockForm(mapFilter);
  getActiveMapAdress();

  mapPin.removeEventListener(`mousedown`, onPinMousedown);
  mapPin.removeEventListener(`keydown`, onPinEnter);
};

// ДЕАКТИВАЦИЯ карты и меток похожих обьявлений (ПО УМОЛЧАНИЮ)

const deActiveMap = () => {
  blockForm(adForm);
  blockForm(mapFilter);
  getDeactiveMapAdressValue();
};
deActiveMap();

// АКТИВАЦИЯ карты по клику мыши/ нажатию на Enter

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

// Обработчики событий [Клик мыши, Нажатие Enter]

mapPin.addEventListener(`mousedown`, onPinMousedown);
mapPin.addEventListener(`keydown`, onPinEnter);

// ВАЛИДАЦИЯ формы-------------------------------------------------------------------------------------------------------------------

const inputRoomNumber = adForm.querySelector(`#room_number`); // Выбор колличества комнат
const inputGuestsCapacity = adForm.querySelector(`#capacity`); // Выбор колличества гостей

const onFormChange = () => {
  if ((inputRoomNumber.value === `1`) && (inputGuestsCapacity.value !== `1`)) {
    inputRoomNumber.setCustomValidity(`1 комната рассчитана для 1 гостя`);
  } else if ((inputRoomNumber.value === `2`) && (inputGuestsCapacity.value === `3`) || (inputGuestsCapacity.value === `0`)) {
    inputRoomNumber.setCustomValidity(`данная комната рассчитана для 2 и менее гостей`);
  } else if ((inputRoomNumber.value === `3`) && (inputGuestsCapacity.value === `0`)) {
    inputRoomNumber.setCustomValidity(`данная комната рассчитана для 3 и менее гостей`);
  } else if ((inputRoomNumber.value === `100`) && (inputGuestsCapacity.value !== `0`)) {
    inputRoomNumber.setCustomValidity(`данная комната не рассчитана для гостей`);
  }
};

inputRoomNumber.addEventListener(`change`, onFormChange);
inputGuestsCapacity.addEventListener(`change`, onFormChange);
// -----------------------------------------------------------------------------------------------------------------------------------

