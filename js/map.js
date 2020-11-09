'use strict';
(function () {

  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const MAP_PIN_WIDTH = window.data.MAP_PIN_WIDTH;
  const MAP_PIN_HEIGHT = window.data.MAP_PIN_HEIGHT;

  const mockArrSuite = window.data.mockArrSuite;

  const renderCard = window.card.render;

  const renderPins = window.pin.render;

  const adForm = window.form.ad;
  const blockForm = window.form.block;
  const inputAddress = window.form.inputAddress;

  const unblockForm = window.form.unblock;

  const getRandomNumber = window.util.getRandomNumber;

  // Список констант и переменных----------------------------------------------------

  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters-container`); // Фильтр обьявлений на карте

  const mapPins = document.querySelector(`.map__pins`); // Метки обьявлений
  const mapPin = document.querySelector(`.map__pin--main`); // Метка обьявлений


  const getMapAdress = (deactive) => {
    const mapPinX = parseInt(mapPin.style.left, 10); // Нач. коорд. X
    const mapPinY = parseInt(mapPin.style.top, 10); // Нач. коорд. Y
    const addressX = mapPinX + Math.round(MAP_PIN_WIDTH / 2);
    const addressY = mapPinY + (deactive ? Math.round(MAP_PIN_WIDTH / 2) : MAP_PIN_HEIGHT);
    inputAddress.value = `${addressX}, ${addressY}`;
  };

  // ДЕАКТИВАЦИЯ карты и меток обьявлений (ПО УМОЛЧАНИЮ)

  const deActiveMap = () => {
    blockForm(adForm);
    blockForm(mapFilter);
    getMapAdress(true);
  };

  // АКТИВАЦИЯ карты и меток обьявлений

  const activeMap = () => {
    map.classList.remove(`map--faded`);
    adForm.classList.remove(`ad-form--disabled`);

    mapPins.appendChild(renderPins(window.data.mockArrSuite));
    const getRenderedCard = renderCard(window.data.mockArrSuite[getRandomNumber(0, SUITE_QUANTITY)]);
    map.insertBefore(getRenderedCard, mapFilter);

    unblockForm(adForm);
    unblockForm(mapFilter);
    getMapAdress();


  };


  map.addEventListener(`click`, function (evt) {
    const pin = evt.target.closest(`.map__pin:not(.map__pin--main)`);
    console.log(evt.target);
    if (pin) {
      const pinId = pin.dataset.id;
    }
  });

  // ЭКСПОРТ--------------------------------------------------------------------------------

  window.map = {
    body: map,
    filter: mapFilter,
    pins: mapPins,
    pin: mapPins,
    getAdress: getMapAdress,
    deActive: deActiveMap,
    active: activeMap,
  };

})();
