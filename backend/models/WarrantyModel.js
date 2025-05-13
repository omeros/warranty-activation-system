// models/WarrantyModel.js
const mongoose = require('mongoose');

const warrantySchema = new mongoose.Schema({
  installerId:      { type: mongoose.Types.ObjectId, ref: 'User', required: true },
  clientId:         { type: mongoose.Types.ObjectId, ref: 'Client', required: true },
  productInfo:      String,
  installationDate: Date,
  invoiceFileUrl:   String,
  invoiceDate:      Date,
  status:           String,
  createdAt:        { type: Date, default: Date.now },
});

module.exports = mongoose.model('Warranty', warrantySchema);
