import 'whatwg-fetch';
import * as _ from 'lodash';
import { observable, action, computed } from 'mobx';

export class MoviesStore {
  constructor() {
    this.setPage = this.setPage.bind(this);
    this.loadMovies = this.loadMovies.bind(this);
  }

  @observable isLoading = false;
  @observable page = 0;
  @observable totalPages = -1;
  @observable movies = [];

  @action setPage(page) {
    this.page = page;
  }

  @computed get hasMore() {
    return this.totalPages !== -1 && this.page + 1 > this.totalPages ?
      false : true;
  }

  @action loadMovies(page) {
    if (!this.isLoading) {
      const baseUrl = 'https://api.themoviedb.org/3/movie/popular';
      const apiKey = '5142a74ee39c53d1515a776eb1cbb57d';
      const language = 'en-US';
      const apiUrl = `${baseUrl}?api_key=${apiKey}&language=${language}&page=${page+1}`;
      this.setPage(this.page + 1);
      this.isLoading = true;
      return fetch(apiUrl)
        .then((response) => {
          response.json()
            .then((json) => {
              // const page = json.page;
              const totalPages = json.total_pages;
              const movies = json.results.map((movie) => {
                return {
                  id: `_${movie.id}`,
                  title: movie.title,
                  img: movie.backdrop_path
                };
              });
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
}

export default new MoviesStore();
