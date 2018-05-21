var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var CheckOutSchema = new Schema({
  FullName: String,
  Email: String,
  Address: String,
  City: String,
  State: String,
  Zip: Number,
  NameOnCard: String,
  CreditCardNumber: String,
  ExpMonth: String,
  ExpYear: Number,
  CVV: Number
});
module.exports = mongoose.model("Checkout", CheckOutSchema);
