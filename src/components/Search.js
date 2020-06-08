import React, { useState } from "react";
import { useStoreActions } from "easy-peasy";

import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";

import { makeStyles } from "@material-ui/core/styles";

const CONSTANTS = {
  placeholder: "Type movie title",
  cta: "Press Enter or click here to search",
};

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Search = () => {
  const classes = useStyles();
  const { fetchMovies } = useStoreActions((actions) => actions);
  const [queryString, setQueryString] = useState("");
  const [lastQuery, setLastQuery] = useState("");

  const handleChange = (event) => {
    const {
      target: { value },
    } = event;
    console.log(event.target.value);
    setQueryString(value);
    event.preventDefault();
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (queryString === "") {
      alert("Type a title to search for it");
      return false;
    }

    if (queryString === lastQuery) {
      alert("Modify your query to search for movies");
      return false;
    }

    setLastQuery(queryString);
    fetchMovies(queryString);
  };

  return (
    <div className={classes.paper}>
      <form className={classes.form} noValidate onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label={CONSTANTS.placeholder}
          autoFocus
          value={queryString}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          type="submit"
        >
          {CONSTANTS.cta}
        </Button>
      </form>
    </div>
  );
};

export { Search };
