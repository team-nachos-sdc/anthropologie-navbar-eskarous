const Sequelize = require('sequelize');

const ProductDetails = sequelize.define('productdetail', {
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
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  colorImages: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  fit: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  sizeStandard: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  sizePetite: {
    type: Sequelize.ARRAY(Sequelize.STRING)
  },
  sizePlus: {
    type: Sequelize.ARRAY(Sequelize.STRING)
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
    type: Sequelize.ARRAY(Sequelize.STRING)
  }
}, {
  timestamps: false
});

ProductDetails.sync({ force: true });


module.exports = ProductDetails;