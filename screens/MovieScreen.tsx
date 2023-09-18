import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { HeartIcon } from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import Cast from '../components/cast';
import MovieList from '../components/movieList';
import { fallbackMoviePoster, fetchMovieCredits, fetchMovieDetails, fetchSimilarMovies, image500 } from '../app/api/moviedb';
import { styles, theme } from '../app/theme';
import Loading from '../components/loading';

const ios = Platform.OS == 'ios';
var { width, height } = Dimensions.get('window');

interface MovieScreenProp {
    item: object;
}

const MovieScreen = (prop: MovieScreenProp) => {
    const { params: item } = useRoute();
    const navigation = useNavigation();
    const [movie, setMovie] = useState<Movie>();
    const [cast, setCast] = useState([])
    const [similarMovies, setSimilarMovies] = useState([])
    const [isFavourite, toggleFavourite] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getMovieDetials(item?.id);
        getMovieCredits(item?.id);
        getSimilarMovies(item?.id);
    }, [item]);

    const getMovieDetials = async (id: string) => {
        const data = await fetchMovieDetails(id);
        setLoading(false);
        if (data) {
            setMovie({ ...movie, ...data });
        }
    }
    const getMovieCredits = async (id: string) => {
        const data = await fetchMovieCredits(id);
        console.log('got movie credits')
        if (data && data.cast) {
            setCast(data.cast);
        }

    }
    const getSimilarMovies = async (id: string) => {
        const data = await fetchSimilarMovies(id);
        console.log('got similar movies');
        if (data && data.results) {
            setSimilarMovies(data.results);
        }

    }
    return (
        <ScrollView
            contentContainerStyle={{ paddingBottom: 20 }}
            style={makeStyle.container} >

            {/* back button and movie poster */}
            < View  >
                <SafeAreaView style={makeStyle.absoluteContainer}>
                    <TouchableOpacity style={[styles.background, makeStyle.roundedContainer]} onPress={() => navigation.goBack()}>
                        <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                        <HeartIcon size="35" color={isFavourite ? theme.background : 'white'} />
                    </TouchableOpacity>
                </SafeAreaView>
                {
                    loading ? (
                        <Loading />
                    ) : (
                        <View>
                            <Image
                                // source={require('../assets/images/moviePoster2.png')} 
                                source={{ uri: image500(movie?.poster_path) || fallbackMoviePoster }}
                                style={{ width, height: height * 0.55 }}
                            />
                            <LinearGradient

                                colors={['transparent', 'rgba(23, 23, 23, 0.8)', 'rgba(23, 23, 23, 1)']}
                                style={[{ width, height: height * 0.40 }, makeStyle.absoluteBottom]}
                                start={{ x: 0.5, y: 0 }}
                                end={{ x: 0.5, y: 1 }}
                            />
                        </View>
                    )
                }
            </View >

            {/* movie details */}

            < View style={{ marginTop: -(height * 0.09) }} >
                {/* title */}
                < Text style={makeStyle.text} >
                    {
                        movie?.title
                    }
                </Text >

                {/* status, release year, runtime */}
                {
                    movie?.id ? (
                        <Text style={makeStyle.text}>
                            {movie?.status} • {movie?.release_date?.split('-')[0] || 'N/A'} • {movie?.runtime} min
                        </Text>
                    ) : null
                }

                {/* genres  */}
                <View style={makeStyle.genericContainer}>
                    {
                        movie?.genres?.map((genre, index) => {
                            let showDot = index + 1 != movie.genres.length;
                            return (
                                <Text key={index} style={makeStyle.description}>
                                    {genre?.name} {showDot ? "•" : null}
                                </Text>
                            )
                        })
                    }
                </View>

                {/* description */}
                <Text style={makeStyle.description}>
                    {
                        movie?.overview
                    }
                </Text>

            </View >


            {/* cast */}
            {
                movie?.id && cast.length > 0 && <Cast navigation={navigation} cast={cast} />
            }

            {/* similar movies section */}
            {
                movie?.id && similarMovies.length > 0 && <MovieList title={'Similar Movies'} hideSeeAll={true} data={similarMovies} />
            }

        </ScrollView >
    )
}

const makeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
    },
    genericContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginHorizontal: 16,     
    },
    absoluteContainer: {
        position: 'absolute',
        zIndex: 20,
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 4, 
    },
    roundedContainer: {
        borderRadius: 20,
        padding: 4, 
    },
    absoluteBottom: {
        position: 'absolute',
        bottom: 0,
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,           
    },
    description: {
        color: '#808080',
        fontWeight: 'bold',
        fontSize: 16,
        textAlign: 'center', 
    },

});

export default MovieScreen