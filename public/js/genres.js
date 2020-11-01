function getGenresList() {
  fetch('/get-genres-list', {
    method: 'POST'
  })
    .then(res => res.json())
    .then(body => showGenresList(body));
}

function showGenresList(data) {
  console.log(data);
}

getGenresList();