'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const activateMap = window.map.activate;
  const deActivateMap = window.map.deActivate;
  const mainPin = window.map.mainPin;
  const onActiveMainPinMouseDown = window.move.onActiveMainPinMouseDown;
  const load = window.backend.load;
  const serverStatusMessage = window.backend.serverStatusMessage;

  // Список констант и переменных----------------------------------------------------

  // ДЕАКТИВАЦИЯ    карты по умочанию

  deActivateMap();

  // АКТИВАЦИЯ карты по клику мыши / нажатию на Enter
  // Functiuns
  const onError = (errorMessage) => {
    serverStatusMessage(errorMessage);
  };

  const onSuccess = (data) => {
    window.data.offers = data;
    // Присваиваем id
    for (let i = 0; i < data.length; i++) {
      data[i].id = `${i + 1}`;
    }
    activateMap();
  };

  const onMainPinClick = (evt) => {
    if (evt.button === 0) {
      load(onSuccess, onError);
      mainPin.removeEventListener(`click`, onMainPinClick);
    }
  };

  const onMainPinKeyDown = (evt) => {
    if (evt.key === `Enter`) {
      load(onSuccess, onError);
      mainPin.removeEventListener(`click`, onMainPinClick);
    }
  };

  mainPin.addEventListener(`click`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  mainPin.addEventListener(`mousedown`, onActiveMainPinMouseDown);

})();
