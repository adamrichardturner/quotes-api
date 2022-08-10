const { all } = require("express/lib/application");

const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getQuotesByAuthor = (quotesArray, person) => {
  return quotesArray.filter(quote => quote.person === person);
}

module.exports = {
  getRandomElement,
  getQuotesByAuthor
};
