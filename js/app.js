'use strict';

var names = [];
var votes = [];
var totalVotes = 0;
var allUniqueImages =[];
var uniqueIndexArray =[];
var parentElement = document.getElementById('images');

if(localStorage.getItem('items')=== null){
  new UniqueImages('bathroom', '.jpg');
  new UniqueImages('breakfast', '.jpg');
  new UniqueImages('cthulhu', '.jpg');
  new UniqueImages('dog-duck', '.jpg');
  new UniqueImages('pen', '.jpg');
  new UniqueImages('sweep', '.png');
  new UniqueImages('pet-sweep', '.jpg');
  new UniqueImages('usb', '.gif');
  new UniqueImages('bubblegum', '.jpg');
  new UniqueImages('water-can', '.jpg');
  new UniqueImages('wine-glass', '.jpg');
  new UniqueImages('bag', '.jpg');
  new UniqueImages('banana', '.jpg');
  new UniqueImages('boots', '.jpg');
  new UniqueImages('chair', '.jpg');
  new UniqueImages('scissors', '.jpg');
  new UniqueImages('shark', '.jpg');
  new UniqueImages('tauntaun', '.jpg');
  new UniqueImages('dragon', '.jpg');
  new UniqueImages('unicorn', '.jpg');

} else {
  var localStorageItems = localStorage.getItem('items');
  var parseLocalStorageArray = JSON.parse(localStorageItems);
  console.log('this is my parsed array', parseLocalStorageArray);
}

function UniqueImages(name, extension){
  this.alt =name;
  this.votes =0;
  this.views =0;
  this.title =name;
  this.filePath = `img/${name}${extension}`;
  allUniqueImages.push(this);
}
UniqueImages.prototype.render = function(){
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.title = this.title;
  imageElement.alt = this.alt;
  parentElement.appendChild(imageElement);
};

function getRandomIndex(){
  var index = getRandomNumber(allUniqueImages.length);
  while(uniqueIndexArray.includes(index)){
    index = getRandomNumber(allUniqueImages.length);
  }
  uniqueIndexArray.push(index);

  if(uniqueIndexArray.length > 6){
    uniqueIndexArray.shift();
  }
  return index;
}

function getRandomNumber(max){
  return Math.floor(Math.random() * max);
}

function displayImage(){
  var index = getRandomIndex();
  allUniqueImages[index].render();
}

function handleClick(event){
  parentElement.textContent = '';
  var titleOfTheImageClickedOn = event.target.title;

  for(var i=0; i<allUniqueImages.length; i++){
    if(titleOfTheImageClickedOn === allUniqueImages[i].title){
      allUniqueImages[i].votes++;
      totalVotes++;

      if(totalVotes === 25){
        parentElement.removeEventListener('click', handleClick);
        makeNamesArray();
      }
    }
  }
  displayImage();
  displayImage();
  displayImage();
}
displayImage();
displayImage();
displayImage();

parentElement.addEventListener('click', handleClick);

function makeNamesArray(){
  for(var i=0; i<allUniqueImages.length; i++){
    names.push(allUniqueImages[i].title);
    votes.push(allUniqueImages[i].votes);
  }
  generateChart();
}

function generateChart(){
  var myChart = document.getElementById('myChart').getContext('2d');
  var Chart = new Chart(myChart, {
    type:'bar',
    data: {
      labels: ['Bag', 'Banana', 'Bathroom', 'Boots', 'Breakfast', 'Bubblegum', 'Chair', 'Cthulhu', 'Dog Duck', 'Dragon', 'Pen', 'Pet Sweep', 'Scissors', 'Shark', 'Sweep', 'Tauntaun', 'USB', 'Unicorn', 'Water Can', 'Wine Glass'],
      datasets: [{
        label: '# of Votes',
        data: [votes],
        backgroundColor: [
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
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
