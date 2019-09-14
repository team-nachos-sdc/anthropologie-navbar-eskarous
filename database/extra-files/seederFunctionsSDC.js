//seeder functions for various parts
const {
  productCategories, 
  productBrandNames, 
  productSubcategories,
  productAdjectives,
  dressSkirtSize,
  dressSkirtSizePetite,
  dressSkirtSizePlus,
  pantsSize,
  pantsSizePetite,
  pantsSizePlus,
  reviewStarImages,
  colors,
  colorImageLinks,
  fit,
  beddingSize,
  designers,
  imageLinks
} = require('./seederMockDataSDC.js');

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
// //filter through file images and match with id
// const filterImageFolder = (imageArray, id) => {
//   let titleNumber = title.split('_')[0];
//   let storage = [];

//   for (var i = 0; i < imageArray.length; i++){
//     if (imageArray[i].indexOf(titleNumber) !== -1){
//       storage.push(array[i])
//     }
//   }
//   return storage;
// }
const assignCorrectImageLinks = () => {
  var randomIndex1 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex2 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex3 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  var randomIndex4 = Math.floor(Math.random() * Math.floor(imageLinks.length));
  return [imageLinks[randomIndex1], imageLinks[randomIndex2], imageLinks[randomIndex3], imageLinks[randomIndex4]];
}
const colorGrabber = (array, colorArray) => {
  //grab first from array
  var firstLink = array[0]

  var currentColor;

  for (var i = 0; i < colorArray.length; i++) {
    if (firstLink.indexOf(colorArray[i]) !== -1) {
      currentColor = colorArray[i]
    }
  }
  return currentColor;
  //split it and find the colors
}


module.exports = {
  generateProductNames,
  generateRandomValue,
  generateRandomNumber,
  getRandomArbitraryStarCount,
  assignCorrectImageLinks,
  colorGrabber
}