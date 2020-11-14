'use strict';

(function () {
  // ---------------------------------------------------------------------------------
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;

  const isEscPressed = window.util.isEscPressed;

  // --------------------------------------------------------------------------------

  const adForm = document.querySelector(`.ad-form`); // Форма.
  const offeravatar = adForm.querySelector(`#avatar`); // Форма. Аватар владельца
  const offerTitle = adForm.querySelector(`#title`); // Форма. Заголовок
  const offerAddress = adForm.querySelector(`#address`); // Форма. Адресс
  const offerType = adForm.querySelector(`#type`); // Форма. Тип жилья
  const offerPrice = adForm.querySelector(`#price`); // Формаю. Цена за ночь
  const offerTimein = adForm.querySelector(`#timein`);
  const offerTimeout = adForm.querySelector(`#timeout`);
  const inputRoomsNumber = adForm.querySelector(`#room_number`); // Форма выбора колличества комнат
  const inputGuestsNumber = adForm.querySelector(`#capacity`); // Форма выбора колличества гостей
  const offerimages = adForm.querySelector(`#images`); // Форма. input type="file"

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

  // ВАЛИДАЦИЯ формы (START)---------------------------------------------------------------------------------

  // ВАЛИДАЦИЯ фото
  offeravatar.setAttribute(`accept`, `image/jpeg,image/png,image/gif`);
  offerimages.setAttribute(`accept`, `image/jpeg,image/png,image/gif`);

  // ВАЛИДАЦИЯ заголовка обьявления

  offerTitle.setAttribute(`required`, `required`);
  const onOfferTitleInput = () => {
    let valueTitleLength = offerTitle.value.length;

    if (valueTitleLength < MIN_TITLE_LENGTH) {
      offerTitle.setCustomValidity(`Добавьте ` + (MIN_TITLE_LENGTH - valueTitleLength) + ` симв.`);
    } else if (valueTitleLength > MAX_TITLE_LENGTH) {
      offerTitle.setCustomValidity(`Лимит привышен на ` + (valueTitleLength - MAX_TITLE_LENGTH) + ` симв.`);
    } else {
      offerTitle.setCustomValidity(``);
    }
    offerTitle.reportValidity();
  };

  offerTitle.addEventListener(`input`, onOfferTitleInput);

  // Валидация адреса
  offerAddress.setAttribute(`readonly`, `readonly`);

  // ВАЛИДАЦИЯ заголовка обьявления

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

  // ВАЛИДАЦИЯ формы (END)---------------------------------------------------------------------------------


  // СООБЩЕНИЕ о статусе отправки формы
  const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
  const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

  const showFormUploadStatus = (messageTemplate) => {
    const messageWindow = messageTemplate.cloneNode(true);
    const errorButton = messageWindow.querySelector(`.error__button`);
    const main = document.querySelector(`main`);

    main.append(messageWindow);

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
    offerAddress,
    showUploadStatus: showFormUploadStatus,
    successMessage,
    errorMessage,
  };
})();
