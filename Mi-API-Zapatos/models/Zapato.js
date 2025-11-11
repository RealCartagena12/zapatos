const { text } = require('express');
const mongoose = require('mongoose');

const zapatoSchema = new mongoose.Schema({
  brand: { type: String, required: true, trim: true },
  model: { type: String, required: true, trim: true },
  size:  { type: Number, required: true, min: 1 },
  color: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  tags:  { type: [String], default: [] }
}, { timestamps: true });

module.exports = mongoose.model('Zapato', zapatoSchema);