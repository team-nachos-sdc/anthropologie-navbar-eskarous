const ProductDetail = require('./sql-model.js');

const getById = (id) => {
  return ProductDetail.findOne({
    where: {
      id
    }
  })
}

const createProduct = (product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image) => {
  return ProductDetail.create({
    product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image
  });
}

const updateProduct = (id, product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image) => {
  return ProductDetail.update({ product_category, product_name, price, brand_name, online_exclusive, review_star_count, review_count, colors, color_images, fit, size_standard, size_petite, size_plus, sizes_unavailable, size_petite_unavailable, size_plus_unavailable, image }, {
    where: {
      id
    }
  });
}

const deleteProduct = (id) => {
  return ProductDetail.destroy({
    where: {
      id
    }
  });
}

module.exports = {
  getById,
  createProduct,
  updateProduct,
  deleteProduct
}