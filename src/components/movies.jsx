import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "../components/moviesTable";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedColumn: { path: "title", order: "asc" }
  };

  componentDidMount() {
    const genres = [{ _id: "", name: "All Genres" }, ...getGenres()];
    this.setState({ movies: getMovies(), genres });
  }

  handleliked = movie => {
    const movies = [...this.state.movies];
    movies[movies.indexOf(movie)].liked = !movie.liked;
    this.setState({ movies });
  };

  handleDeleteMovie = movie => {
    const movies = this.state.movies.filter(m => m._id !== movie._id);
    this.setState({ movies: movies });
  };

  handlePageChange = page => {
    this.setState({ currentPage: page });
  };

  handleGenreSelect = genre => {
    this.setState({ selectedGenre: genre });
    this.setState({ currentPage: 1 });
  };

  handleSort = selectedColumn => {
    this.setState({ selectedColumn });
  };

  getPaginatedMovies = () => {
    let {
      movies,
      selectedGenre,
      selectedColumn,
      currentPage,
      pageSize
    } = this.state;
    const filteredMovies =
      selectedGenre && selectedGenre._id
        ? movies.filter(m => m.genre._id === selectedGenre._id)
        : movies;
    const sortedMovies = _.orderBy(
      filteredMovies,
      [selectedColumn.path],
      [selectedColumn.order]
    );
    const allMovies = paginate(sortedMovies, currentPage, pageSize);
    return { allMovies, count: sortedMovies.length };
  };

  render() {
    let { pageSize, currentPage, genres, selectedColumn } = this.state;

    let { allMovies, count } = this.getPaginatedMovies();

    return (
      <div className="row">
        <div className="col-3">
          <ListGroup
            onItemSelect={this.handleGenreSelect}
            items={genres}
            selectedItem={this.state.selectedGenre}
          />
        </div>
        <div className="col">
          <Link
            to="movies/new"
            className="btn btn-primary"
            style={{ marginBottom: 20 }}
          >
            New Movie
          </Link>
          {count !== 0 && <p>Displaying {count} movies</p>}
          <span />
          <MoviesTable
            allMovies={allMovies}
            onLike={this.handleliked}
            onDelete={this.handleDeleteMovie}
            onSort={this.handleSort}
            selectedColumn={selectedColumn}
          />
          <Pagination
            count={count}
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
