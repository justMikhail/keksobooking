'use strict';

(function () {
  // ИМПОРТ--------------------------------------------------------------------------


  // Список констант и переменных----------------------------------------------------

  const adForm = document.querySelector(`.ad-form`); // Форма. ГЛАВНАЯ
  const inputAddress = adForm.querySelector(`#address`); // Форма. Адресс

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

  const inputRoomsNumber = adForm.querySelector(`#room_number`); // Форма выбора колличества комнат
  const inputGuestsNumber = adForm.querySelector(`#capacity`); // Форма выбора колличества гостей

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

  // ЭКСПОРТ--------------------------------------------------------------------------------

  window.form = {
    adForm,
    inputAddress,
    blockForm,
    unblockForm,
  };
})();
