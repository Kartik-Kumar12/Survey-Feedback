
function fetchData(){
  fetch('https://rallycoding.herokuapp.com/api/music_albums')
  .then(res =>
    res.json() )
     .then(json => console.log(json))

}
fetchData();
