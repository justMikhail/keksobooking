'use strict';

(function () {
  // ---------------------------------------------------------------------------------
  const MIN_TITLE_LENGTH = 30;
  const MAX_TITLE_LENGTH = 100;
  const MAX_OFFER_PRICE = 1000000;

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

  // Валидация ввода адеса (только для чтения)
  offerAddress.setAttribute(`readonly`, `readonly`);

  // ВАЛИДАЦИЯ. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
  const onOfferPriceOrTypeChange = function () {
    if ((offerType.value === `bungalow`) && (offerPrice.value < 0)) {
      offerPrice.setCustomValidity(`Для бунгало минимальная цена за ночь 0р`);
      offerPrice.setAttribute(`min`, `0`);
      offerPrice.setAttribute(`placeholder`, `0`);
    } else if ((offerType.value === `flat`) && (offerPrice.value < 1000)) {
      offerPrice.setCustomValidity(`Для квартиры минимальная цена за ночь 1000р`);
      offerPrice.setAttribute(`min`, `1000`);
      offerPrice.setAttribute(`placeholder`, `1000`);
    } else if ((offerType.value === `house`) && (offerPrice.value < 5000)) {
      offerPrice.setCustomValidity(`Для дома минимальная цена за ночь 5000р`);
      offerPrice.setAttribute(`min`, `5000`);
      offerPrice.setAttribute(`placeholder`, `5000`);
    } else if ((offerType.value === `palace`) && (offerPrice.value < 10000)) {
      offerPrice.setCustomValidity(`Для дворца минимальная цена за ночь 10000р`);
      offerPrice.setAttribute(`min`, `10000`);
      offerPrice.setAttribute(`placeholder`, `10000`);
    } else {
      offerPrice.setCustomValidity(``);
    }
    offerPrice.reportValidity();
  };
  offerPrice.addEventListener(`change`, onOfferPriceOrTypeChange);
  offerType.addEventListener(`change`, onOfferPriceOrTypeChange);

  // Валидация максимальной цены
  offerPrice.setAttribute(`max`, MAX_OFFER_PRICE);
  offerPrice.setAttribute(`required`, `required`);

  const onOfferPriceInput = function () {

    if (offerPrice.value > MAX_OFFER_PRICE) {
      offerPrice.setCustomValidity(`Цена не должна превышать ` + MAX_OFFER_PRICE);
    } else {
      offerPrice.setCustomValidity(``);
    }
    offerPrice.reportValidity();
  };
  offerPrice.addEventListener(`input`, onOfferPriceInput);

  // Поля «Время заезда» и «Время выезда» синхронизированы
  const onOfferTimeinChange = () => {
    offerTimeout.value = offerTimein.value;
  };
  const onofferTimeoutChange = () => {
    offerTimein.value = offerTimeout.value;
  };

  offerTimein.addEventListener(`change`, onOfferTimeinChange);
  offerTimeout.addEventListener(`change`, onofferTimeoutChange);

  // ВАЛИДАЦИЯ соотношения кооличества комнат к колличеству мест
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
