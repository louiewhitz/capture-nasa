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
const $iframe = document.querySelector('iframe');
const searchImg = document.querySelector('#search-image');
const checkVid = document.querySelector('.check-vid');

const heartClick = document.querySelector('object-fit');
form.addEventListener('submit', handleDate);

const link2 = document.querySelector('#link2');
const loader = document.querySelector('.loader');
const $searchBtn = document.querySelector('#searchBtn');

link2.addEventListener('click', handleHeartSearchClick);

function handleHeartSearchClick(event) {

  const currentTitle = document.querySelector('.search-title');
  const currentDate = document.querySelector('.search-date');
  const currentSearchDescription = document.querySelector('.search-description');
  const newTitle = currentTitle.textContent;
  const newDate = currentDate.textContent;
  const newDescription = currentSearchDescription.textContent;
  const currentImg = document.querySelector('#search-image');
  const url = currentImg.getAttribute('src');
  const vidUrl = document.querySelector('#searchVid');
  const vidSrc = vidUrl.getAttribute('src');
  console.log('🚀 ~ vidSrc', vidSrc);
  let media = currentImg.getAttribute('data-version');
  console.log('🚀 ~ media', media);
  if (media === 'image') {
    media = 'image';
  } else if (media === 'video') {
    media = 'video';
  }

  console.log('🚀 ~ media', media);
  console.log('🚀 ~ url', url);
  const newImg = url;
  console.log('🚀 ~ newImg', newImg);
  const newEntry = {
    title: newTitle,
    date: newDate,
    image: newImg,
    description: newDescription,
    entry: nasa.favId,
    media
  };
  saveImg(newEntry);
  viewSwap('favorites-page');
}

const link1 = document.getElementById('link1');
link1.addEventListener('click', handleStartHeartClick);
function handleStartHeartClick(event) {

  const curTitle = document.querySelector('.startitle');
  const newTitle = curTitle.textContent;
  const currentDescription = document.querySelector('.start-description');
  const newDescription = currentDescription.textContent;
  const curDate = document.querySelector('.dateh3');
  const newDate = curDate.textContent;
  const curImage = document.querySelector('#start-image');
  const imgUrl = curImage.getAttribute('src');
  const vidUrl = document.querySelector('#vid-frame');
  const vidSrc = vidUrl.getAttribute('src');
  console.log('🚀 ~ vidSrc', vidSrc);
  const vidData = vidUrl.getAttribute('data-version');
  console.log('🚀 ~ vidData', vidData);

  let media = curImage.getAttribute('data-version');
  if (media === 'image') {
    media = 'image';
  } else if (media === 'video') {
    media = 'video';
  }

  console.log('🚀 ~ imgUrl', imgUrl);

  console.log('🚀 ~ media in like button', media);
  const newEntry = {
    title: newTitle,
    date: newDate,
    description: newDescription,
    image: imgUrl,

    entry: nasa.favId,
    media
  };
  console.log('new entry', newEntry);
  saveImg(newEntry);
}
const errorPage = document.querySelector('[data-view=error-page]');
function viewSwap(view) {
  if (view === 'start-page') {
    startView.className = 'view';
    favoritesView.className = 'view hidden';
    searchView.className = 'view hidden';
    resultView.className = 'view hidden';
    errorPage.className = 'view hidden';
  } else if (view === 'search-page') {
    searchView.className = 'view';
    favoritesView.className = 'view hidden';
    startView.className = 'view hidden';
    resultView.className = 'view hidden';
    errorPage.className = 'view hidden';
  } else if (view === 'search-result') {
    startView.className = 'view hidden';
    favoritesView.className = 'view hidden';
    searchView.className = 'view hidden';
    resultView.className = 'view';
    errorPage.className = 'view hidden';
  } else if (view === 'favorites-page') {
    startView.className = 'view hidden';
    favoritesView.className = 'view';
    searchView.className = 'view hidden';
    resultView.className = 'view hidden';
    errorPage.className = 'view hidden';
  } else if (view === 'error-page') {
    searchView.className = 'view hidden';
    startView.className = 'view hidden';
    resultView.className = 'view hidden';
    favoritesView.className = 'view hidden';
    errorPage.className = 'view';

  }
}

navBar.addEventListener('click', handleNav);
function handleNav(event) {
  if (event.target.matches('.nav-tab')) {
    for (let i = 0; i < navTab.length; i++) {
      const activeNav = navTab[i];
      if (activeNav === event.target) {
        const dataSet = activeNav.getAttribute('data-set');
        const result = `${dataSet}`;
        viewSwap(result);
      }
    }
  }
}

var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

const startVid = document.querySelector('.video');
const videoFrame = document.querySelector('#vid-frame');
const startImg = document.querySelector('#start-image');

