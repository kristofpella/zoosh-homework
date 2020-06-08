import React from "react";
import { Box, Container, CssBaseline, Grid } from "@material-ui/core";

import { MovieDetail } from "./components/MovieDetail";
import { MovieList } from "./components/MovieList";
import { Search } from "./components/Search";

const App = () => (
  <Container component="main" maxWidth="md">
    <CssBaseline />
    <Search />
    <Box mt={5}>
      <Grid container spacing={3}>
        <Grid item xs={6}>
          <MovieList />
        </Grid>
        <Grid item xs={6}>
          <MovieDetail />
        </Grid>
      </Grid>
    </Box>
  </Container>
);

export { App };
