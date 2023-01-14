/* exported data */

let nasa = {
  view: 'start-page',
  favorites: [],
  favId: 1
};

const previousEntryJSON = localStorage.getItem('nasa');
if (previousEntryJSON !== null) {
  nasa = JSON.parse(previousEntryJSON);
}

window.addEventListener('beforeunload', beforeUnload);
function beforeUnload() {
  const jsonNasa = JSON.stringify(nasa);
  localStorage.setItem('nasa', jsonNasa);
}

window.addEventListener('pagehide', function () {
  const jsonNasa = JSON.stringify(nasa);
  localStorage.setItem('nasa', jsonNasa);
});
