import { View, Text, Image, TouchableWithoutFeedback, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { image500 } from '../app/api/moviedb';

var { width, height } = Dimensions.get('window');

export default function TrendingMovies({ data }) {
    const navigation = useNavigation();

    const handleClick = item => {
        navigation.navigate('Movie', item);
    }
    return (
        <View className="mb-8">

            <Text style={makeStyle.text}>Trending</Text>
            <Carousel
                data={data}
                renderItem={({ item }) => <MovieCard handleClick={handleClick} item={item} />}
                firstItem={1}
                loop={true}
                autoplay={true}
                inactiveSlideOpacity={0.60}
                sliderWidth={width}
                itemWidth={width * 0.62}
                slideStyle={{ display: 'flex', alignItems: 'center' }}
            />
        </View>
    )
}

const MovieCard = ({ item, handleClick }) => {

    return (
        <TouchableWithoutFeedback onPress={() => handleClick(item)}>
            <Image
                style={makeStyle.Image}
                // source={require('../assets/images/moviePoster1.png')} 
                source={{ uri: image500(item.poster_path) }}
            />
        </TouchableWithoutFeedback>
    )
}

const makeStyle = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 16,
        marginBottom: 20,    
    },
    Image: {
        borderRadius: 24,
        width: width * 0.6,
        height: height * 0.4,
    }

});