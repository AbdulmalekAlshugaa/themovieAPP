import { View, Text, Image, TouchableOpacity, Platform, Dimensions, ScrollView, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { ChevronLeftIcon } from 'react-native-heroicons/outline'
import { HeartIcon } from 'react-native-heroicons/solid'
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation, useRoute } from '@react-navigation/native';
import MovieList from '../components/movieList';
import { fallbackPersonImage, fetchPersonDetails, fetchPersonMovies, image185, image342, image500 } from '../app/api/moviedb';
import Loading from '../components/loading';
import { styles, theme } from '../app/theme';
const ios = Platform.OS == 'ios';
var { width, height } = Dimensions.get('window');

const PersonScreen = () => {
    const { params: item } = useRoute();
    const [isFavourite, toggleFavourite] = useState(false);
    const navigation = useNavigation();
    const [person, setPerson] = useState({});
    const [personMovies, setPersonMovies] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        getPersonDetails(item.id);
        getPersonMovies(item.id);
    }, [item]);

    const getPersonDetails = async id => {
        const data = await fetchPersonDetails(id);
        console.log('got person details');
        setLoading(false);
        if (data) {
            setPerson(data);
        }
    }
    const getPersonMovies = async id => {
        const data = await fetchPersonMovies(id);
        console.log('got person movies')
        if (data && data.cast) {
            setPersonMovies(data.cast);
        }

    }

    return (
        <ScrollView
            style={makeStyle.container}
            contentContainerStyle={{ paddingBottom: 20 }}>
            {/* back button */}
            <SafeAreaView
                style={makeStyle.header}
            >
                <TouchableOpacity style={[styles.background, makeStyle.favourite]} onPress={() => navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="white" />
                </TouchableOpacity>

                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)}>
                    <HeartIcon size="35" color={isFavourite ? 'red' : 'white'} />
                </TouchableOpacity>
            </SafeAreaView>

            {/* person details */}
            {
                loading ? (
                    <Loading />
                ) : (
                    <View>
                        <View

                            style={makeStyle.content}
                        >
                            <View
                                style={makeStyle.imageContainer}
                            >
                                <Image
                                    // source={require('../assets/images/castImage2.png')} 
                                    source={{ uri: image342(person?.profile_path) || fallbackPersonImage }}
                                    style={{ height: height * 0.43, width: width * 0.74 }}
                                />
                            </View>
                        </View>

                        <View >
                            <Text style={makeStyle.text}>
                                {/* Keanu Reeves */}
                                {person?.name}
                            </Text>
                            <Text style={makeStyle.placeOfBirth}>
                                {person?.place_of_birth}
                                {/* Beirut, Lebanon */}
                            </Text>
                        </View>

                        <View style={makeStyle.bodyContainer}>
                            <View style={makeStyle.contentContainer}>
                                <Text style={makeStyle.text2}>Gender</Text>
                                <Text style={makeStyle.textContent}>
                                    {/* Male */}
                                    {
                                        person?.gender == 1 ? 'Female' : 'Male'
                                    }
                                </Text>
                            </View>
                            <View style={makeStyle.contentContainer}>
                                <Text style={makeStyle.text2}>Birthday</Text>
                                <Text style={makeStyle.textContent}>
                                    {/* 1964-09-02 */}
                                    {person?.birthday}
                                </Text>
                            </View>
                            <View style={makeStyle.contentContainer}>
                                <Text style={makeStyle.text2}>known for</Text>
                                <Text style={makeStyle.textContent}>
                                    {/* Acting */}
                                    {person?.known_for_department}
                                </Text>
                            </View>
                            <View >
                                <Text style={makeStyle.text2}>Popularity</Text>
                                <Text style={makeStyle.textContent}>
                                    {/* 84.23 % */}
                                    {person?.popularity?.toFixed(2)} %
                                </Text>
                            </View>

                        </View>
                        <View >
                            <Text >Biography</Text>
                            <Text style={makeStyle.textContent}>
                                {
                                    person?.biography ? person.biography : 'N/A'
                                }
                            </Text>
                        </View>

                        {/* person movies */}
                        {person?.id && personMovies.length > 0 && <MovieList title="Movies" hideSeeAll={true} data={personMovies} />}

                    </View>
                )
            }
        </ScrollView>

    )
}

const makeStyle = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.bgNeutral900,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginHorizontal: 16,
        zIndex: 10,
    },
    favourite: {
        borderRadius: 20,
        padding: 4,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'center',
        shadowColor: 'gray',
        shadowRadius: 40,
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 1,
    },
    imageContainer: {
        alignItems: 'center',
        borderRadius: 150,
        overflow: 'hidden',
        height: 300,
        width: 300,
        borderColor: '#808080',
        borderWidth: 2,
    },
    text: {
        marginVertical: 10,
        fontSize: 24,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    placeOfBirth: {
        color: '#808080',
        textAlign: 'center',
        fontSize: 16,
    },
    bodyContainer: {
        marginHorizontal: 12,
        padding: 16,
        marginTop: 24,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: '#424242',
        borderRadius: 9999,
    },
    contentContainer: {
        borderRightWidth: 2,
        borderColor: '#808080',
        paddingHorizontal: 8,
        alignItems: 'center',
    },
    text2: {
        fontSize: 12,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textContent: {
        color: '#C4C4C4',
        fontSize: 14,
    }
});

export default PersonScreen;