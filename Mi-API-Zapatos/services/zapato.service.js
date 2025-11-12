 const Zapato = require('../models/Zapato.js');



async function createZapato(data) {
  return Zapato.create(data);
}

module.exports = { createZapato };

