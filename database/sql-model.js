const Sequelize = require('sequelize');
const db = require('./sql-index.js');

const ProductDetail = db.define('productdetail', {
  productCategoryId: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  productCategory: {
    type: Sequelize.STRING
  },
  productName: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.STRING
  },
  brandName: {
    type: Sequelize.STRING
  },
  onlineExclusive: {
    type: Sequelize.BOOLEAN
  },
  reviewStarCount: {
    type: Sequelize.STRING
  },
  reviewCount: {
    type: Sequelize.INTEGER
  },
  colors: {
    type: Sequelize.STRING
  },
  colorImages: {
    type: Sequelize.STRING
  },
  fit: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  sizeStandard: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  sizePetite: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  sizePlus: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
  },
  sizesUnavailable: {
    type: Sequelize.STRING
  },
  sizePetiteUnavailable: {
    type: Sequelize.STRING
  },
  sizePlusUnavailable: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.ARRAY(Sequelize.STRING),
    defaultValue: []
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