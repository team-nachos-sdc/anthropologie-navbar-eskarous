const mongoose = require('mongoose');
const ProductDetail = require('../database/sql-model.js');
const fs = require('fs');
const { Parser } = require('json2csv');

//product categories
const productCategories = [
  'Dress', 'Skirt', 'Pants', 'Bedding'
]
const productBrandNames = [
  'Troubadour', 'Calypso', 'Luciana', 'Circe', 'Persephone', 
  'Selene', 'Astraea', 'Gaia'
]
//product subcategories
const productSubcategories = [
  'Maxi Dress', 'Midi Dress', 'Mini Dress', 'Maxi Jumpsuit', 'Sheath Dress', 
  'Pleated Dress', 'Midi Skirt', 'Maxi Skirt', 'Pencil Skirt', 'Mini Skirt', 'Wrap Skirt', 'Pants', 'Trousers', 'Joggers', 'Jeans', 'Jumpsuit', 'Overalls', 'Leggings', 'Quilt', 'Cover'
]
const productAdjectives = [
  'Floral', 'Embroidered', 'Watercolor', 'Knit', 'Printed', 'Wide-Leg', 'Flare', 'Cropped', 'Slim', 'Makers', 'Tufted', 'Velvet', 'Embellished', 'Silk', 'Textured', 'Woven', 'Washed', 'Embroidered', 'Linen', 'Relaxed'
]

const dressSkirtSize = [
  'XXS', 'XS', 'S', 'M', 'L', 'XL'
]
const dressSkirtSizePetite = [
  'XXS Petite', 'XS Petite', 'S Petite', 
  'M Petite', 'L Petite', 'XL Petite'
]
const dressSkirtSizePlus = [
  '1x', '2x', '3x'
]

const pantsSize = [
  '00', '0', '2', '4', '6', '8', '10', '12', '14', '16'
]
const pantsSizePetite = [
  '00 P', '0 P', '2 P', '4 P', '6 P', 
  '8 P', '10 P', '12 P', '14 P', '16 P'
]
const pantsSizePlus = [
  '16 W', '18 W', '20 W', '22 W', '24 W', '26 W'
]
const reviewStarImages = [
  '5 Star Image', '4.5 Star Image', '4 Star Image', '3.5 Star Image',
  '3 Star Image', '2.5 Star Image', '2 Star Image', '1.5 Star Image',
  '1 Star Image', '0.5 Star Image', '0 Star Image'
]
const colors = [
  'black', 'blue', 'brown', 'gray', 'green', 'pink', 'purple', 'red', 'white', 
  'yellow'
]

const colorImageLinks = [
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/black.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/blue.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/brown.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/gray.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/green.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/pink.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/purple.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/red.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/white.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/colors/yellow.jpeg'
]

const fit = [
  'Petite', 'Standard', 'Plus'
]

const beddingSize = [
  'Twin', 'Full', 'King', 'Queen', 'California King'
]

const designers = [
  'VeeVee', 'Emilio', 'Pacho', 'Farm Bill', 'Mike & Ike', 
  'JiJi', 'Denisse'
]

const imageLinks = [
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/100_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/100_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/100_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/100_blue_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_gray_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_gray_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_gray_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_gray_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_pink_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_pink_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_pink_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_pink_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/76_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_pink_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_pink_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_pink_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_pink_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/77_pink_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_gray_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_gray_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_gray_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/78_yellow_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/79_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/79_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/79_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/79_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/80_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/80_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/80_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/80_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/81_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/81_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/81_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_orange_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_orange_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_orange_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/82_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/83_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/83_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/83_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/83_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_gray_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_gray_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_gray_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_gray_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/84_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_orange_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_orange_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_orange_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/85_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/86_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/87_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/87_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/87_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/88_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/88_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/88_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/88_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/89_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/89_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/89_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/89_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_gray_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_gray_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_gray_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_gray_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/90_white_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_pink_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_pink_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_pink_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/91_pink_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_multi_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/93_multi_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/94_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/94_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/94_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/94_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/95_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/96_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/96_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/96_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/96_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/97_blue_.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/92_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/98_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/98_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/98_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/98_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/99_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/bedding/99_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/10_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/11_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/11_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/11_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_7.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/12_red_8.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_4.jpeg',  
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_7.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_8.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_9.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/13_green_10.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/14_brown_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/14_brown_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/14_brown_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/14_brown_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/14_brown_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/15_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/15_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/15_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/15_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/16_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/16_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/16_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/17_salmon_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/17_salmon_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/17_salmon_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/18_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/18_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/18_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/18_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/19_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/19_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/19_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/1_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/1_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/1_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/1_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/20_purple_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/20_purple_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/20_purple_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/21_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/21_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/21_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/21_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/22_yellow_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/23_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/23_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/23_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/24_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/24_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/24_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/24_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/25_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/25_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/25_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/2_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/2_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/2_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/2_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/3_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/3_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/3_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/3_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/4_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/4_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/4_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/4_yellow_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/3_yellow_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/5_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/5_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/5_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/5_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/6_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/6_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/6_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/7_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/7_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/7_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/7_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/8_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/8_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/8_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/8_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/9_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/9_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/9_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/dresses/9_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/52_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/52_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/52_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/52_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/53_blue_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/54_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/54_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/54_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/54_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/51_multi_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/56_pink_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/56_pink_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/56_pink_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/56_pink_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/57_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/57_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/57_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/57_yellow_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/58_purple_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/58_purple_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/58_purple_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/58_purple_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/59_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/59_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/59_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/59_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/60_multi_7.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_7.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/61_black_8.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/62_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/62_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/62_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/63_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/63_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/63_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/63_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/64_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/64_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/64_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/64_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/65_orange_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/65_orange_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/65_orange_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/65_orange_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/66_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/66_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/66_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/66_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/67_orange_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/67_orange_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/67_orange_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/67_orange_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/68_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/68_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/68_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/68_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/69_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/69_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/69_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/69_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/70_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/70_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/70_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/70_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/71_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/71_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/71_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/72_black_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/73_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/73_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/73_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/74_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/74_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/74_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/74_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/75_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/75_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/skirts/75_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_brown_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/26_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/27_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/27_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/27_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/27_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/27_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/28_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/28_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/28_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/28_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/29_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/29_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/29_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/29_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/29_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/30_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/30_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/30_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/30_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/31_yellow_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/31_yellow_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/31_yellow_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/31_yellow_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/31_yellow_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/32_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/32_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/32_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/33_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/33_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/33_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/33_blue_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_black_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/34_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/35_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/35_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/35_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/35_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_black_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_orange_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_orange_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_orange_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/36_orange_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/37_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_brown_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_brown_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_brown_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/38_brown_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/39_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/39_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/39_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/39_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/40_green_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/41_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/41_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/41_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/41_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/42_multi_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/42_multi_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/42_multi_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/42_multi_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/43_red_6.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/44_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/44_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/44_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/44_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/44_green_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_black_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_black_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_black_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_black_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/45_red_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/46_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/46_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/46_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/46_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/46_white_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/47_green_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/47_green_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/47_green_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/47_green_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/47_green_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/48_white_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/48_white_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/48_white_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/48_white_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/49_red_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/49_red_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/49_red_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/49_red_4.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/49_red_5.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/50_blue_1.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/50_blue_2.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/50_blue_3.jpeg',
  'https://sdc-anthropologie-main-product-eskarous.s3-us-west-1.amazonaws.com/pants/50_blue_4.jpeg'
]

