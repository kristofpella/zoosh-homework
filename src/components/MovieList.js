import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { Box, CircularProgress, Typography, Paper } from "@material-ui/core";

import { MovieListContent } from "./MovieListContent";

const CONSTANTS = {
  title: "Movie List",
  emptyListMessage: "There are no results matching your query",
};

const EmptyList = () => <Box>{CONSTANTS.emptyListMessage}</Box>;

const MovieList = () => {
  const { isLoadingMovies, movies } = useStoreState((state) => state);
  const { fetchMovieFromWikipedia } = useStoreActions((actions) => actions);

  const showEmpty = !isLoadingMovies && !movies.length;
  const showMovieListContent = !isLoadingMovies && movies.length > 0;

  return (
    <Paper elevation={2}>
      <Box p={2.5}>
        <Box mb={2}>
          <Typography variant="h4">{CONSTANTS.title}</Typography>
        </Box>
        {isLoadingMovies && <CircularProgress />}
        {showEmpty && <EmptyList />}
        {showMovieListContent && (
          <MovieListContent
            movies={movies}
            fetchMovieFromWikipedia={fetchMovieFromWikipedia}
          />
        )}
      </Box>
    </Paper>
  );
};

export { MovieList };
