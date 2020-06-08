import React from "react";
import {
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@material-ui/core";

const MovieListContent = ({ movies, fetchMovieFromWikipedia }) => (
  <List dense>
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
          <ListItemText
            primary={movie.year}
            primaryTypographyProps={{ align: "right" }}
          />
        </ListItem>
      );
    })}
  </List>
);

export { MovieListContent };
