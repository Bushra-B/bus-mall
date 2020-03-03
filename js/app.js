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
var leftSideImage = document.querySelector('#left-side-img');
var centerImage = document.querySelector('#center-img');
var rightSideImage = document.querySelector('#right-side-img');
var imagesSection = document.querySelector('#all-products');
var leftImageRandom, centerImageRandom, rightImageRandom;
var totalClicks = 0;
var rounds = document.getElementById('rounds');
var numberRounds =0;
//constructor function : to create products objects
function Product(url) {
  this.imageUrl = `assets/${url}`;
  this.imageName = url.split('.')[0];
  products.push(this);
  this.numberClicks = 0; //to sotre # of clicks to keep track of them
  this.numberViews = 0; //to sotre # of views to keep track of them
}
//functions :
function randomImage() {
  leftImageRandom = products[randomNumber(0, products.length - 1)];
  centerImageRandom = products[randomNumber(0, products.length - 1)];
  rightImageRandom = products[randomNumber(0, products.length - 1)];
  //to generate images randomly from products objects
  //   console.log(centerImageRandom);
  //to validate the uniqueness of the 3 random images
  while (leftImageRandom === centerImageRandom || leftImageRandom === rightImageRandom || centerImageRandom === rightImageRandom) {
    leftImageRandom = products[randomNumber(0, products.length - 1)];
    centerImageRandom = products[randomNumber(0, products.length - 1)];
    rightImageRandom = products[randomNumber(0, products.length - 1)];
  }
  //to display the 3 random images to the user
  leftSideImage.setAttribute('src', leftImageRandom.imageUrl);
  leftSideImage.setAttribute('alt', leftImageRandom.imageName);
  leftImageRandom.numberViews++;
  centerImage.setAttribute('src', centerImageRandom.imageUrl);
  centerImage.setAttribute('alt', centerImageRandom.imageName);
  centerImageRandom.numberViews++;
  rightSideImage.setAttribute('src', rightImageRandom.imageUrl);
  rightSideImage.setAttribute('alt', rightImageRandom.imageName);
  rightImageRandom.numberViews++;
}

//creating products objects using C.F :
for (var i = 0; i < productUrl.length; i++) {
  new Product(productUrl[i]);
}
//to display random images to useer at start :
randomImage();
numberRounds++;
rounds.textContent = ('Round number :' + numberRounds);
//creating click event - activating click on images :
imagesSection.addEventListener('click', clicks);
function clicks(e) {
  //to generate random images on click + store # of clicks
  if (e.target.id === 'left-side-img') {
    leftImageRandom.numberClicks++;
    totalClicks++,
    randomImage();
    numberRounds++;
  }

  if (e.target.id === 'center-img') {
    centerImageRandom.numberClicks++;
    totalClicks++;
    randomImage();
    numberRounds++;
  }
  if (e.target.id === 'right-side-img') {
    rightImageRandom.numberClicks++;
    totalClicks++;
    randomImage();
    numberRounds++;
  }
  rounds.textContent = ('Round number :' + numberRounds);
  if (totalClicks === 25) {
    imagesSection.removeEventListener('click', clicks);
    leftSideImage.remove();
    centerImage.remove();
    rightSideImage.remove();
    rounds.textContent = ('');
    var finalReport = document.getElementById('finalReport');
    finalReport.textContent = 'Thank you for taking the time to do the voting, here is your voting results :';
    var report = document.getElementById('report');
    for (var j =0; j< products.length; j++){
      var reportList = document.createElement('li');
      reportList.textContent = `${products[j].imageName} had ${products[j].numberClicks} votes and was shown ${products[j].numberViews} times`;
      report.appendChild(reportList);
    }
    renderChart();
  }
}
//create chart function :
function renderChart(){
  var productsNames = [];
  var productsClicks = [];
  var productsViews =[];
  for(var i = 0 ; i < products.length ; i++){
    var productName = products[i].imageName;
    productsNames.push(productName);
    var productLikes = products[i].numberClicks;
    productsClicks.push(productLikes);
    var productView = products[i].numberViews;
    productsViews.push(productView);
  }
  // console.log(productLikes);
  var ctx = document.getElementById('chart').getContext('2d');
  var chart = new Chart(ctx, {
    type: 'bar',
    data: {
      labels: productsNames,
      datasets: [{
        label: '# of Votes',
        data: productsClicks,
      }, {
        label: '# of Views',
        data: productsViews,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true
          }
        }]
      }
    }
  });
}

