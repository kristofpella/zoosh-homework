import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";
import { MovieDetailContent } from "./MovieDetailContent.js";

import { Box, CircularProgress, Typography, Paper } from "@material-ui/core";

const CONSTANTS = {
  title: "Movie Detail",
  emptyContentMessage: "Select a movie from the list to get details",
};

const EmptyContent = () => <Box>{CONSTANTS.emptyContentMessage}</Box>;

const MovieDetail = () => {
  const { isLoadingMovie, selectedMovie } = useStoreState((state) => state);
  const { fetchRelatedMovies } = useStoreActions((actions) => actions);

  const showEmpty = !isLoadingMovie && !selectedMovie;
  const showDetails = !isLoadingMovie && selectedMovie;

  return (
    <Paper elevation={2}>
      <Box p={2.5}>
        <Box mb={2}>
          <Typography variant="h4">{CONSTANTS.title}</Typography>
        </Box>
        {isLoadingMovie && <CircularProgress />}
        {showEmpty && <EmptyContent />}
        {showDetails && (
          <MovieDetailContent
            selectedMovie={selectedMovie}
            fetchRelatedMovies={fetchRelatedMovies}
          />
        )}
      </Box>
    </Paper>
  );
};

export { MovieDetail };
