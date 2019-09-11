const ProductDetail = require('./model.js');

const dbHelpers = {
  getById: (productCategoryId) => {
    return ProductDetail.findOne({
      productCategoryId
    });
  },

  createProduct: (productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image) => {
    return ProductDetail.create({
      productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image
    });
  },

  updateProduct: () => {

  },

  deleteProduct: (productCategoryId) => {
    return ProductDetail.deleteOne({
      productCategoryId
    });
  }

}

module.exports = dbHelpers;