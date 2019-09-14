const ProductDetail = require('./sql-model.js');

const getById = (productCategoryId) => {
  return ProductDetail.findOne({
    where: {
      productCategoryId
    }
  })
}

const createProduct = (productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image) => {
  return ProductDetail.create({
    productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image
  });
}

const updateProduct = (productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image) => {
  return ProductDetail.update({
    where: {
      productCategoryId, productCategory, productName, price, brandName, onlineExclusive, reviewStarCount, reviewCount, colors, colorImages, fit, sizeStandard, sizePetite, sizePlus, sizesUnavailable, sizePetiteUnavailable, sizePlusUnavailable, image
    }
  });
}

const deleteProduct = (productCategoryId) => {
  return ProductDetail.destroy({
    where: {
      productCategoryId
    }
  });
}

module.exports = {
  getById,
  createProduct,
  updateProduct,
  deleteProduct
}