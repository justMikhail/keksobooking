'use strict';
(function () {

  // ИМПОРТ--------------------------------------------------------------------------
  const SUITE_QUANTITY = window.data.SUITE_QUANTITY;
  const MAP_PIN_WIDTH = window.data.MAP_PIN_WIDTH;
  const MAP_PIN_HEIGHT = window.data.MAP_PIN_HEIGHT;
  const mockArrSuite = window.data.mockArrSuite;

  const renderCard = window.card.render;

  const renderPins = window.pin.render;
  const getMockPins = renderPins(mockArrSuite);

  const adForm = window.form.adForm;
  const inputAddress = window.form.inputAddress;
  const blockForm = window.form.blockForm;
  const unblockForm = window.form.unblockForm;

  const getRandomNumber = window.util.getRandomNumber;

  // Список констант и переменных----------------------------------------------------

  const map = document.querySelector(`.map`);
  const mapFilter = document.querySelector(`.map__filters-container`); // Фильтр обьявлений на карте
  // const getRenderedCard = renderCard(mockArrSuite[getRandomNumber(0, SUITE_QUANTITY)]);
  // map.insertBefore(getRenderedCard, mapFilter);

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

    mapPins.appendChild(getMockPins);

    unblockForm(adForm);
    unblockForm(mapFilter);
    getMapAdress();
  };

  // ЭКСПОРТ--------------------------------------------------------------------------------

  window.map = {
    body: map,
    Filter: mapFilter,
    pins: mapPins,
    pin: mapPins,
    getMockPins,
    getAdress: getMapAdress,
    deActive: deActiveMap,
    active: activeMap,
  };

})();
