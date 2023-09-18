import { createAction } from '@reduxjs/toolkit';

export const moviesActions = {
    fetchTrendingMovies: createAction('MOVIES/FETCH_TRENDING_MOVIES'),
    fetchUpcomingMovies: createAction('MOVIES/FETCH_UPCOMING_MOVIES'),
    fetchTopRatedMovies: createAction('MOVIES/FETCH_TOP_RATED_MOVIES'),

} as const;
