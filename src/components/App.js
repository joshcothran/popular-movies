import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import MovieCard from './MovieCard';

import './App.css';

@inject('moviesStore')
@observer
class App extends Component {
  componentWillMount() {
    this.props.moviesStore.loadMovies();
  }

  render() {
    const { isLoading, page, totalPages, movies } = this.props.moviesStore;

    return (
      <div className="App container">
        <div className="App-header">
          <h1 className="App-h1">POPULAR MOVIES</h1>
        </div>
        <div className="App-content">
          {movies.map((movie) => {
            return (
              <MovieCard
                key={movie.id}
                movie={movie} />
            );
          })}
        </div>
        <div className="App-footer">
          Powered by <a href="https://www.themoviedb.org/" target="_blank">The Movie DB</a>
        </div>
      </div>
    );
  }
}

export default App;
