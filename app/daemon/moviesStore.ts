import { makeObservable, observable, action, computed } from "mobx";

class MoviesStore {
  movies: [] = [];
  isLoading = false;

  constructor() {
    makeObservable(this, {
      movies: observable,
      isLoading: observable,
      setMovies: action,
      setLoading: action,
      getMovies: computed,
    });
  }

  setMovies = (movies: any) => {
    this.movies = movies;
  };

  setLoading = (loading: boolean) => {
    this.isLoading = loading;
  };

  get getMovies() {
    return this.movies;
  }
}

// Create an instance of the TodoStore
const moviesStore = new MoviesStore();

export default moviesStore;
