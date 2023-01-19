# Capture Nasa 
A dynamic HTML, CSS, and JavaScript solo project. View a [live demo here](https://louiewhitz.github.io/ajax-project/).

This project is a web application that allows users to view  NASA's image or video of the day, save their favorite image or video to a favorites page, and search for past images or videos.This application is fully responsive design for optimal viewing on any device.

Capture Nasa was built using simple front end technologies implementing AJAX requests to [NASA's APOD API](https://api.nasa.gov/) in order to vie NASA's image and/or video of the day and search by day, month and year in the past. Furthermore, on the homepage, each time the page loads, another AJAX request is sent to [Quotable API](https://api.quotable.io/random) in order to fetch an inspiring quote. NASA has only been uploading media since 1995, so there is functionality built in to inform the user should they search any days prior. All styling is built with custom HTML and CSS for structure and design, without external libraries. Initially, the project was written in Vanilla ES5, however, it has recently been converted to ES6. For anyone looking to have a quick recap on the variable 'var' is welcome to change each 'const' and 'let' and the project will perform in the same manner.

## Features
* User can view the NASA Image or Video of the day on the homepage 
* User can save favorite images and videos to a personal favorites page 
* User can Search for past images and videos by date using AJAX requests
* User can delete any image or video from the favorites page

## Web Application in Action
![ReadMe](https://github.com/louiewhitz/ajax-project/blob/main/Kapture%202023-01-18%20at%2021.37.13.gif)

## Technologies used in this project:
HTML

CSS

JavaScript 

AJAX


## Getting Started
1. Clone this repository to your local machine
2. Open the index.html file in your preferred browser
3. Use the navigation bar to access the NASA image and video of the day, save your favorite images and videos, and search for past images and videos by date. All data is loaded dynamically using AJAX requests.
* Users must have a working knowledge and understanding of HTML, CSS, and JavaScript (ES5 or ES6).
Users must understand the metrics behind working with the Document Object Model, HTTP requests and AJAX.
## API
This project uses the NASA Image and Video API, which can be found here: https://api.nasa.gov/. You can use this [demo-key](https://api.nasa.gov/planetary/apod?api_key=DEMO_KEY) as an initial key to practice.

## Contributing
To contribute to this project, please fork the repository and create a pull request with your proposed changes.

## Note
If you want to run this application locally you will need to run it on a local server because of the CORS policy.