function getNasaImg(image) {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', nasaBaseUrl);
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 400) {

      const responseErr = xhr.response.msg;
      console.log('🚀 ~ responseErr', responseErr);
      const errorMsg = document.querySelector('.err-msg');
      errorMsg.textContent = `Sorry, here is the error message from Nasa: '${responseErr}'`;
      viewSwap('error-page');
    } else if (xhr.status === 200) {
      const response = xhr.response;
      const title = xhr.response.title;
      const description = xhr.response.explanation;
      const imgUrl = xhr.response.url;
      console.log('🚀 ~ imgUrl', imgUrl);
      const date = xhr.response.date;
      let media = xhr.response.media_type;
      console.log('🚀 ~ media in get nasa ', media);
      const vidFrame = document.createElement('iframe');
      vidFrame.setAttribute('data-version', 'video');
      vidFrame.className = 'vid hidden';

      if (media === 'video') {
        videoFrame.setAttribute('src', imgUrl);
        videoFrame.className = 'vid';
        startimage.className = 'hidden';
        videoFrame.setAttribute('data-version', 'video');
        media = 'video';

      } else if (media === 'image') {
        videoFrame.className = 'vid hidden';
        media = 'image';

        startimage.setAttribute('src', imgUrl);
        startimage.setAttribute('class', 'images');
        startimage.setAttribute('data-version', 'image');
      }
      startDescription.textContent = description;
      starTitle.textContent = title;
      dateh3.textContent = date;

      console.log(xhr.response);
      const startEntry = {
        response,

        title,
        description,
        image: imgUrl,
        date,
        media,
        entry: nasa.startResult
      };
      console.log('🚀 ~ startEntry ', startEntry);
    }
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

const spinDiv = document.querySelector('#spin-div');

function displayLoading() {
  spinDiv.classList.add('view');
  setTimeout(() => {
    spinDiv.classList.remove('view');
  }, 1000);
}

function hideLoading() {
  spinDiv.classList.remove('view');
}

function searchDay(time) {
  displayLoading();

  const xhr = new XMLHttpRequest();
  xhr.open(
    'GET',
    nasaBaseUrl + `&date=${year.value}-${month.value}-${day.value}`
  );
  xhr.responseType = 'json';
  xhr.addEventListener('load', function () {
    if (xhr.status === 400 || xhr.status === 404) {
      const responseErr = xhr.response.msg;
      const errorMsg = document.querySelector('.err-msg');
      errorMsg.textContent = `Sorry, here is the error message from Nasa: '${responseErr}'`;
      viewSwap('error-page');

    } else if (xhr.status === 200) {

      const response = xhr.response;
      console.log('🚀 ~ response', response);
      const description = response.explanation;
      const imgUrl = response.url;
      const media = response.media_type;

      console.log('🚀 ~ media in search xhr', media);
      // imgUrl.setAttribute('data-version', media);

      const title = response.title;
      const date = response.date;
      console.log('🚀 ~ media', media);
      const searchDescription = response.explanation;
      const searchValues = {
        title: response.title,
        date: response.date,
        description: response.explanation,
        image: imgUrl,
        media,

        searchResult: nasa.searchResult
      };
      console.log('🚀 ~ searchValues ', searchValues);

      console.log(searchValues);
      nasa.searchResult++;
      renderSearch(searchValues);

    }
  });
  xhr.send();

}

function saveImg(entry) {
  console.log('🚀 ~ entry in SAVE IMAGE', entry);

  nasa.favorites.unshift(entry);
  nasa.favId++;
  load(entry);
  console.log('save image in entry', entry);
  viewSwap('favorites-page');
}

function load(entry) {
  console.log('🚀 ~ entry in load entry', entry);
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
  console.log('render search entry', entry);
  const media = entry.media;
  console.log('🚀 ~ media ', media);

  const title = entry.title;
  console.log('🚀 ~ title', title);
  const img = entry.image;
  console.log('🚀 ~ img', img);

  const description = entry.description;
  const date = entry.date;
  if (media === 'video') {
    searchImg.className = 'hidden';

    $iframe.setAttribute('src', img);
    $iframe.className = 'vid';
    $iframe.setAttribute('data-version', 'video');

    checkVid.appendChild($iframe);

  } else if (media === 'image') {

    searchImg.setAttribute('src', img);
    $iframe.className = 'hidden';

    searchImg.className = 'images';
    searchImg.setAttribute('src', img);
    searchImg.setAttribute('data-version', 'image');
    checkVid.appendChild(searchImg);

  }

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
    date,
    media
  };
  console.log('response Object in search', responseObj);
  viewSwap('search-result');
}

