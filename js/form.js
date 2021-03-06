'use strict';
// ------------------------------------------------------------------------------------------------------------------------
const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_OFFER_PRICE = 1000000;

const minPrices = {
  BUNGALO_PRICE: 0,
  FLAT_PRICE: 1000,
  HOUS_PRICE: 5000,
  PALACE_PRICE: 10000,
};

const isEscPressed = window.util.isEscPressed;

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
const resetBtn = adForm.querySelector(`.ad-form__reset`);

// ------------------------------------------------------------------------------------------------------------------------

// БЛОКИРОВКА формы

const blockForm = (form) => {
  const arrFormElements = Array.from(form.children);
  arrFormElements.forEach((element) => {
    element.setAttribute(`disabled`, `disabled`);
  });
};

// РАЗБЛОКИРОВКА формы

const unblockForm = (form) => {
  const arrFormElements = Array.from(form.children);
  arrFormElements.forEach((element) => {
    element.removeAttribute(`disabled`, `disabled`);
  });
};

// ВАЛИДАЦИЯ формы (START)------------------------------------------------------------------------------------------------

// ВАЛИДАЦИЯ фото
offeravatar.setAttribute(`accept`, `image/jpeg,image/png,image/gif`);
offerimages.setAttribute(`accept`, `image/jpeg,image/png,image/gif`);

// ВАЛИДАЦИЯ заголовка обьявления

offerTitle.setAttribute(`required`, `required`);
offerTitle.removeAttribute(`minlength`);
offerTitle.removeAttribute(`maxlength`);
const onOfferTitleInput = () => {
  let valueTitleLength = offerTitle.value.length;

  if (valueTitleLength < MIN_TITLE_LENGTH) {
    offerTitle.setCustomValidity(`Добавьте ${MIN_TITLE_LENGTH - valueTitleLength} симв.`);
  } else if (valueTitleLength > MAX_TITLE_LENGTH) {
    offerTitle.setCustomValidity(`Лимит привышен на ${valueTitleLength - MAX_TITLE_LENGTH} симв.`);
  } else {
    offerTitle.setCustomValidity(``);
  }
  offerTitle.reportValidity();
};

offerTitle.addEventListener(`input`, onOfferTitleInput);

// Валидация ввода адеса (только для чтения)
offerAddress.setAttribute(`readonly`, `readonly`);

// ВАЛИДАЦИЯ. Поле «Тип жилья» влияет на минимальное значение поля «Цена за ночь»
const onOfferPriceOrTypeChange = () => {
  if ((offerType.value === `bungalow`) && (offerPrice.value < minPrices.BUNGALO_PRICE)) {
    offerPrice.setCustomValidity(`Для бунгало минимальная цена за ночь 0р`);
    offerPrice.setAttribute(`min`, `0`);
    offerPrice.setAttribute(`placeholder`, `0`);
  } else if ((offerType.value === `flat`) && (offerPrice.value < minPrices.FLAT_PRICE)) {
    offerPrice.setCustomValidity(`Минимальная цена за ночь 1000р для данного типа жидья`);
    offerPrice.setAttribute(`min`, `1000`);
    offerPrice.setAttribute(`placeholder`, `1000`);
  } else if ((offerType.value === `house`) && (offerPrice.value < minPrices.HOUS_PRICE)) {
    offerPrice.setCustomValidity(`Минимальная цена за ночь 5000р для данного типа жидья`);
    offerPrice.setAttribute(`min`, `5000`);
    offerPrice.setAttribute(`placeholder`, `5000`);
  } else if ((offerType.value === `palace`) && (offerPrice.value < minPrices.PALACE_PRICE)) {
    offerPrice.setCustomValidity(`Минимальная цена за ночь 10000р для данного типа жидья`);
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

const onOfferPriceInput = () => {

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

// ВАЛИДАЦИЯ формы (END)----------------------------------------------------------------------------------------------------


// СООБЩЕНИЕ о статусе отправки формы
const successMessage = document.querySelector(`#success`).content.querySelector(`.success`);
const errorMessage = document.querySelector(`#error`).content.querySelector(`.error`);

const showFormUploadStatus = (messageTemplate) => {
  const messageWindow = messageTemplate.cloneNode(true);
  const errorButton = messageWindow.querySelector(`.error__button`);
  const main = document.querySelector(`main`);
  const closeWindow = () => {
    messageWindow.remove();
    window.removeEventListener(`keydown`, onWindowKeydown);
    window.removeEventListener(`click`, onWindowClick);
  };

  main.append(messageWindow);

  if (errorButton) { // ?
    errorButton.addEventListener(`click`, () => {
      closeWindow();
    });
  }

  const onWindowClick = (evt) => {
    if (evt.target.parentNode !== messageWindow) {
      closeWindow();
    }
  };

  const onWindowKeydown = (evt) => {
    if (isEscPressed(evt)) {
      closeWindow();
    }
  };

  window.addEventListener(`keydown`, onWindowKeydown);
  window.addEventListener(`click`, onWindowClick);
};
// ЭКСПОРТ------------------------------------------------------------------------------------------------------------------
window.form = {
  ad: adForm,
  block: blockForm,
  unblock: unblockForm,
  offerAddress,
  showUploadStatus: showFormUploadStatus,
  successMessage,
  errorMessage,
  MAX_OFFER_PRICE,
  resetBtn,
};
