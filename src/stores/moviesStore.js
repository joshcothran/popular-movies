import 'whatwg-fetch';
import * as _ from 'lodash';
import { observable, action, computed } from 'mobx';

export class MoviesStore {
  @observable isLoading = false;
  @observable page = 0;
  @observable totalPages = -1;
  @observable movies = [];

  @action setPage(page) {
    this.page = page;
  }

  @action loadMovies() {
    const baseUrl = 'https://api.themoviedb.org/3/movie/popular';
    const apiKey = '5142a74ee39c53d1515a776eb1cbb57d';
    const language = 'en-US';
    const apiUrl = `${baseUrl}?api_key=${apiKey}&language=${language}&page=${this.page + 1}`;

    if (this.totalPages !== -1 && this.page + 1 > this.totalPages) {
      return;
    }

    this.isLoading = true;
    return fetch(apiUrl)
      .then((response) => {
        response.json()
          .then((json) => {
            const page = json.page;
            const totalPages = json.total_pages;
            const movies = json.results.map((movie) => {
              return {
                id: `_${movie.id}`,
                title: movie.title,
                img: movie.backdrop_path
              };
            });
            this.page = page;
            this.totalPages = totalPages;
            _.each(movies, (movie) => {
              this.movies.push(movie);
            });
          });
      }).catch((err) => {
        console.log(err);
      })
      .finally(action(() => { this.isLoading = false; }));
  }
}

export default new MoviesStore();
