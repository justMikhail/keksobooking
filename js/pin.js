'use strict';

(function () {

  // ------------------------------------------------------------------------------------------------------------------------

  const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

  // ------------------------------------------------------------------------------------------------------------------------

  const renderPins = (pins) => {
    const pinFragment = document.createDocumentFragment();

    for (let i = 0; i < pins.length; i++) {
      const newPin = pinTemplate.cloneNode(true);
      const pinImg = newPin.querySelector(`img`);
      newPin.style = `left: ${pins[i].location.x - pinImg.width / 2}px; top: ${pins[i].location.y - pinImg.height}px;`;
      pinImg.src = pins[i].author.avatar;
      pinImg.alt = pins[i].offer.title;
      newPin.dataset.id = pins[i].id;

      pinFragment.appendChild(newPin);
    }
    return pinFragment;
  };

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.pin = {
    render: renderPins,
  };

})();
