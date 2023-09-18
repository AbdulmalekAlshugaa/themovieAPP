interface Movie {
    results: results[];
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    genres: Genre[];
    runtime: number;
    status: string;
    poster_path: string;
}

interface results {
    id: number;
    title: string;
    poster_path: string;
    backdrop_path: string;
    overview: string;
    release_date: string;
    vote_average: number;
    vote_count: number;
    runtime: number;
    status: string;
    poster_path: string;
}


type screenName = 'Home' | 'Movie' | 'Person' | 'Search';

