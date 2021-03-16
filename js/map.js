'use strict';
// ------------------------------------------------------------------------------------------------------------------------
const MAP_PIN_WIDTH = window.data.MAP_PIN_WIDTH;
const MAP_PIN_HEIGHT = window.data.MAP_PIN_HEIGHT;

const isEscPressed = window.util.isEscPressed;

const renderCard = window.card.render;
const renderPins = window.pin.render;

const adForm = window.form.ad;
const blockForm = window.form.block;
const offerAddress = window.form.offerAddress;
const unblockForm = window.form.unblock;

const map = document.querySelector(`.map`);
const mapFilter = document.querySelector(`.map__filters`); // Фильтр обьявлений на карте
const mapFiltersContainer = map.querySelector(`.map__filters-container`);

const mapPins = map.querySelector(`.map__pins`); // Метки обьявлений (блок)
const mainPin = map.querySelector(`.map__pin--main`); // Главная метка

const basicMainPinPisition = {
  x: mainPin.offsetLeft,
  y: mainPin.offsetTop
};
  // ------------------------------------------------------------------------------------------------------------------------
const getMapAdress = (deactive) => {
  const mapPinX = parseInt(mainPin.style.left, 10); // Нач. коорд. X
  const mapPinY = parseInt(mainPin.style.top, 10); // Нач. коорд. Y
  const addressX = mapPinX + Math.round(MAP_PIN_WIDTH / 2);
  const addressY = mapPinY + (deactive ? Math.round(MAP_PIN_WIDTH / 2) : MAP_PIN_HEIGHT);
  offerAddress.value = `${addressX}, ${addressY}`;

};
const deActivatePin = () => {
  const activePin = document.querySelector(`.map__pin--active`);
  activePin.classList.remove(`map__pin--active`);
};

const onWindowKeydown = (keyDownEvt) => {
  if (isEscPressed(keyDownEvt)) {
    keyDownEvt.preventDefault();
    closeOpenedOfferCard();
    deActivatePin();
  }
};

// ДЕАКТИВАЦИЯ страницы

const deActivateMap = () => {
  blockForm(adForm);
  blockForm(mapFilter);
  getMapAdress(true);
  map.classList.add(`map--faded`);
  adForm.classList.add(`ad-form--disabled`);

  mainPin.style.left = basicMainPinPisition.x + `px`;
  mainPin.style.top = basicMainPinPisition.y + `px`;
};

// АКТИВАЦИЯ страницы

const activateMap = () => {
  map.classList.remove(`map--faded`);
  adForm.classList.remove(`ad-form--disabled`);

  const filteredOffers = window.filterOffers();

  mapPins.appendChild(renderPins(filteredOffers));

  unblockForm(adForm);
  unblockForm(mapFilter);
  getMapAdress();
};

const onMapClick = (evt) => {
  const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);

  if (pin) {
    const pinId = pin.dataset.id;
    const currentOffer = window.data.offers.find((item) => item.id === pinId);
    const activatedPin = document.querySelector(`.map__pin--active`);
    window.removeEventListener(`keydown`, onWindowKeydown);
    closeOpenedOfferCard();

    if (activatedPin) {
      activatedPin.classList.remove(`map__pin--active`);
    }

    const getRenderedCard = renderCard(currentOffer);
    map.insertBefore(getRenderedCard, mapFiltersContainer);

    const offerCard = document.querySelector(`.map__card`);
    const closeBtn = offerCard.querySelector(`.popup__close`);
    pin.classList.add(`map__pin--active`);


    const onCloseBtnClick = () => {
      closeOpenedOfferCard();
      deActivatePin();
    };

    closeBtn.addEventListener(`click`, onCloseBtnClick);
    window.addEventListener(`keydown`, onWindowKeydown, {
      once: true,
    });
  }
};

map.addEventListener(`click`, onMapClick);

const deleteAllPins = () => {
  const pins = map.querySelectorAll(`.map__pin:not(.map__pin--main)`);
  pins.forEach((pin) => {
    pin.remove();
  });
};

const closeOpenedOfferCard = () => {
  const openedOfferCard = document.querySelector(`.map__card`);
  if (openedOfferCard) {
    openedOfferCard.remove();
    window.removeEventListener(`keydown`, onWindowKeydown);
  }
};

const updatePins = (filteredOffers) => {
  deleteAllPins();
  closeOpenedOfferCard();
  mapPins.appendChild(renderPins(filteredOffers));
};
  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------
window.map = {
  body: map,
  filter: mapFilter,
  pins: mapPins,
  mainPin,
  getAdress: getMapAdress,
  deActivate: deActivateMap,
  activate: activateMap,
  deleteAllPins,
  closeOpenedOfferCard,
  updatePins,
};
