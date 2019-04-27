import React, { Component } from "react";
import { getMovies } from "../services/fakeMovieService";
import Pagination from "./pagination";
import { paginate } from "./utils/paginate";
import ListGroup from "./listGroup";
import { getGenres } from "../services/fakeGenreService";
import MoviesTable from "../components/moviesTable";
import SearchBox from "./common/searchBox";
import { Link } from "react-router-dom";
import _ from "lodash";

class Movies extends Component {
  state = {
    movies: [],
    genres: [],
    currentPage: 1,
    pageSize: 4,
    selectedColumn: { path: "title", order: "asc" },
    searchQuery: ""
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
    this.setState({ selectedGenre: genre, searchQuery: "", currentPage: 1 });
  };

  handleSort = selectedColumn => {
    this.setState({ selectedColumn });
  };

  handleSearch = searchQuery => {
    this.setState({ searchQuery, selectedGenre: null, currentPage: 1 });
  };

  getPaginatedMovies = () => {
    let { selectedColumn, currentPage, pageSize } = this.state;
    const filteredMovies = this.getFilteredMovies();
    const sortedMovies = _.orderBy(
      filteredMovies,
      [selectedColumn.path],
      [selectedColumn.order]
    );
    const allMovies = paginate(sortedMovies, currentPage, pageSize);
    return { allMovies, count: sortedMovies.length };
  };

  getFilteredMovies() {
    const { searchQuery, selectedGenre, movies } = this.state;
    if (searchQuery) {
      return movies.filter(m =>
        m.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );
    }
    return selectedGenre && selectedGenre._id
      ? movies.filter(m => m.genre._id === selectedGenre._id)
      : movies;
  }

  render() {
    let {
      pageSize,
      currentPage,
      genres,
      selectedColumn,
      searchQuery
    } = this.state;

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
          {count !== 0 && (
            <h5>
              <p>Showing {count} movies</p>
            </h5>
          )}
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
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
