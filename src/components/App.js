import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import logo from '../assets/logo.svg';
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
          <p>
            isLoading: {isLoading.toString()}
          </p>
          <p>
            page: {page}
          </p>
          <p>
            totalPages: {totalPages}
          </p>
          <h2>Movies</h2>
          <ul>
            {movies.map((movie) => {
              return <li key={movie.id}>{movie.title}</li>;
            })}
          </ul>
        </div>
        <div className="App-footer">
            Powered by <a href="https://www.themoviedb.org/" target="_blank">The Movie DB</a>
        </div>
      </div>
    );
  }
}

export default App;
