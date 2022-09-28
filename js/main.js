/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/* global nasa */
var navBar = document.querySelector('.nav-bar');
var navTab = document.querySelectorAll('.nav-tab');
var view = document.querySelectorAll('.view');
var viewContainer = document.querySelector('.view-container');
var searchHeart = document.querySelector('#search-heart');
var heartDiv = document.querySelector('.heart-div');

var starTitle = document.querySelector('.title');
var date = document.querySelector('.dateh3');
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
var iframe = document.querySelector('iframe');
var response = {};
var searchResultPage = document.querySelector('#search-result');

var startView = document.querySelector('[data-view=start-page]');
var resultView = document.querySelector('[data-view=search-result]');
var searchView = document.querySelector('[data-view=search-page]');
var favoritesView = document.querySelector('[data-view=favorites-page]');
var searchUl = document.querySelector('#search-ul');

$heart.addEventListener('click', saveImage);
form.addEventListener('submit', handleDate);

searchHeart.addEventListener('click', saveSearch);
var searchArr = [];

function viewSwap(view) {
  if (view === 'start-page') {
    startView.className = 'view';
    favoritesView.className = 'view hidden';
    searchView.className = 'view hidden';
    resultView.className = 'view hidden';
  } else if (view === 'search-page') {
    searchView.className = 'view';
    favoritesView.className = 'view hidden';
    startView.className = 'view hidden';
    resultView.className = 'view hidden';
  } else if (view === 'search-result') {
    startView.className = 'view hidden';
    favoritesView.className = 'view hidden';
    searchView.className = 'view hidden';
    resultView.className = 'view';
  } else if (view === 'favories-page') {
    startView.className = 'view hidden';
    favoritesView.className = 'view';
    searchView.className = 'view hidden';
    resultView.className = 'view hidden';
  }
}
navBar.addEventListener('click', handleNav);
function handleNav(event) {
  if (event.target.matches('.nav-tab')) {
    for (var i = 0; i < navTab.length; i++) {
      var activeNav = navTab[i];
      if (activeNav === event.target) {
        var dataSet = activeNav.getAttribute('data-set');
        var result = `${dataSet}`;
        viewSwap(result);
      }
    }
  }
}

var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

var results = [];

// https://api.nasa.gov/planetary/apod?api_key=dEkS7Nd0bnEcjS4WEJ5h1RkyG0SPAtHAeqohZ7Dq

// addEventListener functions

function handleDate(event) {
  event.preventDefault();
  var currentDay = day.value;
  var currentMonth = month.value;
  var currentYear = year.value;
  var searchDate = document.createElement('input');
  searchDate.type = 'date';
  searchDate.setAttribute('value', `${currentYear}-${currentMonth}-${currentDay}`);
  searchDay(searchDate);
  // this is where your calling the hxr request for date
  form.reset();
}

function searchDay(time) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl + `&date=${year.value}-${month.value}-${day.value}`);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var searchImg = document.createElement('img');
    searchImg.setAttribute('src', xhr.response.url);
    var searchValues = {
      title: xhr.response.title,
      date: xhr.response.date,
      description: xhr.response.explanation,
      image: searchImg
    };
    searchArr.push(searchValues);
    renderSearch(searchValues);
  });
  xhr.send();
}

function saveImage(event) {
  console.log('nasa', nasa);
  if (event.target.className === 'object-fit') {
    console.log('clicked!');
    nasa.favorites.unshift(response);
    nasa.favId++;
  }
}

window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  // var currentTitle = starTitle;
  // var currentImage = image;
  // var currentDate = date;
  // var currentDescription = description;
  // response.image = image;
  // response.title = starTitle;
  // response.description = description;
  // response.date = date;
  saveImage();
  console.log(renderSearch());
  for (var i = 0; i < nasa.favorites.length; i++) {
    console.log('nasa-favorites', nasa.favorites[i]);
  }
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
    if (xhr.status === 200) {
      // console.log('status', xhr.status);
      // console.log('result', xhr.response);
      if (xhr.response.media_type === 'video') {

        console.log(xhr.response.media_type);
        var vidUrl = xhr.response.url;
        iframe.setAttribute('src', vidUrl);

        iframe.style.width = '420px';
        iframe.style.height = '315px';
        iframe.className = 'view';

      } else {
        iframe.className = 'hidden';
      }
      var newImage = xhr.response.url;
      image.setAttribute('src', newImage);
      image.setAttribute('class', 'images');
      description.textContent = xhr.response.explanation;
      date.textContent = xhr.response.date;

      starTitle.textContent = xhr.response.title;
      response = xhr.response;
      console.log(xhr.status);
      var obj = {
        image: newImage,
        title: xhr.response.title,
        date: xhr.response.date,
        entry: nasa.nextEntryId
      };
      results.push(xhr.response);
      console.log(results);
      nasa.nextEntryId++;
      nasa.results.push(obj);
      load(obj);
    }
  });
  xhr.send();
}

getImage(name);

function load(entry) {
  console.log(entry);
  // figure this out
}

function renderSave(entry) {}
function removeLi() {
  if (view !== 'search-result') {
    searchUl.remove('li');
  }
}

function renderSearch(entry) {
  // saveImage();
  var li = document.createElement('li');
  var title = entry.title;
  var img = entry.image;
  console.log('~ img', img);
  var description = entry.description;
  var date = entry.date;
  var searchImg = document.createElement('img');
  var searchTitle = document.querySelector('.search-title');
  searchTitle.textContent = title;
  var searchDescription = document.querySelector('.search-description');
  var searchD = document.querySelector('.search-date');
  searchD.textContent = date;
  searchDescription.textContent = description;
  var newEntry = {
    title,
    image: img,
    description,
    date
  };
  console.log('~ title', newEntry);
  load(newEntry);
  viewSwap('search-result');
  // append the li
  li.append(img);
  searchUl.appendChild(li);
}

function saveSearch(event) {
  if (event.target.className === '.search-icon') {
    console.log('event.target', event.target);
  }
}
