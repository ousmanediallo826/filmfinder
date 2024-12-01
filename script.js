const tmdbKey = '76d3eeac2fb56828bae7d3f07a81a57f';
const tmdbBaseUrl = 'https://api.themoviedb.org/3';

// Fetch genres and return them
async function getGenres() {
    const genreRequestEndpoint = '/genre/movie/list';
    const requestParams = `?language=en&api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${genreRequestEndpoint}${requestParams}`;

    try {
        console.log('Fetching URL:', urlToFetch);
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            console.log(jsonResponse);
            return jsonResponse.genres;
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

// Fetch a list of movies
async function getMovies() {
    const discoverMovieEndpoint = '/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc';
    const requestParams = `&api_key=${tmdbKey}`;
    const urlToFetch = `${tmdbBaseUrl}${discoverMovieEndpoint}${requestParams}`;

    try {
        console.log('Fetching URL:', urlToFetch); // Debugging: Check the constructed URL
        const response = await fetch(urlToFetch);
        if (response.ok) {
            const jsonResponse = await response.json();
            const movies = jsonResponse.results;
            console.log('Movies:', movies);
            return movies;
        } else {
            console.error('API Error:', response.status, response.statusText);
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
    }
}

// Fetch detailed movie info
// Ensure tmdbBaseUrl and tmdbKey are correctly defined



// Function to fetch detailed movie info using movie id
async function getMovieInfo(movie) {
    const movieId = movie.id;
    const movieEndpoint = `/movie/${movieId}`;
    const requestParams = `?api_key=${tmdbKey}`;  // Make sure to use '?' for the first query parameter
    const urlToFetch = `${tmdbBaseUrl}${movieEndpoint}${requestParams}`;

    try {
        const response = await fetch(urlToFetch);
        if (!response.ok) {
            // Handle any HTTP errors (e.g., 404 or 500)
            throw new Error(`Error ${response.status}: ${response.statusText}`);
        }

        const movieInfo = await response.json();

        // Check if necessary movie data exists
        if (movieInfo && movieInfo.poster_path && movieInfo.title && movieInfo.overview) {
            console.log('Movie Info:', movieInfo); // Log for debugging
            return movieInfo; // Return the movie info to be used later
        } else {
            console.warn('Movie data is incomplete:', movieInfo); // Handle incomplete data
            return null;
        }
    } catch (error) {
        console.error('Fetch Error:', error.message);
        return null; // Return null if there's an error fetching the data
    }
}

// Function to get a random movie from a list of movies
function getRandomMovies(movies) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
}


















// Function to get a random movie from the list
function getRandomMovies(movies) {
    const randomIndex = Math.floor(Math.random() * movies.length);
    return movies[randomIndex];
}

// Show random movie from list
async function showRandomMovie() {
    try {
        const movies = await getMovies();  // Await the movies data from getMovies()

        if (!Array.isArray(movies) || movies.length === 0) {
            console.error('No movies found.');
            return;
        }

        const randomMovie = getRandomMovies(movies);  // Get a random movie from the list
        const info = await getMovieInfo(randomMovie);  // Await the detailed movie info

        const movieInfo = document.getElementById('movieInfo');
        if (movieInfo.childNodes.length > 0) {
            clearCurrentMovie();
        }

        displayMovie(info);  // Call the displayMovie function to show the details on the page

    } catch (error) {
        console.error('Error fetching or displaying movie:', error);
    }
}

// Fetch and populate genres when page loads
getGenres()
    .then(populateGenreDropdown)
    .catch((error) => {
        console.error('Error in fetching or populating genres:', error);
    });

    const playButton = document.getElementById('playBtn');  // Use the correct ID 'playBtn'

if (playButton) {
    playButton.addEventListener('click', showRandomMovie);  // Attach the click event
} else {
    console.error('Play button not found.');
}
