import React from "react";
import { Box, Button, Typography, Link } from "@material-ui/core";

const CONSTANTS = {
  wikipediaLink: "Wikipedia link",
  imdbLink: "IMDB link",
  getRelatedMovies: "Get related movies",
};

const MovieDetailContent = ({ selectedMovie, fetchRelatedMovies }) => {

  const wikipediaLink = `http://en.wikipedia.org/?curid=${selectedMovie.wikipediaPageId}`;
  const imdbLink = `https://www.imdb.com/title/${selectedMovie.imdbId}`;
  const fetchRelatedMoviesFn = () => fetchRelatedMovies(selectedMovie.id);

  return (
    <>
      <Box mb={1}>
        <Typography variant="h6">{selectedMovie.title}</Typography>
      </Box>
      <Box mb={2}>
        <Typography variant="body2">{selectedMovie.description}</Typography>
      </Box>
      <Typography variant="body2"><strong>{CONSTANTS.wikipediaLink}</strong></Typography>
      <Box mb={2}>
        <Link href={wikipediaLink} target="_blank">{wikipediaLink}</Link>
      </Box>
      <Typography variant="body2"><strong>{CONSTANTS.imdbLink}</strong></Typography>
      <Box mb={2}>
        <Link href={imdbLink} target="_blank">{imdbLink}</Link>
      </Box>
      <Button fullWidth variant="contained" color="primary" onClick={fetchRelatedMoviesFn}>
        {CONSTANTS.getRelatedMovies}
      </Button>
    </>
  );
};

export { MovieDetailContent };
