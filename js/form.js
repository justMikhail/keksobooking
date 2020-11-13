'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------
  const main = document.querySelector(`main`);
  const isEscPressed = window.util.isEscPressed;
  const upLoad = window.backend.upLoad;
  const deleteAllPins = window.map.deleteAllPins;
  const deActivateMap = window.map.deActivate;

  // --------------------------------------------------------------------------------

  const adForm = document.querySelector(`.ad-form`); // Форма. ГЛАВНАЯ
  const inputAddress = adForm.querySelector(`#address`); // Форма. Адресс
  const inputRoomsNumber = adForm.querySelector(`#room_number`); // Форма выбора колличества комнат
  const inputGuestsNumber = adForm.querySelector(`#capacity`); // Форма выбора колличества гостей

  // БЛОКИРОВКА формы

  const blockForm = (form) => {
    const arrFormElements = Array.from(form.children); // !создание массива из элементов формы
    arrFormElements.forEach((element) => {
      element.setAttribute(`disabled`, `disabled`);
    });
  };

  // РАЗБЛОКИРОВКА формы

  const unblockForm = (form) => {
    const arrFormElements = Array.from(form.children); // !создание массива из элементов формы
    arrFormElements.forEach((element) => {
      element.removeAttribute(`disabled`, `disabled`);
    });
  };

  // ВАЛИДАЦИЯ формы

  const onFormChange = () => {
    const isRoomValid = inputRoomsNumber.value >= inputGuestsNumber.value;
    const isNoQuestsRoomInvalid = inputRoomsNumber.value === `100` && inputGuestsNumber !== `0`;

    if (isNoQuestsRoomInvalid) {
      inputRoomsNumber.setCustomValidity(`Не рассчитано для гостей`);
    } else if (!isRoomValid) {
      inputRoomsNumber.setCustomValidity(`Колличество гостей не должно превышать колличество гостей`);
    } else {
      inputRoomsNumber.setCustomValidity(``);
    }
    inputRoomsNumber.reportValidity();
  };

  inputRoomsNumber.addEventListener(`change`, onFormChange);
  inputGuestsNumber.addEventListener(`change`, onFormChange);

  // -------------------------------------------------------------------------------------------
  const returnToNoActivePage = () => {
    deActivateMap();
    deleteAllPins();
    adForm.reset();
  };

  const onFormSuccessUpload = () => {
    returnToNoActivePage();
    showFormUploadStatus(successMessage, main);
  };

  const onFormErrorUpload = () => {
    showFormUploadStatus(errorMessage, main);
  };

  const onAdFormSubmit = (evt) => {
    evt.preventDefault();

    upLoad(onFormSuccessUpload, onFormErrorUpload, new FormData(adForm));
  };

  adForm.addEventListener(`submit`, onAdFormSubmit);


  // СООБЩЕНИЕ о статусе отправки формы
  const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

  const showFormUploadStatus = (messageTemplate, parentContainer) => {
    const messageWindow = messageTemplate.cloneNode(true);
    const errorButton = messageWindow.querySelector(`.error__button`);

    parentContainer.append(messageWindow);

    if (errorButton) {
      errorButton.addEventListener(`click`, () => {
        messageWindow.remove();
      });
    }

    const onWindowClick = (evt) => {
      if (evt.target.parentNode !== messageWindow) {
        messageWindow.remove();
      }
    };

    const onWindowKeydown = (evt) => {
      if (isEscPressed(evt)) {
        messageWindow.remove();
      }
    };

    window.addEventListener(`keydown`, onWindowKeydown);
    window.addEventListener(`click`, onWindowClick);
  };

  // -------------------------------------------------------------------------------------------

  // ЭКСПОРТ--------------------------------------------------------------------------------

  window.form = {
    ad: adForm,
    block: blockForm,
    unblock: unblockForm,
    inputAddress,
  };
})();
