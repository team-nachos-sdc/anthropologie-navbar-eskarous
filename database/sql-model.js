const Sequelize = require('sequelize');
const db = require('./sql-index.js');

const ProductDetail = db.define('productdetail', {
  product_category_id: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  product_category: {
    type: Sequelize.STRING(120)
  },
  product_name: {
    type: Sequelize.STRING(120)
  },
  price: {
    type: Sequelize.STRING(120)
  },
  brand_name: {
    type: Sequelize.STRING(120)
  },
  online_exclusive: {
    type: Sequelize.BOOLEAN
  },
  review_star_count: {
    type: Sequelize.STRING(120)
  },
  review_count: {
    type: Sequelize.INTEGER
  },
  fit: {
    type: Sequelize.STRING(120)
  },
  size_standard: {
    type: Sequelize.Sequelize.STRING(120)
  },
  size_petite: {
    type: Sequelize.Sequelize.STRING(120)
  },
  size_plus: {
    type: Sequelize.Sequelize.STRING(120)
  },
  sizes_unavailable: {
    type: Sequelize.STRING(120)
  },
  size_petite_unavailable: {
    type: Sequelize.STRING(120)
  },
  size_plus_unavailable: {
    type: Sequelize.STRING(120)
  },
  image: {
    type: Sequelize.STRING(550)
  },
  colors: {
    type: Sequelize.STRING(120)
  },
  color_images: {
    type: Sequelize.STRING(120)
  }
}, {
  timestamps: false
});

ProductDetail.sync();

// ProductDetail.sync({ force: true })
//   .then(() => {
//     return ProductDetail.create({
//     productCategoryId: 1,
//     productCategory: "Skirt",
//     productName: "Troubadour Velvet Leggings",
//     price: "277",
//     brandName: "Emilio",
//     onlineExclusive: true,
//     reviewStarCount: "1.0",
//     reviewCount: 30,
//     colors: [
//       "blue"
//     ],
//     colorImages: [
//         "https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/green.jpeg"
//     ],
//     fit: [
//         "Petite",
//         "Standard",
//         "Plus"
//     ],
//     sizeStandard: [
//         "XXS",
//         "XS",
//         "S",
//         "M",
//         "L",
//         "XL"
//     ],
//     sizePetite: [
//         "XXS Petite",
//         "XS Petite",
//         "S Petite",
//         "M Petite",
//         "L Petite",
//         "XL Petite"
//     ],
//     sizePlus: [
//         "1x",
//         "2x",
//         "3x"
//     ],
//     sizesUnavailable: "XL",
//     sizePetiteUnavailable: "L Petite",
//     sizePlusUnavailable: "2x",
//     image: [
//         "https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/89_blue_4.jpeg",
//         "https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_4.jpeg",
//         "https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_yellow_3.jpeg",
//         "https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/64_multi_4.jpeg"
//   ]
//   })
//   .catch(err => {console.log(err)})
// });


module.exports = ProductDetail;