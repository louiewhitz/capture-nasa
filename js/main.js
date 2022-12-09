/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/* global nasa */
const navBar = document.querySelector('.nav-bar');
const navTab = document.querySelectorAll('.nav-tab');
const view = document.querySelectorAll('.view');
const viewContainer = document.querySelector('.view-container');
const allIcons = document.querySelectorAll('.all-icons');
const heartDiv = document.querySelector('.heart-div');
const $heart = document.querySelector('#heart-icon');
const todayQUrl = 'https://api.quotable.io/random';
const apiKey = 'FBXb07IIDEucETFgOd4i8dqsC9qxqeJqGru7sCKy';
const dateValue = {};
const form = document.querySelector('#date-form');
const day = document.querySelector('#day');
const month = document.querySelector('#month');
const year = document.querySelector('#year');
const iframe = document.querySelector('iframe');
const searchResultPage = document.querySelector('#search-result');
const startView = document.querySelector('[data-view=start-page]');
const resultView = document.querySelector('[data-view=search-result]');
const searchView = document.querySelector('[data-view=search-page]');
const favoritesView = document.querySelector('[data-view=favorites-page]');
const searchUl = document.querySelector('#search-ul');
const startDescription = document.querySelector('.start-description');
const dateh3 = document.querySelector('.dateh3');
const starTitle = document.querySelector('.startitle');
const startimage = document.querySelector('#start-image');

const heartClick = document.querySelector('object-fit');
form.addEventListener('submit', handleDate);
form.addEventListener('click', spin);
const link2 = document.querySelector('#link2');
const loader = document.querySelector('.loader');
const $searchBtn = document.querySelector('#searchBtn');

$searchBtn.addEventListener('click', spin);

link2.addEventListener('click', handleHeartSearchClick);

function handleHeartSearchClick(event) {
  console.log('handleheart event', event.target);
  const currentTitle = document.querySelector('.search-title');
  const currentDate = document.querySelector('.search-date');
  const currentSearchDescription = document.querySelector('.search-description');
  const newTitle = currentTitle.textContent;
  const newDate = currentDate.textContent;
  const newDescription = currentSearchDescription.textContent;
  const currentImg = document.querySelector('#search-image');
  const url = currentImg.getAttribute('src');
  const newImg = url;
  const newEntry = {
    title: newTitle,
    date: newDate,
    image: newImg,
    description: newDescription,
    entry: nasa.favId
  };
  saveImg(newEntry);
  viewSwap('favorites-page');
}

var link1 = document.getElementById('link1');
link1.addEventListener('click', handleStartHeartClick);
function handleStartHeartClick(event) {
  console.log('handleHeartSearchClick event', event.target);
  var curTitle = document.querySelector('.startitle');
  var newTitle = curTitle.textContent;
  var currentDescription = document.querySelector('.start-description');
  var newDescription = currentDescription.textContent;
  var curDate = document.querySelector('.dateh3');
  var newDate = curDate.textContent;
  var curImage = document.querySelector('#start-image');
  var imgUrl = curImage.getAttribute('src');
  var newEntry = {
    title: newTitle,
    date: newDate,
    description: newDescription,
    image: imgUrl,
    entry: nasa.favId
  };
  saveImg(newEntry);
}

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
  } else if (view === 'favorites-page') {
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

function getNasaImg(image) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    const title = xhr.response.title;
    const description = xhr.response.explanation;
    const imgUrl = xhr.response.url;
    const date = xhr.response.date;
    startDescription.textContent = description;
    starTitle.textContent = title;
    startimage.setAttribute('src', imgUrl);
    startimage.setAttribute('class', 'images');
    dateh3.textContent = date;
    const startEntry = {
      title,
      description,
      image: imgUrl,
      date,
      entry: nasa.startResult
    };
  });
  xhr.send();
}
getNasaImg(nasa);

function handleDate(event) {
  console.log('handleDate event target', event.target);
  event.preventDefault();

  const currentDay = day.value;
  const currentMonth = month.value;
  const currentYear = year.value;
  const searchDate = document.createElement('input');
  searchDate.type = 'date';
  searchDate.setAttribute(
    'value',
    `${currentYear}-${currentMonth}-${currentDay}`
  );
  searchDay(searchDate);
  form.reset();
}

const spinDiv = document.querySelector('.spin-div');
const myInterval = setTimeout(spin, 2000);
function clearSpin() {
  clearInterval(myInterval);
  spinDiv.className = 'spin-div hidden';
}
function spin(event) {
  spinDiv.className = 'spin-div';
  clearSpin();
}

function searchDay(time) {

  var xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    nasaBaseUrl + `&date=${year.value}-${month.value}-${day.value}`
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    var response = xhr.response;
    var description = response.explanation;
    var imgUrl = response.url;
    var title = response.title;
    var date = response.date;

    var searchImg = document.createElement('img');
    searchImg.setAttribute('src', imgUrl);
    var searchDescription = response.explanation;
    var searchValues = {
      title: response.title,
      date: response.date,
      description: response.explanation,
      image: imgUrl,

      searchResult: nasa.searchResult
    };
    nasa.searchResult++;
    renderSearch(searchValues);
  });
  xhr.send();

}

