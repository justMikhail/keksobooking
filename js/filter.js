'use strict';

(function () {

  // ------------------------------------------------------------------------------
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

  // ------------------------------------------------------------------------------

  const filterOffers = () => {
    const housingTypeValue = housingType.value;
    const housingPriceValue = housingPrice.value;
    const housingRoomsValue = housingRooms.value;
    const housingGuestsValue = housingGuests.value;


    const selectedFeatures = Array.from(housingFeatures.querySelectorAll(`.map__checkbox:checked`)).map((checkbox) => checkbox.value);

    const result = [];
    const offers = window.data.offers;

    for (let i = 0; i < offers.length; i++) {

      const typeMatched = housingTypeValue === ANY_VALUE || offers[i].offer.type === housingTypeValue;

      const priceMatched = housingPriceValue === ANY_VALUE ||
        (housingPriceValue === `low` && offers[i].offer.price < LOW_PRICE_BAR) ||
        (housingPriceValue === `middle` && (offers[i].offer.price > LOW_PRICE_BAR && offers[i].offer.price < HIGH_PRICE_BAR)) ||
        (housingPriceValue === `high` && offers[i].offer.price > HIGH_PRICE_BAR);

      const guestsMatched = housingGuestsValue === ANY_VALUE || offers[i].offer.guests === Number(housingGuestsValue);
      const roomsMatched = housingRoomsValue === ANY_VALUE || offers[i].offer.rooms === Number(housingRoomsValue);
      const featuresMatched = contains(offers[i].offer.features, selectedFeatures) || selectedFeatures.length === 0;

      if (typeMatched && priceMatched && guestsMatched && roomsMatched && featuresMatched) {
        result.push(offers[i]);
      }

      if (result.length === MAX_PINS_QUANTITY) {
        break;
      }
    }
    return result;

  };

  const onMapFilterChange = window.debounce(() => {
    updatePins(filterOffers());
  });

  mapFilter.addEventListener(`change`, onMapFilterChange);

  window.filterOffers = filterOffers;

})();
