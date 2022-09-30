/* eslint-disable no-console */
/* eslint-disable no-unused-vars */

/* global nasa */
var navBar = document.querySelector('.nav-bar');
var navTab = document.querySelectorAll('.nav-tab');
var view = document.querySelectorAll('.view');
var viewContainer = document.querySelector('.view-container');
var allIcons = document.querySelectorAll('.all-icons');
console.log('~ allIcons ', allIcons);
var heartDiv = document.querySelector('.heart-div');

var $heart = document.querySelector('#heart-icon');
var todayQUrl = 'https://api.quotable.io/random';
var apiKey = 'FBXb07IIDEucETFgOd4i8dqsC9qxqeJqGru7sCKy';
var dateValue = {};
var form = document.querySelector('#date-form');
var day = document.querySelector('#day');
var month = document.querySelector('#month');
var year = document.querySelector('#year');
var iframe = document.querySelector('iframe');

var searchResultPage = document.querySelector('#search-result');

var startView = document.querySelector('[data-view=start-page]');
var resultView = document.querySelector('[data-view=search-result]');
var searchView = document.querySelector('[data-view=search-page]');
var favoritesView = document.querySelector('[data-view=favorites-page]');
var searchUl = document.querySelector('#search-ul');
var startDescription = document.querySelector('.start-description');
var dateh3 = document.querySelector('.dateh3');
var starTitle = document.querySelector('.startitle');
var startimage = document.querySelector('#start-image');
var heartClick = document.querySelector('object-fit');
form.addEventListener('submit', handleDate);
var link2 = document.querySelector('#link2');
link2.addEventListener('click', handleHeartSearchClick);
function handleHeartSearchClick(event) {

  var currentTitle = document.querySelector('.search-title');

  var currentDate = document.querySelector('.search-date');

  var currentSearchDescription = document.querySelector('.search-description');
  var newTitle = currentTitle.textContent;
  var newDate = currentDate.textContent;
  var newDescription = currentSearchDescription.textContent;

  var currentImg = document.querySelector('#search-image');

  var url = currentImg.getAttribute('src');
  var newImg = url;
  console.log('~ newImg', newImg);
  var newEntry = {
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
console.log(link1);
link1.addEventListener('click', handleStartHeartClick);
function handleStartHeartClick(event) {

  var curTitle = document.querySelector('.startitle');
  var newTitle = curTitle.textContent;
  var currentDescription = document.querySelector('.start-description');
  var newDescription = currentDescription.textContent;
  console.log('~ newDescription', newDescription);
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
      console.log('~ activeNav', activeNav);
      if (activeNav === event.target) {
        var dataSet = activeNav.getAttribute('data-set');
        console.log('~ dataSet', dataSet);
        var result = `${dataSet}`;
        console.log('~ result', result);
        viewSwap(result);
        console.log('~ viewSwap(result);', viewSwap(result));
      }
    }
  }
}

var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// https://api.nasa.gov/planetary/apod?api_key=dEkS7Nd0bnEcjS4WEJ5h1RkyG0SPAtHAeqohZ7Dq

// addEventListener functions
function getNasaImg(image) {
  var xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    console.log('nasaImgResponse: ' + xhr.response.title);
    var title = xhr.response.title;
    var description = xhr.response.explanation;
    var imgUrl = xhr.response.url;
    var date = xhr.response.date;
    startDescription.textContent = description;
    starTitle.textContent = title;
    startimage.setAttribute('src', imgUrl);
    startimage.setAttribute('class', 'images');
    dateh3.textContent = date;
    var startEntry = {
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
    console.log(xhr.response);

    var response = xhr.response;
    var description = response.explanation;
    console.log('~ description of response', description);
    var imgUrl = response.url;
    console.log('~ imgUrl', imgUrl);
    var title = response.title;
    var date = response.date;

    var searchImg = document.createElement('img');

    searchImg.setAttribute('src', imgUrl);
    // var title = xhr.responseEntry.title;
    console.log('~ title ', title);
    var searchDescription = response.explanation;
    console.log('~ searchDescription', searchDescription);

    var searchValues = {
      title: response.title,
      date: response.date,
      description: response.explanation,
      image: imgUrl,
      searchResult: nasa.searchResult
    };
    nasa.searchResult++;

    renderSearch(searchValues); // maybe switch back to responseEntry obj
  });
  xhr.send();
}

function saveImg(entry) {
  console.log('saveImg', entry);
  nasa.favorites.unshift(entry);
  nasa.favId++;
  load(entry);
  viewSwap('favorites-page');
}

function load(entry) {
  console.log('load entry', entry);
  var newEntry = renderFavorites(entry);
  console.log('~ newEntry', newEntry);
  searchUl.prepend(newEntry);
  viewSwap('favorites-page');

  // figure this out
}

window.addEventListener('DOMContentLoaded', DOMloaded);

