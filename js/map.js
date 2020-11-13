'use strict';
(function () {

  // --------------------------------------------------------------------------------
  const MAP_PIN_WIDTH = window.data.MAP_PIN_WIDTH;
  const MAP_PIN_HEIGHT = window.data.MAP_PIN_HEIGHT;

  const isEscPressed = window.util.isEscPressed;

  const renderCard = window.card.render;
  const renderPins = window.pin.render;

  const adForm = window.form.ad;
  const blockForm = window.form.block;
  const inputAddress = window.form.inputAddress;

  const unblockForm = window.form.unblock;


  // ---------------------------------------------------------------------------------

  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters-container`); // Фильтр обьявлений на карте

  const mapPins = map.querySelector(`.map__pins`); // Метки обьявлений (блок)
  const mainPin = map.querySelector(`.map__pin--main`); // Метка обьявлений

  const getMapAdress = (deactive) => {
    const mapPinX = parseInt(mainPin.style.left, 10); // Нач. коорд. X
    const mapPinY = parseInt(mainPin.style.top, 10); // Нач. коорд. Y
    const addressX = mapPinX + Math.round(MAP_PIN_WIDTH / 2);
    const addressY = mapPinY + (deactive ? Math.round(MAP_PIN_WIDTH / 2) : MAP_PIN_HEIGHT);
    inputAddress.value = `${addressX}, ${addressY}`;
  };


  // ДЕАКТИВАЦИЯ карты и меток обьявлений (ПО УМОЛЧАНИЮ)

  const deActivateMap = () => {
    blockForm(adForm);
    blockForm(mapFilter);
    getMapAdress(true);
  };

  // АКТИВАЦИЯ карты и меток обьявлений

  const activateMap = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    mapPins.appendChild(renderPins(window.data.offers));

    unblockForm(adForm);
    unblockForm(mapFilter);
    getMapAdress();
  };


  const onMapClick = (evt) => {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);

    if (pin) {
      const pinId = pin.dataset.id;
      const currentOffer = window.data.offers.find((item) => item.id === pinId);
      const currentOfferCard = document.querySelector(`.map__card`);
      const activatedPin = document.querySelector(`.map__pin--active`);
      // Проверяем наличие открытой карточки обьявления, удаляем ее.
      if (currentOfferCard) {
        currentOfferCard.remove();
      }
      // Проверяем наличие активного Pin, делаем его неактивным
      if (activatedPin) {
        activatedPin.classList.remove(`map__pin--active`);
      }

      const getRenderedCard = renderCard(currentOffer);
      map.insertBefore(getRenderedCard, mapFilter);

      const offerCard = document.querySelector(`.map__card`);
      const closeBtn = offerCard.querySelector(`.popup__close`);
      pin.classList.add(`map__pin--active`);

      const closeOfferCard = () => {
        offerCard.remove();
        pin.classList.remove(`map__pin--active`);
      };

      const onCloseBtnClick = () => {
        closeOfferCard();
      };

      const onWindowKeydown = (keyDownEvt) => {
        if (isEscPressed(keyDownEvt)) {
          evt.preventDefault();
          closeOfferCard();
        }
      };


      closeBtn.addEventListener(`click`, onCloseBtnClick);
      window.addEventListener(`keydown`, onWindowKeydown);
    }
  };

  map.addEventListener(`click`, onMapClick);

  // УДАЛЕНИЕ меток(пинов) с карты
  const deleteAllPins = () => {
    const pins = map.querySelectorAll(`map__pin:not(.map__pin--main)`);
    for (let i = 0; i < pins.length; i++) {
      pins[i].remove();
    }
  };


  // ЭКСПОРТ--------------------------------------------------------------------------------

  window.map = {
    body: map,
    filter: mapFilter,
    pins: mapPins,
    mainPin,
    getAdress: getMapAdress,
    deActivate: deActivateMap,
    activate: activateMap,
    deleteAllPins,
  };

})();
