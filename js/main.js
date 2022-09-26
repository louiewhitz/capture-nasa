// eslint-disable-next-line no-unused-vars
/* global data */
var starTitle = document.querySelector('#title');
var date = document.querySelector('#dateh3');
var image = document.querySelector('img');
var description = document.querySelector('.description');

var todayQUrl = 'https://api.quotable.io/random';

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

var apiKey = 'FBXb07IIDEucETFgOd4i8dqsC9qxqeJqGru7sCKy';
// var demokey = 'DEMO_KEY';
var nasaBaseUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}`;

// https://api.nasa.gov/planetary/apod?api_key=dEkS7Nd0bnEcjS4WEJ5h1RkyG0SPAtHAeqohZ7Dq
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
  });
  xhr.send();
}

getImage(name);
