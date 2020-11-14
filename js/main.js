'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const activateMap = window.map.activate;
  const deActivateMap = window.map.deActivate;
  const mainPin = window.map.mainPin;
  const adForm = window.form.ad;
  const onActiveMainPinMouseDown = window.move.onActiveMainPinMouseDown;
  const load = window.backend.load;
  const upLoad = window.backend.upLoad;
  const serverStatusMessage = window.backend.serverStatusMessage;
  const showFormUploadStatus = window.form.showUploadStatus;
  const formSuccessMessage = window.form.successMessage;
  const formErrorMessage = window.form.errorMessage;
  const deleteAllPins = window.map.deleteAllPins;

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

  // -------------------------------------------------------------------------------------------
  const returnToNoActivePage = () => {
    adForm.reset();
    deleteAllPins(); // ! Не работает код
    deActivateMap(); // ! Не работает код
  };

  const onFormSuccessUpload = () => {
    showFormUploadStatus(formSuccessMessage);
    returnToNoActivePage();
  };

  const onFormErrorUpload = () => {
    showFormUploadStatus(formErrorMessage);
  };

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();
    upLoad(onFormSuccessUpload, onFormErrorUpload, new FormData(adForm));
  };
  // --------------------------------------------------------------------------------------------

  mainPin.addEventListener(`click`, onMainPinClick);
  mainPin.addEventListener(`keydown`, onMainPinKeyDown);
  mainPin.addEventListener(`mousedown`, onActiveMainPinMouseDown);
  adForm.addEventListener(`submit`, onAdFormSubmit);

})();
