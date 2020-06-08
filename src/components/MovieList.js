import React from "react";
import { useStoreActions, useStoreState } from "easy-peasy";

import Avatar from "@material-ui/core/Avatar";
import Box from "@material-ui/core/Box";
import CircularProgress from "@material-ui/core/CircularProgress";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core/styles";

const CONSTANTS = {
  title: "Movie List",
  emptyListMessage: "There are no results matching your query",
};

const useStyles = makeStyles((theme) => ({
  movieListContainer: {
    padding: 20,
  },
  movieListTitle: {
    marginBottom: theme.spacing(2),
  },
  movieYear: {
    textAlign: "right",
  },
}));

const EmptyList = () => <Box>{CONSTANTS.emptyListMessage}</Box>;

const MovieList = () => {
  const classes = useStyles();
  const { isLoadingMovies, movies } = useStoreState((state) => state);
  const { fetchMovieFromWikipedia } = useStoreActions((actions) => actions);

  let movieListContent;

  if (isLoadingMovies) {
    movieListContent = <CircularProgress />;
  } else {
    movieListContent = movies.length ? (
      <List dense className={classes.root}>
        {movies.map((movie, i) => {
          return (
            <ListItem
              key={movie.id}
              button
              onClick={() => fetchMovieFromWikipedia(movie)}
            >
              <ListItemAvatar>
                <Avatar
                  alt={`${movie.title} Poster`}
                  src={
                    movie.poster_path
                      ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                      : null
                  }
                />
              </ListItemAvatar>
              <ListItemText primary={movie.title} />
              <ListItemText
                className={classes.movieYear}
                primary={movie.year}
              />
            </ListItem>
          );
        })}
      </List>
    ) : (
      <EmptyList />
    );
  }

  return (
    <Paper className={classes.movieListContainer} elevation={2}>
      <Typography className={classes.movieListTitle} variant="h4">
        {CONSTANTS.title}
      </Typography>
      {movieListContent}
    </Paper>
  );
};

export { MovieList };
