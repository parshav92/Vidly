import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import { getGenres } from "../services/fakeGenreService";
import { paginate } from "../services/pagiante";
import MoviesTable from "./moviesTable";
import Pagination from "./common/pagination";
import Filter from "./common/filter";
import _ from "lodash";
import Search from "./common/search";
import { Link } from "react-router-dom";
class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    pageSize: 4,
    currentPage: 1,
    selectedGenre: null,
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
  };

  componentDidMount() {
    const genres = [{ id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleDelete = (id) => {
    const updatedMovies = this.state.movies.filter((item) => item._id !== id);
    this.setState({ movies: updatedMovies });
  };

  handleLiked = (movie) => {
    const movies = [...this.state.movies];
    const index = movies.indexOf(movie);
    movies[index] = { ...movies[index] };
    movies[index].liked = !movies[index].liked;
    this.setState({ movies });
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = (genre) => {
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, selectedGenre: null, currentPage: 1 });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };
  getPagedData = () => {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      searchQuery,
      sortColumn,
    } = this.state;
    let filtered = allMovies;
    if (searchQuery) {
      filtered = allMovies.filter((m) =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    } else if (selectedGenre && selectedGenre._id) {
      filtered = allMovies.filter(
        (item) => item.genre._id === selectedGenre._id
      );
    }
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    const movies = paginate(sorted, currentPage, pageSize);
    return { totalCount: filtered.length, data: movies };
  };
  render() {
    const {
      currentPage,
      pageSize,
      movies: allMovies,
      selectedGenre,
      sortColumn,
      searchQuery,
    } = this.state;

    const { totalCount, data: movies } = this.getPagedData();
    return (
      <div className="row" style={{ marginTop: 20 }}>
        <div className="col-3">
          <Filter
            selectedGenre={selectedGenre}
            items={this.state.genres}
            onGenreSelect={this.handleGenreSelect}
          />
        </div>
        <div className="col">
          <Link
            className="btn btn-primary"
            to="/movies/new"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          <Search value={searchQuery} onChange={this.handleSearch} />
          <p>showing {totalCount} movies in the database</p>
          {allMovies.length === 0 ? (
            <p>No movies available.</p>
          ) : totalCount === 0 ? (
            <p>No matches Found</p>
          ) : (
            <MoviesTable
              movies={movies}
              sortColumn={sortColumn}
              onDelete={this.handleDelete}
              onLiked={this.handleLiked}
              onSort={this.handleSort}
            />
          )}
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Movies;
