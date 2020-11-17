'use strict';

(() => {

  // ------------------------------------------------------------------------------------------------------------------------

  const ANY_VALUE = `any`;
  const MAX_PINS_QUANTITY = 5;
  const LOW_PRICE_BAR = 10000;
  const HIGH_PRICE_BAR = 50000;

  const mapFilter = window.map.filter;
  const housingType = mapFilter.querySelector(`#housing-type`);
  const housingRooms = mapFilter.querySelector(`#housing-rooms`);
  const housingGuests = mapFilter.querySelector(`#housing-guests`);

  const housingPrice = mapFilter.querySelector(`#housing-price`);
  const housingFeatures = mapFilter.querySelector(`#housing-features`);

  const updatePins = window.map.updatePins;
  const contains = window.util.contains;

  // ------------------------------------------------------------------------------------------------------------------------

  const housingTypeValue = housingType.value;
  const housingPriceValue = housingPrice.value;
  const housingRoomsValue = housingRooms.value;
  const housingGuestsValue = housingGuests.value;

  const selectedFeatures = Array.from(housingFeatures.querySelectorAll(`.map__checkbox:checked`)).map((checkbox) => checkbox.value);

  const typeMatched = (offer) => {
    if (housingTypeValue === ANY_VALUE || offer.offer.type === housingTypeValue) {
      return true;
    } else {
      return false;
    }
  };

  const priceMatched = (offer) => {
    if (housingPriceValue === ANY_VALUE ||
      (housingPriceValue === `low` && offer.offer.price < LOW_PRICE_BAR) ||
      (housingPriceValue === `middle` && (offer.offer.price > LOW_PRICE_BAR && offer.offer.price < HIGH_PRICE_BAR)) ||
      (housingPriceValue === `high` && offer.offer.price > HIGH_PRICE_BAR)) {
      return true;
    } else {
      return false;
    }
  };

  const guestsMatched = (offer) => {
    if (housingGuestsValue === ANY_VALUE || offer.offer.guests === Number(housingGuestsValue)) {
      return true;
    } else {
      return false;
    }
  };

  const roomsMatched = (offer) => {
    if (housingRoomsValue === ANY_VALUE || offer.offer.rooms === Number(housingRoomsValue)) {
      return true;
    } else {
      return false;
    }
  };

  const featuresMatched = (offer) => {
    if (contains(offer.offer.features, selectedFeatures) || selectedFeatures.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  // ------------------------------------------------------------------------------------------------------------------------

  const filterOffers = () => {

    const result = [];
    const offers = window.data.offers;

    for (let i = 0; i < offers.length; i++) {

      if (typeMatched(offers[i]) && priceMatched(offers[i]) && guestsMatched(offers[i]) && roomsMatched(offers[i]) && featuresMatched(offers[i])) {
        result.push(offers[i]);
      }

      if (result.length === MAX_PINS_QUANTITY) {
        break;
      }
    }
    console.log(result);
    return result;
  };

  const onMapFilterChange = window.debounce(() => {
    updatePins(filterOffers());
  });

  mapFilter.addEventListener(`change`, onMapFilterChange);

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.filterOffers = filterOffers;

})();
