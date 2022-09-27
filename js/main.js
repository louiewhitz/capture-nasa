/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/* global nasa */
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
var dateValue = {};
var form = document.querySelector('#date-form');
var day = document.querySelector('#day');
var month = document.querySelector('#month');
var year = document.querySelector('#year');
var response = {};

// var demokey = 'DEMO_KEY';
var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

var results = [];

// https://api.nasa.gov/planetary/apod?api_key=dEkS7Nd0bnEcjS4WEJ5h1RkyG0SPAtHAeqohZ7Dq

// addEventListener functions

$heart.addEventListener('click', saveImage);
form.addEventListener('submit', handleDate);

// navBar.addEventListener('click', handleNav);

// functions for event listeners
// function handleNav(event) {
//   if (!event.target.matches('.nav-tab')) {
//     return;
//   }
//   for (var i = 0; i < navTab.length; i++) {
//     var $activeTab = navTab[i];

//     if ($activeTab === event.target) {
//       $activeTab.className = 'nav-tab active';
//     } else {
//       $activeTab.className = 'nav-tab';

//     }

//   }
//   var viewName = event.target.getAttribute('data-view');
//   for (var j = 0; j < view.length; j++) {
//     if (view[j].getAttribute('data-view') !== viewName) {
//       view[j].className = 'view hidden';

//     } else {
//       view[j].className = 'view';
//     }
//   }
// }
function handleDate(event) {
  event.preventDefault();
  var currentDay = day.value;
  console.log('~ currentDay ', currentDay);

  var currentMonth = month.value;
  var currentYear = year.value;
  var searchDate = document.createElement('input');
  searchDate.type = 'date';
  console.log('~ searchDate', searchDate);
  searchDate.setAttribute('value', `${currentYear}-${currentMonth}-${currentDay}`);
  console.log('~ searchDate', searchDate);
  searchDay(searchDate);
}

function searchDay(time) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl + `&date=${year.value}-${month.value}-${day.value}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log(xhr.status);
    console.log(xhr.response);

    var searchImg = document.createElement('img');
    searchImg.setAttribute('src', xhr.response.url);
    var searchValues = {
      title: xhr.response.title,
      date: xhr.response.date,
      description: xhr.response.explanation,
      image: searchImg
    };
    console.log('search', searchValues);
  });
  xhr.send();
}

function saveImage(event) {
  console.log('nasa', nasa);
  if (event.target.className === 'object-fit') {
    console.log('clicked!');
    nasa.favorites.unshift(response);
    nasa.favId++;
    console.log('nasa in block', nasa);
  }
}

window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  var currentTitle = starTitle;
  var currentImage = image;
  var currentDate = date;
  var currentDescription = description;
  response.image = image;
  response.title = starTitle;
  response.description = description;
  response.date = date;
  console.log('response', response);
  saveImage();
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
    image.setAttribute('src', newImage);
    image.setAttribute('class', 'images');
    description.textContent = xhr.response.explanation;
    date.textContent = xhr.response.date;
    starTitle.textContent = xhr.response.title;
    response = xhr.response;
    console.log('response', xhr.response);
    console.log(xhr.status);
    var obj = {
      image: newImage,
      title: xhr.response.title,
      date: xhr.response.date,
      entry: nasa.nextEntryId
    };

    // ADD IF MEDIA_TYPE VIDEO
    nasa.nextEntryId++;
    nasa.results.push(obj);
    load(obj);
    console.log(obj);
  });
  xhr.send();
}

getImage(name);

function load(entry) {
  console.log(entry);
  // figure this out
}

function renderEntry(entry) {}
