import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';

import InfiniteScroll from 'react-infinite-scroller';
import MovieCard from './MovieCard';

import './App.css';

@inject('moviesStore')
@observer
class App extends Component {
  render() {
    const {
      isLoading,
      page,
      totalPages,
      movies,
      loadMovies,
      hasMore
    } = this.props.moviesStore;

    return (
      <div className="App container">
        <div className="App-header">
          <h1 className="App-h1">POPULAR MOVIES</h1>
        </div>
        <div className="App-content">
          <InfiniteScroll
            pageStart={page}
            loadMore={loadMovies}
            hasMore={hasMore}
            loader={<div className="loader">Loading ...</div>}
            useWindow={false}
          >
            {movies.map((movie) => {
              return (
                <MovieCard
                  key={movie.id}
                  movie={movie} />
              );
            })}
          </InfiniteScroll>
        </div>
        <div className="App-footer">
          Powered by <a href="https://www.themoviedb.org/" target="_blank">The Movie DB</a>
        </div>
      </div>
    );
  }
}

export default App;
