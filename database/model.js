const db = require('./index.js');
const mongoose = require('mongoose');

let productDetailSchema = new mongoose.Schema({
  productCategoryId: Number,
  productCategory: String,
  productName: String,
  price: String,
  brandName: String,
  onlineExclusive: Boolean,
  reviewStarCount: String,
  reviewCount: Number,
  colors: String,
  colorImages: String,
  fit: [String],
  sizeStandard: [String],
  sizePetite: [String],
  sizePlus: [String],
  sizesUnavailable: String,
  sizePetiteUnavailable: String,
  sizePlusUnavailable: String,
  image: [String]
})

let ProductDetail = mongoose.model('ProductDetail', productDetailSchema)

module.exports = ProductDetail;
