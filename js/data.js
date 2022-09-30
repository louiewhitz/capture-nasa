/* exported data */

var nasa = {
  view: 'start-page',
  favorites: [],
  favId: 1
};

var previousEntryJSON = localStorage.getItem('nasa');
if (previousEntryJSON !== null) {
  nasa = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', beforeUnload);
function beforeUnload() {
  var jsonNasa = JSON.stringify(nasa);
  localStorage.setItem('nasa', jsonNasa);
}
