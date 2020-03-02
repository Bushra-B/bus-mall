'use strict';
//helper function
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
//global variables :
var productUrl = [
  'bag.jpg',
  'banana.jpg',
  'bathroom.jpg',
  'boots.jpg',
  'breakfast.jpg',
  'bubblegum.jpg',
  'chair.jpg',
  'cthulhu.jpg',
  'dog-duck.jpg',
  'dragon.jpg',
  'pen.jpg',
  'pet-sweep.jpg',
  'scissors.jpg',
  'shark.jpg',
  'sweep.png',
  'tauntaun.jpg',
  'unicorn.jpg',
  'usb.gif',
  'water-can.jpg',
  'wine-glass.jpg'
];
var products = []; //to store the objects (products) created by C.F
var numberClicks = 0; //to sotre # of clicks to keep track of them
var numberRounds = 0;
var roundImagesShown = [];
var leftSideImage = document.querySelector('#left-side-img');
var centerImage = document.querySelector('#center-img');
var rightSideImage = document.querySelector('#right-side-img');
var imagesSection = document.querySelector('#all-products');
//constructor function : to create products objects
function Product(url){
  this.imageUrl = `assets/${url}`;
  this.imageName = url.split('.' , 1)[0];
  products.push(this);
}
//functions :
function randomImage() {
  //to generate images randomly from products objects
  var leftImageRandom = products[randomNumber(0, products.length-1)];
  var centerImageRandom = products[randomNumber(0, products.length-1)];
  var rightImageRandom = products[randomNumber(0, products.length-1)];
  //to validate the uniqueness of the 3 random images
  while (leftImageRandom === centerImageRandom || leftImageRandom === rightImageRandom || centerImageRandom === rightImageRandom) {
    leftImageRandom = products[randomNumber(0, products.length-1)];
    centerImageRandom = products[randomNumber(0, products.length-1)];
    rightImageRandom = products[randomNumber(0, products.length-1)];
  }
  //to display the 3 random images to the user
  leftSideImage.setAttribute('src', leftImageRandom.imageUrl);
  leftSideImage.setAttribute('alt', leftImageRandom.imageName);
  centerImage.setAttribute('src', centerImageRandom.imageUrl);
  centerImage.setAttribute('alt', centerImageRandom.imageName);
  rightSideImage.setAttribute('src', rightImageRandom.imageUrl);
  rightSideImage.setAttribute('alt', rightImageRandom.imageName);
  roundImagesShown.push(leftSideImage);
  roundImagesShown.push(centerImage);
  roundImagesShown.push(rightSideImage);
}
//creating products objects using C.F :
for (var i=0; i < productUrl.length; i++){
  new Product(productUrl[i]);
}
//to display random images to useer at start :
randomImage();
numberRounds++;
//creating click event - activating click on images :
imagesSection.addEventListener('click', clicks);
function clicks(e){
  //to generate random images on click + store # of clicks
  if (e.target.id === 'left-side-img' || e.target.id === 'center-img' || e.target.id === 'right-side-img'){
    randomImage();
    numberClicks++;
    numberRounds++;
  }
  if (numberClicks === 27) {
    imagesSection.removeEventListener('click', clicks);
    leftSideImage.remove();
    centerImage.remove();
    rightSideImage.remove();
    console.log('finished');
  }
}
console.log(roundImagesShown);