function saveImg(entry) {
  loader.className = 'loader';
  console.log('🚀 ~  loader', loader);
  console.log('saveImg entry', entry);
  nasa.favorites.unshift(entry);
  nasa.favId++;
  load(entry);
  viewSwap('favorites-page');
}

function load(entry) {

  console.log('load entry', entry);
  const newEntry = renderFavorites(entry);
  searchUl.prepend(newEntry);
  viewSwap('favorites-page');
}

window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  console.log('dom loaded', event);
  for (let i = 0; i < nasa.favorites.length; i++) {
    const previousEntry = renderFavorites(nasa.favorites[i]);
    searchUl.append(previousEntry);
  }
  console.log('searchUl', searchUl);

  viewSwap('favorites-page');
}

function todaysQuote(quote) {
  const xhr = new XMLHttpRequest();
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

function renderSearch(entry) {
  const title = entry.title;
  const img = entry.image;
  const description = entry.description;
  const date = entry.date;
  const searchImg = document.querySelector('#search-image');
  searchImg.setAttribute('src', img);
  const searchTitle = document.querySelector('.search-title');
  searchTitle.textContent = title;
  const searchDescription = document.querySelector('.search-description');
  const searchD = document.querySelector('.search-date');
  searchD.textContent = date;
  searchDescription.textContent = description;
  const responseObj = {
    title,
    description,
    image: img,
    date
  };
  viewSwap('search-result');
}

function renderFavorites(entry) {
  var newEntry = this.entry;
  var $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row justify-align-center');
  $listItem.setAttribute('entry', entry.entry);

  var $colFull1 = document.createElement('div');
  $colFull1.setAttribute('class', 'column-full justify-align-center');

  var $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'image-container justify-center');

  var $favImg = document.createElement('img');
  $favImg.setAttribute('src', entry.image);

  $favImg.setAttribute('class', 'images');

  // var $iframe = document.createElement('iframe');
  // $iframe.setAttribute('src', entry.image);
  // $iframe.style.width = '420px';
  // $iframe.style.height = '315px';
  // $iframe.setAttribute('class', 'hidden');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'justify-align-center row width');

  var $contentBox = document.createElement('div');
  $contentBox.setAttribute('class', 'content-box');

  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row space-around width');
  var $extraRow = document.createElement('div');
  $extraRow.setAttribute('class', 'row width justify-center');

  var $colFull = document.createElement('div');
  $colFull.setAttribute('class', 'column-full display-flex space-between');

  var $title = document.createElement('h1');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;

  var $date = document.createElement('h3');
  $date.setAttribute('class', 'dateh3');
  $date.textContent = entry.date;

  var $thirdRow = document.createElement('div');
  $thirdRow.setAttribute('class', 'row');

  var $secondColFull = document.createElement('div');
  $secondColFull.setAttribute('class', 'column-full');

  var $description = document.createElement('p');
  $description.setAttribute('class', 'description');
  $description.textContent = entry.description;

  var $thirdColFull = document.createElement('div');
  $thirdColFull.setAttribute('class', 'column-full justify-align-center');

  var $heartContainter = document.createElement('div');
  $heartContainter.setAttribute('class', 'heart');

  var $heartIcon = document.createElement('img');
  $heartIcon.setAttribute('src', 'images/heart (1).png');
  $heartIcon.setAttribute('alt', 'heart-icon');
  $heartIcon.setAttribute('class', 'object-fit hearts');

  var anchor = document.createElement('a');
  anchor.setAttribute('href', '#delete');
  anchor.setAttribute('class', 'delete');

  anchor.addEventListener('click', deleteFavorite);

  var $deleteIcon = document.createElement('i');
  $deleteIcon.setAttribute('class', 'fa-solid fa-trash-can');
  $deleteIcon.setAttribute('data-set', entry.entry);
  anchor.appendChild($deleteIcon);

  $listItem.appendChild($colFull1);
  $colFull1.appendChild($imgContainer);
  $imgContainer.appendChild($favImg);

  $listItem.appendChild($row);
  $row.appendChild($contentBox);
  $contentBox.appendChild($secondRow);
  $secondRow.appendChild($colFull);
  $colFull.append($title);
  $contentBox.appendChild($extraRow);

  $extraRow.appendChild($secondColFull);
  $secondColFull.appendChild($description);
  $secondColFull.appendChild($date);
  $extraRow.appendChild($thirdColFull);
  $thirdColFull.appendChild($heartContainter);
  $heartContainter.appendChild($heartIcon);
  $heartContainter.appendChild(anchor);
  return $listItem;
}

function deleteFavorite(e) {
  var $allLi = document.querySelectorAll('li');
  var icon = event.target;
  var activeIcon = icon.getAttribute('data-set');
  for (var z = 0; z < nasa.favorites.length; z++) {
    var allEntries = nasa.favorites[z];
    for (var i = 0; i < $allLi.length; i++) {
      var oneLi = $allLi[i];
      var activeLi = oneLi.getAttribute('entry');
      if (activeLi === activeIcon) {
        var newTarget = $allLi[i];
        if (nasa.favorites[z].entry === +newTarget.getAttribute('entry')) {
          newTarget.remove();
          nasa.favorites.splice(z, 1);
        }
      }
    }
  }
}
