'use strict';

(() => {

  // ------------------------------------------------------------------------------------------------------------------------

  const MIN_Y = window.data.MIN_Y; // Система координат. Карта.
  const MAX_Y = window.data.MAX_Y;
  const MIN_X = window.data.MIN_X;
  const MAX_X = window.data.MAX_X;
  const MAP_PIN_WIDTH = window.data.MAP_PIN_WIDTH;
  const MAP_PIN_HEIGHT = window.data.MAP_PIN_HEIGHT;

  const mainPin = window.map.mainPin;
  const offerAddress = window.form.offerAddress; // Поле "Адрксс" в форме обьявления

  // ------------------------------------------------------------------------------------------------------------------------

  const onActiveMainPinMouseDown = (evt) => {
    evt.preventDefault();

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();

      const shift = { // сдвиг
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      // Ограничиваем смещение внутри map
      if ((mainPin.offsetLeft - shift.x) < (MIN_X - Math.round(MAP_PIN_WIDTH / 2))) {
        mainPin.style.left = (MIN_X - Math.round(MAP_PIN_WIDTH / 2)) + `px`;
      } else if (((mainPin.offsetLeft - shift.x) > (MAX_X - Math.round(MAP_PIN_WIDTH / 2)))) {
        mainPin.style.left = (MAX_X - Math.round(MAP_PIN_WIDTH / 2)) + `px`;
      } else {
        mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
      }

      if ((mainPin.offsetTop - shift.y) < (MIN_Y - MAP_PIN_HEIGHT)) {
        mainPin.style.top = (MIN_Y - MAP_PIN_HEIGHT) + `px`;
      } else if (((mainPin.offsetTop - shift.y) > (MAX_Y - MAP_PIN_HEIGHT))) {
        mainPin.style.top = (MAX_Y - MAP_PIN_HEIGHT) + `px`;
      } else {
        mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
      }


      offerAddress.value = `${(parseInt(mainPin.style.left, 10)) + Math.round(MAP_PIN_WIDTH / 2)}, ${(parseInt(mainPin.style.top, 10)) + MAP_PIN_HEIGHT}`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  };

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.move = {
    onActiveMainPinMouseDown,
  };

})();

