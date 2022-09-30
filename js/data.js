/* exported data */

var nasa = {
  view: 'start-page',
  favorites: [],
  results: [],
  searchArr: [],
  startResults: [],
  startResult: 1,
  searchResult: 1,
  nextEntryId: 1,
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