function DOMloaded() {
  for (var i = 0; i < nasa.favorites.length; i++) {
    var previousEntry = renderFavorites(nasa.favorites[i]);
    console.log('previus entry', previousEntry);
    searchUl.append(previousEntry);
    console.log('nasa-favorites', nasa.favorites[i]);
  }
  viewSwap('favorites-page');
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

function renderSearch(entry) {
  console.log('renderSearch entry: ' + entry);
  var title = entry.title;
  var img = entry.image;
  var description = entry.description;
  var date = entry.date;
  var searchImg = document.querySelector('#search-image');

  searchImg.setAttribute('src', img);

  var searchTitle = document.querySelector('.search-title');
  searchTitle.textContent = title;
  var searchDescription = document.querySelector('.search-description');
  var searchD = document.querySelector('.search-date');

  searchD.textContent = date;

  searchDescription.textContent = description;

  console.log('~ searchDescription', searchDescription);

  var responseObj = {

    title,
    description,
    image: img,
    date
  };

  viewSwap('search-result');

}

function renderFavorites(entry) {
  console.log('renderFavorites', entry);
  var newEntry = this.entry;
  console.log('~ newEntry', newEntry);

  var $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row justify-align-center');

  var $colFull1 = document.createElement('div');
  $colFull1.setAttribute('class', 'column-full justify-align-center');

  var $imgContainer = document.createElement('div');
  $imgContainer.setAttribute('class', 'image-container justify-center');
  // $imgContainer.setAttribute('class', 'justify-center');
  // $listitem append image & frame
  // if (entry.image.)
  var $favImg = document.createElement('img');
  // if (entry.image === undefined) {
  //   $favImg.setAttribute('src', entry.url);
  // } else if (entry.image.media_type === 'video') {
  //   var $iframe = document.createElement('iframe');
  //   $iframe.setAttribute('src', entry.image);
  //   $iframe.style.width = '420px';
  //   $iframe.style.height = '315px';
  //   $iframe.setAttribute('class', 'view');
  //   $imgContainer.appendChild($iframe);

  // } else {
  $favImg.setAttribute('src', entry.image);
  // }

  $favImg.setAttribute('class', 'images');

  console.log('fav', $favImg);

  // var $iframe = document.createElement('iframe');
  // $iframe.setAttribute('src', entry.image);
  // $iframe.style.width = '420px';
  // $iframe.style.height = '315px';
  // $iframe.setAttribute('class', 'hidden');

  var $row = document.createElement('div');
  $row.setAttribute('class', 'justify-align-center row width');

  var $contentBox = document.createElement('div');
  $contentBox.setAttribute('class', 'content-box');
  // content append second row
  var $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row space-around width');
  var $extraRow = document.createElement('div');
  $extraRow.setAttribute('class', 'row width justify-center');

  var $colFull = document.createElement('div');
  $colFull.setAttribute('class', 'column-full display-flex space-around');
  // $colFull.setAttribute('class', 'display-flex');
  // $colFull.setAttribute('class', 'space-around');

  var $title = document.createElement('h1');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;
  console.log('~ $title', $title);

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
  // $thirdColFull.setAttribute('class', 'justify-center');

  var $heartContainter = document.createElement('div');
  $heartContainter.setAttribute('class', 'heart');

  var $heartIcon = document.createElement('img');
  $heartIcon.setAttribute('src', 'images/heart (1).png');
  $heartIcon.setAttribute('alt', 'heart-icon');
  $heartIcon.setAttribute('class', 'object-fit hearts');

  $listItem.appendChild($colFull1);
  $colFull1.appendChild($imgContainer);
  $imgContainer.appendChild($favImg);
  // $imgContainer.appendChild($iframe);
  $listItem.appendChild($row);
  $row.appendChild($contentBox); // may need to add justify align here
  $contentBox.appendChild($secondRow);
  $secondRow.appendChild($colFull);
  $colFull.append($title, $date);
  $contentBox.appendChild($extraRow);

  $extraRow.appendChild($secondColFull);
  $secondColFull.appendChild($description);
  $extraRow.appendChild($thirdColFull);
  $thirdColFull.appendChild($heartContainter);
  $heartContainter.appendChild($heartIcon);
  return $listItem;
}
//       <img src="images/nasa.jpeg" alt="" class="images" />
//     </div>
//     <iframe class="hidden"></iframe>
//   </div>
// </div>
// <div class="row justify-align-center">
//   <div class="content-box">
//     <div class="row">
//       <div class="column-full display-flex space-around">
//         <h1 class="title">Title of stars</h1>
//         <h3 class="dateh3">DATE: 01/01/2022</h3>
//       </div>
//       <div class="row">
//         <div class="column-full">
//           <p class="description">
//           </p>
//         </div>
//         <div class="column-full justify-center">
//           <div class="heart">
//             <img
//               src="images/heart (1).png"
//               alt="heart-icon"
//               class="object-fit"
//               id="heart-icon"
//             />
