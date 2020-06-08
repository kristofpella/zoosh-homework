import {
  TMDB_API_KEY,
  TMDB_BASE_URL,
  TMDB_SEARCH_URL,
  WIKIPEDIA_FETCH_URL,
  WIKIPEDIA_SEARCH_URL,
} from "../constants";

async function fetchMovieIMDBId(movieId) {
  const requestUrl = `${TMDB_BASE_URL}/movie/${movieId}/external_ids?api_key=${TMDB_API_KEY}`;
  const { imdb_id } = await fetch(requestUrl).then((res) => res.json());
  return imdb_id;
}

export async function fetchMovies(query) {
  const requestUrl = `${TMDB_SEARCH_URL}${encodeURIComponent(query)}`;
  const { results } = await fetch(requestUrl).then((res) => res.json());
  if (results) {
    results.forEach(async (result) => {
      const imdbId = await fetchMovieIMDBId(result.id);
      result.imdbId = imdbId;
      result.year = result.release_date.split("-")[0];
    });
  }
  return results;
}

export async function fetchMovieFromWikipedia(movie) {
  // We perform the the search in Wikipedia pages based on the IMDB movie title
  const searchQuery = encodeURIComponent(`${movie.title} ${movie.year}`);
  const searchUrl = `${WIKIPEDIA_SEARCH_URL}${searchQuery}`;
  const {
    query: { search },
  } = await fetch(searchUrl).then((res) => res.json());

  // Always the first element in the array will be the best match
  const bestSearchResult = search[0];

  // We perform the fetch of the movie based on the exact Wikipedia title of the movie
  const fetchUrl = `${WIKIPEDIA_FETCH_URL}${encodeURIComponent(
    bestSearchResult.title
  )}`;

  const {
    query: { pages },
  } = await fetch(fetchUrl).then((res) => res.json());
  const fetchedMovie = Object.values(pages)[0];

  return {
    description: fetchedMovie.extract,
    wikipediaPageId: fetchedMovie.pageid,
  };
}

export async function fetchRelatedMovies(movieId) {
  const requestUrl = `${TMDB_BASE_URL}/movie/${movieId}/similar?api_key=${TMDB_API_KEY}&language=en-US&page=1`;
  const { results } = await fetch(requestUrl).then((res) => res.json());
  if (results) {
    results.forEach(async (result) => {
      const imdbId = await fetchMovieIMDBId(result.id);
      result.imdbId = imdbId;
      result.year = result.release_date.split("-")[0];
    });
  }
  return results;
}
