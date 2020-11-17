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

  const isTypeMatched = (arg) => {
    const housingTypeValue = housingType.value;
    return housingTypeValue === ANY_VALUE || arg.offer.type === housingTypeValue;
  };

  const isPriceMatched = (arg) => {
    const housingPriceValue = housingPrice.value;
    return housingPriceValue === ANY_VALUE ||
    (housingPriceValue === `low` && arg.offer.price < LOW_PRICE_BAR) ||
    (housingPriceValue === `middle` && (arg.offer.price > LOW_PRICE_BAR && arg.offer.price < HIGH_PRICE_BAR)) ||
      (housingPriceValue === `high` && arg.offer.price > HIGH_PRICE_BAR);
  };

  const isGuestsMatched = (arg) => {
    const housingGuestsValue = housingGuests.value;
    return housingGuestsValue === ANY_VALUE || arg.offer.guests === Number(housingGuestsValue);
  };

  const isRoomsMatched = (arg) => {
    const housingRoomsValue = housingRooms.value;
    return housingRoomsValue === ANY_VALUE || arg.offer.rooms === Number(housingRoomsValue);
  };

  const isFeaturesMatched = (arg) => {
    const selectedFeatures = Array.from(housingFeatures.querySelectorAll(`.map__checkbox:checked`)).map((checkbox) => checkbox.value);
    return contains(arg.offer.features, selectedFeatures) || selectedFeatures.length === 0;
  };

  const filterOffers = () => {

    const result = [];
    const offers = window.data.offers;

    for (let i = 0; i < offers.length; i++) {

      const typeMatched = isTypeMatched(offers[i]);
      console.log(typeMatched);
      const priceMatched = isPriceMatched(offers[i]);
      const guestsMatched = isGuestsMatched(offers[i]);
      const roomsMatched = isRoomsMatched(offers[i]);
      const featuresMatched = isFeaturesMatched(offers[i]);

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

  // ЭКСПОРТ------------------------------------------------------------------------------------------------------------------

  window.filterOffers = filterOffers;

})();
