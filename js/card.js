/* eslint-disable */
'use strict';
// ------------------------------------------------------------------------------------------------------------------------
const CARD_PHOTO_WIDTH = 45;
const CARD_PHOTO_HEIGHT = 40;
const TYPES = window.data.TYPES;
const cardPopupTemplate = document.querySelector(`#card`).content.querySelector(`.popup`);
// ------------------------------------------------------------------------------------------------------------------------

const renderCard = (cardData) => {
  const cardFragment = document.createDocumentFragment();const newCard = cardPopupTemplate.cloneNode(true);

  const popupFeatures = newCard.querySelector(`.popup__features`);// DOM-элемент с "фичами" обьявления
  const popupPhotos = newCard.querySelector(`.popup__photos`);// DOM-элемент с фото обьявления

  newCard.querySelector(`.popup__title`).textContent = cardData.offer.title;
  newCard.querySelector(`.popup__text--address`).textContent = cardData.offer.address;
  newCard.querySelector(`.popup__text--price`).textContent = `${cardData.offer.price} ₽/ночь`;
  newCard.querySelector(`.popup__type`).textContent = TYPES[cardData.offer.type];
  newCard.querySelector(`.popup__text--capacity`).textContent = `${cardData.offer.rooms} комнаты для ${cardData.offer.guests} гостей`;
  newCard.querySelector(`.popup__text--time`).textContent = `Заезд после ${cardData.offer.checkin} выезд до ${cardData.offer.checkout}`;

  popupFeatures.innerHTML = ``;
  cardData.offer.features.forEach((feature) => {
    const newLi = document.createElement(`li`);
    newLi.classList.add(`popup__feature`, `popup__feature--${feature}`);
    popupFeatures.appendChild(newLi);
  });

   popupPhotos.innerHTML = ``;
   cardData.offer.photos.forEach((photoFromArr) => {
     const newImg = document.createElement(`img`);
     newImg.classList.add(`popup__photo`);
     newImg.src = photoFromArr;
     newImg.setAttribute(`width`, CARD_PHOTO_WIDTH);
     newImg.setAttribute(`height`, CARD_PHOTO_HEIGHT);
     newImg.setAttribute(`alt`, `Фотография жилья`);
     popupPhotos.appendChild(newImg);
   });

   newCard.querySelector(`.popup__avatar`).src = cardData.author.avatar;

   cardFragment.appendChild(newCard);

   return cardFragment;
};
// ЭКСПОРТ------------------------------------------------------------------------------------------------------------------
window.card = {
  render: renderCard,
};
