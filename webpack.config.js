const path = require("path");

module.exports = {
  entry: [
    "./js/backend.js",
    "./js/util.js",
    "./js/debounce.js",
    "./js/data.js",
    "./js/card.js",
    "./js/pin.js",
    "./js/form.js",
    "./js/map.js",
    "./js/filter.js",
    "./js/move.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false,
};