function renderFavorites(entry) {
  console.log('🚀 ~ entry', entry);
  console.log('favorites IMG', entry.image);
  // const image = entry.image;
  // const version = image.getAttribute('data-version');
  // console.log('🚀 ~ version', version);
  console.log('entry midea IN FAV', entry.media);
  //  const version = entry.image.getAttribute('data-version');
  // console.log('🚀 ~ version', version);
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'row justify-align-center');
  $listItem.setAttribute('entry', entry.entry);
  console.log('🚀 ~ entry.entry', entry.entry);

  const $colFull1 = document.createElement('div');
  $colFull1.setAttribute('class', 'column-full justify-align-center');
  const $favVideo = document.createElement('iframe');
  const $imgContainer = document.createElement('div');
  const searchImg = document.createElement('img');
  $imgContainer.setAttribute('class', 'image-container justify-center check-vid');
  if (entry.media === 'image') {
    console.log('this is an image');
    searchImg.setAttribute('src', entry.image);
    searchImg.setAttribute('data-version', 'image');
    searchImg.className = 'images';
    $iframe.className = 'vid hidden';
    $imgContainer.appendChild(searchImg);

  } else if (entry.media === 'video') {

    $favVideo.className = 'vid';
    $favVideo.setAttribute('src', entry.image);
    $favVideo.setAttribute('data-version', 'video');
    searchImg.className = 'hidden';
    $imgContainer.appendChild($favVideo);
    console.log('🚀 ~ $favVideo', $favVideo);

  }
  // const $favVideo = document.createElement('IFRAME');
  // $favVideo.className = 'images';
  // $favVideo.setAttribute('src', entry.image);
  // console.log('🚀 ~ $favVideo', $favVideo);

  // const $favImg = document.createElement('IFRAME');
  // $favImg.setAttribute('src', entry.image);
  // console.log('🚀 ~ $favImg', $favImg);

  // $favImg.setAttribute('class', 'images');
  //  if (entry.media === 'video') {
  //   searchImg.className = 'hidden';

  //   $iframe.setAttribute('src', img);
  //   $iframe.className = 'images';

  //   checkVid.appendChild($iframe);

  // } else if (media === 'image') {

  //   searchImg.setAttribute('src', img);
  //   $iframe.className = 'hidden';

  //   searchImg.className = 'images';
  //   searchImg.setAttribute('src', img);

  // }

  // const $iframe = document.createElement('iframe');
  // $iframe.setAttribute('src', entry.image);
  // $iframe.style.width = '420px';
  // $iframe.style.height = '315px';
  // $iframe.setAttribute('class', 'hidden');

  const $row = document.createElement('div');
  $row.setAttribute('class', 'justify-align-center row width');

  const $contentBox = document.createElement('div');
  $contentBox.setAttribute('class', 'content-box');

  const $secondRow = document.createElement('div');
  $secondRow.setAttribute('class', 'row space-around width');
  const $extraRow = document.createElement('div');
  $extraRow.setAttribute('class', 'row width justify-center');

  const $colFull = document.createElement('div');
  $colFull.setAttribute('class', 'column-full display-flex space-between');

  const $title = document.createElement('h1');
  $title.setAttribute('class', 'title');
  $title.textContent = entry.title;

  const $date = document.createElement('h3');
  $date.setAttribute('class', 'dateh3');
  $date.textContent = entry.date;

  const $thirdRow = document.createElement('div');
  $thirdRow.setAttribute('class', 'row');

  const $secondColFull = document.createElement('div');
  $secondColFull.setAttribute('class', 'column-full');

  const $description = document.createElement('p');
  $description.setAttribute('class', 'description');
  $description.textContent = entry.description;

  const $thirdColFull = document.createElement('div');
  $thirdColFull.setAttribute('class', 'column-full justify-align-center');

  const $heartContainter = document.createElement('div');
  $heartContainter.setAttribute('class', 'heart');

  const $heartIcon = document.createElement('img');
  $heartIcon.setAttribute('src', 'images/heart (1).png');
  $heartIcon.setAttribute('alt', 'heart-icon');
  $heartIcon.setAttribute('class', 'object-fit hearts');

  const anchor = document.createElement('a');
  anchor.setAttribute('href', '#delete');
  anchor.setAttribute('class', 'delete');

  anchor.addEventListener('click', deleteFavorite);

  const $deleteIcon = document.createElement('i');
  $deleteIcon.setAttribute('class', 'fa-solid fa-trash-can');
  $deleteIcon.setAttribute('data-set', entry.entry);
  anchor.appendChild($deleteIcon);

  $listItem.appendChild($colFull1);
  $colFull1.appendChild($imgContainer);
  if (typeof entry.image === typeof 'image') {
    $imgContainer.appendChild(searchImg);

  } else if (typeof entry.image === typeof 'video') {
    $imgContainer.appendChild($favVideo);
  }
  // if (entry.media === 'img') {
  //   $imgContainer.appendChild($favImg);
  // } else if (entry.media === 'video') {
  //   $imgContainer.appendChild($favVideo);
  // }

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
