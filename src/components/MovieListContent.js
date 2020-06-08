import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  movieYear: {
    textAlign: "right",
  },
}));

const MovieListContent = ({ movies, fetchMovieFromWikipedia }) => {
  const classes = useStyles();
  return (
    <List dense className={classes.root}>
      {movies.map((movie) => {
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
            <ListItemText className={classes.movieYear} primary={movie.year} />
          </ListItem>
        );
      })}
    </List>
  );
};

export { MovieListContent };
