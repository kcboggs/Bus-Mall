'use strict';

// var parent = document.getElementById('Images');

// image array
var allImages =[];

function UniqueImages(url, alt, title){
  this.alt =alt;
  this.title =title;
  this.filePath = url;
  this.votes =0;
  this.views =0;
  UniqueImages.push(this);
}

var image1 = new UniqueImages('img/bathroom.jpg', 'bathroom', 'bathroom');
var image2 = new UniqueImages('img/sweep.png', 'sweep', 'sweep');
var image3 = new UniqueImages('img/usb.gif', 'usb', 'usb');

// rendering random images to the DOM from an array of images
new UniqueImages('img/bathroom.jpg', 'bathroom', 'bathroom');
new UniqueImages('img/sweep.png', 'sweep', 'sweep');
new UniqueImages('img/usb.gif', 'usb', 'usb');


UniqueImages.prototype.images = function(){
  // create and element - use an img
  var imageElement =document.createElement('img');

  imageElement.setAttribute('src', this.bathroom);
  imageElement.setAttribute('alt', this.sweep);
  imageElement.setAttribute('title', this.usb);

  parent.appendChild(imageElement);
};

image1.appendImage();
image2.appendImage();
image3.appendChild();

// helper function will give a random number
function randomNumber(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getRandomImage(){
  parent.textContent = '';

  var randomIndex =randomNumber(0, allImages.length-1);
  var secondRandomIndex = randomNumber(0, allImages.length-1);

  while(randomIndex === secondRandomIndex){
    secondRandomIndex = randomNumber(0, allImages.length-1);
  }

  // object instance to call appendImage function
  allImages[randomIndex].appendImage();
  allImages[randomIndex].views++;

  allImages[secondRandomIndex].appendImage();
  allImages[secondRandomIndex].views++;
}
getRandomImage();

// event listener
parent.addEventListener('click', function(){
  var titleOfImageThatWasClickedOn = event.target.title;

  for(var i =0; i<allImages.length; i++){
    if(titleOfImageThatWasClickedOn === allImages[i].title){
      allImages[i].votes++;
    }
  }
  getRandomImage();
});
