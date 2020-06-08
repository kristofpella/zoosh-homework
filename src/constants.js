export const TMDB_API_KEY = '2b272d58dc14833071432d8f5d841143';
export const TMDB_BASE_URL = 'https://api.themoviedb.org/3'
export const TMDB_SEARCH_URL = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en-US&page=1&include_adult=false&query=`

// On this url we will perform the search based on the IMDB movie title
export const wikipediaSearchUrl = 'https://en.wikipedia.org/w/api.php?origin=*&action=query&format=json&prop=info&redirects=1&list=search&srsearch=';

// On this URL we will perform the search based on the exact Wikipedia title
export const wikipediaFetchUrl = 'https://en.wikipedia.org/w/api.php?origin=*&format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles='
