// Populate dropdown menu with all the available genres
const populateGenreDropdown = (genres) => {
    const select = document.getElementById('genres');

    for (const genre of genres) {
        let option = document.createElement("option");
        option.value = genre.id;
        option.text = genre.name;
        select.appendChild(option);
    }
};

// Returns the current genre selection from the dropdown menu
const getSelectedGenre = () => {
    const selectedGenre = document.getElementById('genres').value;
    return selectedGenre;
};

// Clears the current movie from the screen
const clearCurrentMovie = () => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';
};

// After liking a movie, clears the current movie and shows another random movie
const likeMovie = (movieInfo) => {
    console.log('Liked movie:', movieInfo.title);
    clearCurrentMovie();
    showRandomMovie(); // Assuming this function fetches and displays a random movie
};

// After disliking a movie, clears the current movie and shows another random movie
const dislikeMovie = (movieInfo) => {
    console.log('Disliked movie:', movieInfo.title);
    clearCurrentMovie();
    showRandomMovie(); // Assuming this function fetches and displays a random movie
};

// Create HTML for movie poster
const createMoviePoster = (posterPath) => {
    const moviePosterUrl = `https://image.tmdb.org/t/p/original/${posterPath}`;
    const posterImg = document.createElement('img');
    posterImg.setAttribute('src', moviePosterUrl);
    posterImg.setAttribute('id', 'moviePoster');
    return posterImg;
};

// Create HTML for movie title
const createMovieTitle = (title) => {
    const titleHeader = document.createElement('h1');
    titleHeader.setAttribute('id', 'movieTitle');
    titleHeader.innerHTML = title;
    return titleHeader;
};

// Create HTML for movie overview
const createMovieOverview = (overview) => {
    const overviewParagraph = document.createElement('p');
    overviewParagraph.setAttribute('id', 'movieOverview');
    overviewParagraph.innerHTML = overview;
    return overviewParagraph;
};

// Display the like and dislike buttons
const showBtns = () => {
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');
    likeBtn.style.display = 'inline-block';
    dislikeBtn.style.display = 'inline-block';
};

// Function to display the movie details
const displayMovie = (movieInfo) => {
    const moviePosterDiv = document.getElementById('moviePoster');
    const movieTextDiv = document.getElementById('movieText');
    const likeBtn = document.getElementById('likeBtn');
    const dislikeBtn = document.getElementById('dislikeBtn');

    // Clear any existing content before displaying the new movie
    moviePosterDiv.innerHTML = '';
    movieTextDiv.innerHTML = '';

    // Create HTML content containing movie info
    const moviePoster = createMoviePoster(movieInfo.poster_path);  // Generate the movie poster
    const titleHeader = createMovieTitle(movieInfo.title);  // Generate the movie title
    const overviewText = createMovieOverview(movieInfo.overview);  // Generate the movie overview

    // Append title, poster, and overview to the page
    moviePosterDiv.appendChild(moviePoster);
    movieTextDiv.appendChild(titleHeader);
    movieTextDiv.appendChild(overviewText);

    // Show the like and dislike buttons
    showBtns();

    // Set the onClick event for the buttons
    likeBtn.onclick = () => likeMovie(movieInfo);  // Pass the movie info when liking
    dislikeBtn.onclick = () => dislikeMovie(movieInfo);  // Pass the movie info when disliking
};
