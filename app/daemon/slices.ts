import { createSlice, createAsyncThunk, combineReducers } from "@reduxjs/toolkit";
import { RootState } from "../store";
import { fetchTrendingMovies, fetchUpcomingMovies } from "../api/moviedb";
import { moviesActions } from "./thunkActions";

interface TrendingMoviesState {
    movies: Movie[];
    status: 'idle' | 'loading' | 'failed';
    error: string | null;
}

const initialState: TrendingMoviesState = {
    movies: [],
    status: 'loading',
    error: null
}

const upcomingMoviesInitialState: TrendingMoviesState = {
    movies: [],
    status: 'loading',
    error: null
}

const topRatedMoviesInitialState: TrendingMoviesState = {
    movies: [],
    status: 'loading',
    error: null
}

// thunk actions
export const fetchAllTrendingMovies = createAsyncThunk(
    moviesActions.fetchTrendingMovies.type,
    async () => {
        const response = await fetchTrendingMovies();
        return response;
    }
)

export const fetchAllUpcomingMovies = createAsyncThunk(
    moviesActions.fetchUpcomingMovies.type,
    async () => {
        const response = await fetchUpcomingMovies();
        return response;
    }
)

export const fetchAllTopRatedMovies = createAsyncThunk(
    moviesActions.fetchTopRatedMovies.type,
    async () => {
        const response = await fetchUpcomingMovies();
        return response;
    }
)
// slices
export const trendingMoviesSlice = createSlice({
    name: 'trendingMovies',
    initialState,
    reducers: {
        successFetchPostData: (state, action) => {
            state.status = "loading";
            state.movies = state.movies.concat(action.payload);
            state.error = null;
        },
        cleanPostData: (state) => {
            state.movies = [];
        },
        failedFetchPostData: (state, actions) => {
            state.status = "loading";
            state.error = actions.payload;
            state.status = "failed";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTrendingMovies.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchAllTrendingMovies.fulfilled, (state, action) => {
            state.status = 'idle';
            state.movies = action.payload;
        })
        builder.addCase(fetchAllTrendingMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Failed to fetch data';
        })
    }
})

export const upcomingMoviesSlice = createSlice({
    name: 'upcomingMovies',
    initialState: upcomingMoviesInitialState,
    reducers: {
        successFetchPostData: (state, action) => {
            state.status = "loading";
            state.movies = state.movies.concat(action.payload);
            state.error = null;
        },
        cleanPostData: (state) => {
            state.movies = [];
        },
        failedFetchPostData: (state, actions) => {
            state.status = "loading";
            state.error = actions.payload;
            state.status = "failed";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllUpcomingMovies.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchAllUpcomingMovies.fulfilled, (state, action) => {
            state.status = 'idle';
            state.movies = action.payload;
        })
        builder.addCase(fetchAllUpcomingMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Failed to fetch data';
        })
    }
})

export const topRatedMoviesSlice = createSlice({
    name: 'topRatedMovies',
    initialState: topRatedMoviesInitialState,
    reducers: {
        successFetchPostData: (state, action) => {
            state.status = "loading";
            state.movies = state.movies.concat(action.payload);
            state.error = null;
        },
        cleanPostData: (state) => {
            state.movies = [];
        },
        failedFetchPostData: (state, actions) => {
            state.status = "loading";
            state.error = actions.payload;
            state.status = "failed";
        },

    },
    extraReducers: (builder) => {
        builder.addCase(fetchAllTopRatedMovies.pending, (state) => {
            state.status = 'loading';
        })
        builder.addCase(fetchAllTopRatedMovies.fulfilled, (state, action) => {
            state.status = 'idle';
            state.movies = action.payload;
        })
        builder.addCase(fetchAllTopRatedMovies.rejected, (state, action) => {
            state.status = 'failed';
            state.error = 'Failed to fetch data';
        })
    }
})

// combine reducers
export const reducer = combineReducers({
    trendingMovies: trendingMoviesSlice.reducer,
    upcomingMovies: upcomingMoviesSlice.reducer,
    topRatedMovies: topRatedMoviesSlice.reducer
})

// trending movies selectors 
export const selectTrendingMovies = (state: RootState) => state.movies.trendingMovies.movies.results;
export const selectTrendingMoviesStatus = (state: RootState) => state.movies.trendingMovies.status;
export const selectTrendingMoviesError = (state: RootState) => state.movies.trendingMovies.error;

// upcoming movies selectors
export const selectUpcomingMovies = (state: RootState) => state.movies.upcomingMovies.movies.results;
export const selectUpcomingMoviesStatus = (state: RootState) => state.movies.upcomingMovies.status;
export const selectUpcomingMoviesError = (state: RootState) => state.movies.upcomingMovies.error;

// top rated movies selectors
export const selectTopRatedMovies = (state: RootState) => state.movies.topRatedMovies.movies.results;
export const selectTopRatedMoviesStatus = (state: RootState) => state.movies.topRatedMovies.status;
export const selectTopRatedMoviesError = (state: RootState) => state.movies.topRatedMovies.error;

export const showTrendingMovies = (state: RootState) => {
    const status = selectTrendingMoviesStatus(state);
    const upcomingStatus = selectUpcomingMoviesStatus(state);
    const topRatedStatus = selectTopRatedMoviesStatus(state);
    if (status === 'idle' && upcomingStatus === 'idle' && topRatedStatus === 'idle') {
        return true;
    }
    return false;
}

export default trendingMoviesSlice.reducer;
