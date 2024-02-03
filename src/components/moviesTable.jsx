import React, { Component } from "react";
import Like from "./common/like";
import Table from "./common/table";
import { Link } from "react-router-dom";

class MoviesTable extends Component {
  columns = [
    {
      path: "title",
      label: "Title",
      content: (movie) => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      ),
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      content: (item) => (
        <Like onClick={() => this.props.onLiked(item)} liked={item.liked} />
      ),
    },
    {
      key: "delete",
      content: (item) => (
        <button
          onClick={() => {
            this.props.onDelete(item._id);
          }}
        >
          Delete
        </button>
      ),
    },
  ];

  render() {
    const { movies, onSort, sortColumn } = this.props;

    return (
      <Table
        columns={this.columns}
        data={movies}
        onSort={onSort}
        sortColumn={sortColumn}
      />
    );
  }
}

export default MoviesTable;
