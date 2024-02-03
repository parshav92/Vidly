import React from "react";
import Joi from "joi-browser";
import "./loginForm.css";
import Form from "./common/form";
import { getGenres } from "../services/fakeGenreService";
import { saveMovie, getMovie } from "../services/fakeMovieService";
import { get } from "lodash";
import { Navigate } from "react-router-dom";
// import { Navigate, useNavigate } from "react-router-dom";

class MovieForm extends Form {
  state = {
    data: { title: "", genreId: "", numberInStock: "", dailyRentalRate: "" },
    genres: [],
    errors: {},
  };

  schema = {
    _id: Joi.string(),
    title: Joi.string().required().label("Title"),
    genreId: Joi.string().required().label("Genre"),
    numberInStock: Joi.number()
      .required()
      .min(0)
      .max(100)
      .label("Number in Stock"),
    dailyRentalRate: Joi.number().required().min(0).max(10).label("Rate"),
  };
  componentDidMount() {
    const genres = getGenres();
    this.setState({ genres });

    const movieId = get(this.props, "match.params.id");
    if (movieId === "new") return;
    console.log("Movie ID: ", movieId);

    const movie = getMovie(movieId);
    if (!movie) {
      return <Navigate to="/not-found" />;
    }

    this.setState({ data: this.mapToViewModel(movie) });
  }

  doSubmit = () => {
    saveMovie(this.state.data);
    this.props.history.push("/movies");
    console.log("Form submitted");
  };

  mapToViewModel(movie) {
    return {
      _id: movie._id || "",
      title: movie.title || "",
      genreId: movie.genre._id || "",
      numberInStock: movie.numberInStock || 0,
      dailyRentalRate: movie.dailyRentalRate || 0,
    };
  }

  render() {
    return (
      <div className="login-form-container">
        <h1>Movie Form</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("title", "Title")}
          {this.renderSelect("genreId", "Genre", this.state.genres)}
          {this.renderInput("numberInStock", "Number in Stock", "number")}
          {this.renderInput("dailyRentalRate", "Rate")}
          {this.renderButton("Save")}
        </form>
      </div>
    );
  }
}

export default MovieForm;
