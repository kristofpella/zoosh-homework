import React, { Fragment } from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import Box from "@material-ui/core/Box";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Typography from "@material-ui/core/Typography";
import Paper from "@material-ui/core/Paper";
import Link from "@material-ui/core/Link";

import { makeStyles } from "@material-ui/core/styles";

const CONSTANTS = {
  title: "Movie Detail",
  emptyContentMessage: "Select a movie from the list to get details",
  wikipediaLink: "Wikipedia link",
  imdbLink: "IMDB link",
  getRelatedMovies: "Get related movies",
};

const useStyles = makeStyles((theme) => ({
  movieDetailContainer: {
    padding: 20,
  },
  movieListTitle: {
    marginBottom: theme.spacing(2),
  },
  movieTitle: {
    marginBottom: 10,
  },
  movieDescription: {
    fontSize: "0.875rem",
    marginBottom: theme.spacing(2),
  },
  linkTitle: {
    fontSize: "0.875rem",
    fontWeight: "bold",
  },
  link: {
    display: "inline-block",
    marginBottom: theme.spacing(2),
  },
}));

const EmptyContent = () => <Box>{CONSTANTS.emptyContentMessage}</Box>;

const MovieDetail = () => {
  const classes = useStyles();
  const { isLoadingMovie, selectedMovie } = useStoreState((state) => state);
  const { fetchRelatedMovies } = useStoreActions((actions) => actions);

  let movieDetailContent;

  if (isLoadingMovie) {
    movieDetailContent = <CircularProgress />;
  } else if (selectedMovie) {
    const wikipediaLink = `http://en.wikipedia.org/?curid=${selectedMovie.wikipediaPageId}`;
    const imdbLink = `https://www.imdb.com/title/${selectedMovie.imdbId}`;
    movieDetailContent = (
      <Fragment>
        <Typography variant="h6" className={classes.movieTitle}>
          {selectedMovie.title}
        </Typography>
        <Typography component="p" className={classes.movieDescription}>
          {selectedMovie.description}
        </Typography>
        <Typography component="p" className={classes.linkTitle}>
          {CONSTANTS.wikipediaLink}
        </Typography>
        <Link href={wikipediaLink} target="_blank" className={classes.link}>
          {wikipediaLink}
        </Link>
        <Typography component="p" className={classes.linkTitle}>
          {CONSTANTS.imdbLink}
        </Typography>
        <Link href={imdbLink} target="_blank" className={classes.link}>
          {imdbLink}
        </Link>
        <Button
          fullWidth
          variant="contained"
          color="primary"
          onClick={() => fetchRelatedMovies(selectedMovie.id)}
        >
          {CONSTANTS.getRelatedMovies}
        </Button>
      </Fragment>
    );
  } else {
    movieDetailContent = <EmptyContent />;
  }

  return (
    <Paper className={classes.movieDetailContainer} elevation={2}>
      <Typography className={classes.movieListTitle} variant="h4">
        {CONSTANTS.title}
      </Typography>
      {movieDetailContent}
    </Paper>
  );
};

export { MovieDetail };