const generateProductNames = (brandNames, adjectives, subcategory, min, max) => {
  let storage = [];
  var newBrandName;
  var newAdjective;
  var newSubcategory;
  for (var i = min; i < max; i++) {
    newBrandName = brandNames[Math.floor(Math.random() * brandNames.length)] + ' ';
    newAdjective = adjectives[Math.floor(Math.random() * adjectives.length)] + ' ';
    newSubcategory = subcategory[Math.floor(Math.random() * subcategory.length)];
    storage.push(newBrandName.concat(newAdjective, newSubcategory));
  }
  return storage;
}
//will generate random for online exclusive (or other arrays inputted in function)
const generateRandomValue = (array) => {
  return array[Math.floor(Math.random() * array.length)]
}
//random price generator/review count
const generateRandomNumber = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return String(Math.floor(Math.random() * (max - min + 1)) + min);
}
//random star count
const getRandomArbitraryStarCount = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(1);
}

const assignCorrectImageLinks = () => {
  var randomIndex1 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex2 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex3 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex4 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  return [imageLinks[randomIndex1], imageLinks[randomIndex2], imageLinks[randomIndex3], imageLinks[randomIndex4]];
}
// const colorGrabber = (array, colorArray) => {
//   //grab first from array
//   var firstLink = array[0]

//   var currentColor;

//   for (var i = 0; i < colorArray.length; i++) {
//     if (firstLink.indexOf(colorArray[i]) !== -1) {
//       currentColor = colorArray[i]
//     }
//   }
//   return currentColor;
//   //split it and find the colors
// }

getColor = () => {
  return colors[Math.floor(Math.random() * Math.floor(10))];
}

getColorImage = () => {
  return colorImageLinks[Math.floor(Math.random() * Math.floor(10))];
}

let productArr = generateProductNames(productBrandNames, productAdjectives, productSubcategories, 0, 249);

let storage = [];

const createRandomIndex = (array) => {
  return Math.floor(Math.random() * Math.floor(array.length));
}

const createProducts = () => {
  let document = {};
  for (var i = 1; i <= 1; i++){
    document.product_category_id = i;
    document.product_category = productCategories[createRandomIndex(productCategories)];
    document.product_name = productArr[i];
    document.price = generateRandomNumber(100, 399);
    document.brand_name = generateRandomValue(designers);
    document.online_exclusive = generateRandomValue([true, false]);
    document.review_star_count = getRandomArbitraryStarCount(1, 5);
    document.review_count = generateRandomNumber(5, 40);
    document.fit = fit;
    document.size_standard = dressSkirtSize;
    document.size_petite = dressSkirtSizePetite;
    document.size_plus = dressSkirtSizePlus;
    document.sizes_unavailable = generateRandomValue(dressSkirtSize);
    document.size_petite_unavailable = generateRandomValue(dressSkirtSizePetite);
    document.size_plus_unavailable = generateRandomValue(dressSkirtSizePlus);
    document.image = assignCorrectImageLinks();
    document.colors = getColor();
    document.color_images = getColorImage();
    storage.push(document);
    document = {};
  }
  return storage;
}

const products = createProducts();

const insertMockData = function() {
  ProductDetail.sync({ force: true })
  .then(() => {
    return ProductDetail.bulkCreate(products);
  });
};

insertMockData();

// write to file
// fs.writeFile(`${__dirname}/records/ten-records01.json`, JSON.stringify(products), (err) => {
//   if (err) {
//     console.log('Error occured, exiting...');
//     process.exit(-1);
//   }
//   console.log('Write successful, exiting...');
//   process.exit(0);
// });
