import React from "react";

import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";

import { makeStyles } from "@material-ui/core/styles";

import { MovieDetail } from './components/MovieDetail';
import { MovieList } from "./components/MovieList";
import { Search } from "./components/Search";

const useStyles = makeStyles(() => ({
  mainLayoutContainer: {
    marginTop: 50,
  },
}));

const App = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="md">
      <CssBaseline />
      <Search />
      <Grid container className={classes.mainLayoutContainer} spacing={3}>
        <Grid item xs={6}>
          <MovieList />
        </Grid>
        <Grid item xs={6}>
          <MovieDetail />
        </Grid>
      </Grid>
    </Container>
  );
};

export { App };
