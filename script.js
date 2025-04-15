const apiKey = 'a16a9e59'
const searchInput = document.getElementById('searchInput')
const searchBtn = document.getElementById('searchBtn')
const movieDiv = document.getElementById('movies')
const placeHolderDiv = document.getElementById('placeholder')


searchBtn.addEventListener('click', () => {

    placeHolderDiv.innerHTML = ''
    movieDiv.innerHTML = `<p class="loading"> Loading... </p>`
    setTimeout(() => {

        movieDiv.innerHTML = ''
        const query = searchInput.value.trim()
        if(query !== '') {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&s=${searchInput.value}`)
                .then(res => res.json())
                .then(data => {
                    if(data.Response){
                        data.Search.forEach(movie => {
                            renderMovieDetails(movie.imdbID)
                        });
                    } else {
                        movieDiv.innerHTML = `<p> No movies found for ${query} </p>`
                    }
                })
                .catch(err => {
                    movieDiv.innerHTML = `<p> There was an error fetching the data </p>`
                })
        } else {
            movieDiv.innerHTML = `<p> Please enter a movie name to search! </p>`
        }
    }, 2000);

})


function renderMovieDetails(imdbID){
    fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}&plot=short`)
        .then(res => res.json())
        .then(data => {
            const ratings = data.Ratings.find(r => r.Source === 'Internet Movie Database')
            const ratingsValue = ratings ? ratings.Value : 'N/A'
            movieDiv.innerHTML += 
            `
            <div class="movie-list"> 
            <div> 
                 <img src="${data.Poster}" class="poster" alt="poster of the movie">
            </div>
                <div class="text-info"> 
                    <div class="rating"> 
                        <h3> ${data.Title} </h3>
                        <img src="images/Star-Icon.svg" class="star" alt="image of a small star">
                        <p>${ratingsValue} </p>
                    </div>
                    <div class="watchlist"> 
                        <p> ${data.Runtime} </p>
                        <p> ${data.Genre} </p>
                        <button onclick="addToWatchlist('${data.imdbID}')"> <i class="fa-solid fa-circle-plus"></i> Watchlist </button>
                    </div>
                    <div class="plot"> 
                        <p> ${data.Plot} </p>
                    </div>
                </div>
            </div>

            `

            // ratings ? console.log(ratings.Value) : console.log('Ratings not found!')
            // console.log(data)   
        })
}

function addToWatchlist(imdbID){
    let watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    if(!watchlist.includes(imdbID)){
        watchlist.push(imdbID)
        localStorage.setItem('watchlist', JSON.stringify(watchlist))
        alert('Added to watchlist!')
    } else {
        alert('Movie already in the watchlist!')
    }
}