'use strict';

var names = [];
var votes = [];
var totalVotes = 0;
var allUniqueImages =[];
// eslint-disable-next-line no-unused-vars
var uniqueIndexArray =[];
var parentElement = document.getElementById('images');

function UniqueImages(name, extension){
  this.alt =name;
  this.votes =0;
  this.views =0;
  this.title =name;
  this.filePath = `images/${name}${extension}`;
  allUniqueImages.push(this);
}
UniqueImages.prototype.render = function(){
  var imageElement = document.createElement('img');
  imageElement.src = this.filePath;
  imageElement.title = this.title;
  imageElement.alt = this.alt;
  parentElement.appendChild(imageElement);
};

new UniqueImages('bathroom', '.jpg');
new UniqueImages('breakfast', '.jpg');
new UniqueImages('cthulhu', '.jpg');
new UniqueImages('dog-duck', '.jpg');
new UniqueImages('pen', '.jpg');
new UniqueImages('sweep', '.png');

function getRandomImage(){
  var uniqueIndexArray = [];
  var index = getRandomNumber(UniqueImages.length);
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
  var index = getRandomImage();
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
  var ctx = document.getElementById('myChart').getContext('2d');
  var MyChart = new MyChart(ctx, {
    type:'bar',
    data: {
      labels: names,
      dataset: [{
        label: '# of Votes',
        data: votes,
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
          'rgba(255, 99, 132, 0.2)',
        ],
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
