/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/* global data */
// var navBar = document.querySelector('.nav-bar');
// var navTab = document.querySelectorAll('.nav-tab');
// var view = document.querySelectorAll('.view');

var starTitle = document.querySelector('#title');
var date = document.querySelector('#dateh3');
var image = document.querySelector('img');
var description = document.querySelector('.description');
var $heart = document.querySelector('#heart-icon');
var todayQUrl = 'https://api.quotable.io/random';
var apiKey = 'FBXb07IIDEucETFgOd4i8dqsC9qxqeJqGru7sCKy';
// var demokey = 'DEMO_KEY';
var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

var results = [];
var response = {

};

// https://api.nasa.gov/planetary/apod?api_key=dEkS7Nd0bnEcjS4WEJ5h1RkyG0SPAtHAeqohZ7Dq

// addEventListener functions

$heart.addEventListener('click', saveImage);

// functions for event listeners

function saveImage(event) {
  console.log(data);
  if (event.target.className === 'object-fit') {
    console.log('clicked!');
    var fav = response;
    console.log('~ fav', fav);
    data.favorites.push(fav);
    data.favId++;
  }
}

window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  console.log('ready');
  var currentTitle = this.starTitle;
  var currentImage = this.image;
  var currentDate = this.date;
  var currentDescription = this.description;
  response.title = currentTitle;
  response.description = currentDescription;
  response.date = currentDate;
  response.image = currentImage;
}

function todaysQuote(quote) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', todayQUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {

    if (xhr.status === 200) {
      var newQ = xhr.response.content;
      var author = xhr.response.author;
      var quote = document.querySelector('.quote');
      quote.textContent = newQ + ' - ' + author;
    }
  });
  xhr.send();
}
todaysQuote(name);
function getImage(person) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var newImage = xhr.response.url;
    console.log('~ newImage', newImage);
    image.setAttribute('src', newImage);
    image.setAttribute('class', 'images');
    description.textContent = xhr.response.explanation;
    date.textContent = xhr.response.date;
    starTitle.textContent = xhr.response.title;
    var obj = {
      image: newImage,
      title: xhr.response.title,
      date: xhr.response.date,
      entry: data.nextEntryId
    };
    data.nextEntryId++;
    results.push(obj);
    load(obj);
  });
  xhr.send();
}

getImage(name);

function load(entry) {
  console.log(entry);
  // figure this out
}

function renderEntry(entry) {}
