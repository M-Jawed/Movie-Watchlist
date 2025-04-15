const apiKey = 'a16a9e59'
const watchlistBody = document.getElementById('watchlistBody')


function renderWatchlist() {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || []

    if (watchlist.length === 0) {
        watchlistBody.innerHTML = `
        <p>No movies in your watchlist!</p>
        <button><i class="fa-solid fa-circle-plus"></i> <a href="index.html">Let's add some movies!</a></button>
        `

    } else {
        watchlistBody.innerHTML = '' 
        watchlist.forEach(imdbID => {
            fetch(`http://www.omdbapi.com/?apikey=${apiKey}&i=${imdbID}`)
                .then(res => res.json())
                .then(data => {
                    const ratings = data.Ratings.find(r => r.Source === 'Internet Movie Database')
                    const ratingsValue = ratings ? ratings.Value : 'N/A'

                    watchlistBody.innerHTML += `
                    <div class="movie-list"> 
                        <div> 
                            <img src="${data.Poster}" class="poster" alt="poster of the movie">
                        </div>
                        <div class="text-info"> 
                            <div class="rating"> 
                                <h3>${data.Title}</h3>
                                <img src="images/Star-Icon.svg" class="star" alt="image of a small star">
                                <p>${ratingsValue}</p>
                            </div>
                            <div class="watchlist"> 
                                <p>${data.Runtime}</p>
                                <p>${data.Genre}</p>
                                <button onclick="removeFromWatchlist('${data.imdbID}')" class="remove"><i class="fa-solid fa-circle-minus"></i> Remove</button>
                            </div>
                            <div class="plot"> 
                                <p>${data.Plot}</p>
                            </div>
                        </div>
                    </div>
                    `
                })
        })
    }
}

function removeFromWatchlist(imdbID){
    let watchlist = JSON.parse(localStorage.getItem('watchlist'))

    watchlist = watchlist.filter(id => id !== imdbID)

    localStorage.setItem('watchlist', JSON.stringify(watchlist))

    renderWatchlist()
}

document.addEventListener('DOMContentLoaded', renderWatchlist)
