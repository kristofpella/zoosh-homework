import { action, createStore, thunk } from "easy-peasy";

import {
  fetchMovies,
  fetchMovieFromWikipedia,
  fetchRelatedMovies,
} from "../services/movies.service";

const storeModel = {
  movies: [],
  selectedMovie: null,
  isLoadingMovies: false,
  isLoadingMovie: false,
  fetchMovies: thunk(async (actions, payload) => {
    actions.setIsLoadingMovies(true);
    actions.setSelectedMovie(null);
    const movies = (await fetchMovies(payload)) || [];
    actions.setMovies(movies);
    actions.setIsLoadingMovies(false);
  }),
  fetchMovieFromWikipedia: thunk(async (actions, payload) => {
    actions.setIsLoadingMovie(true);
    const wikipediaData = await fetchMovieFromWikipedia(payload);
    const movieData = {
      ...payload,
      ...wikipediaData,
    };
    actions.setSelectedMovie(movieData);
    actions.setIsLoadingMovie(false);
  }),
  fetchRelatedMovies: thunk(async (actions, payload) => {
    actions.setIsLoadingMovies(true);
    const movies = await fetchRelatedMovies(payload);
    actions.setMovies(movies);
    actions.setIsLoadingMovies(false);
  }),
  setMovies: action((state, payload) => {
    state.movies = payload;
  }),
  setIsLoadingMovies: action((state, payload) => {
    state.isLoadingMovies = payload;
  }),
  setIsLoadingMovie: action((state, payload) => {
    state.isLoadingMovie = payload;
  }),
  setSelectedMovie: action((state, payload) => {
    state.selectedMovie = payload;
  }),
};

const store = createStore(storeModel);

export { store };
