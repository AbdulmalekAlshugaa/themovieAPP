import { View, Text, TouchableOpacity, ScrollView, Platform, StyleSheet } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';
import { Bars3CenterLeftIcon, MagnifyingGlassIcon } from 'react-native-heroicons/outline'
import TrendingMovies from '../components/trendingMovies';
import MovieList from '../components/movieList';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import Loading from '../components/loading';
import { styles, theme } from '../app/theme';
import { useDispatch, useSelector } from 'react-redux'

import { fetchAllTopRatedMovies, fetchAllTrendingMovies, selectTrendingMovies, showTrendingMovies, fetchAllUpcomingMovies, selectUpcomingMovies, selectTopRatedMovies } from '../app/daemon/slices';

const HomeScreen = () => {
  const dispatch = useDispatch()
  const navigation = useNavigation();
  const trendingMovies = useSelector(selectTrendingMovies)
  const upcomingMovies = useSelector(selectUpcomingMovies)
  const status: boolean = useSelector(showTrendingMovies)
  const topRatedMovies = useSelector(selectTopRatedMovies)


  useEffect(() => {
    dispatch(fetchAllTrendingMovies())
    dispatch(fetchAllUpcomingMovies())
    dispatch(fetchAllTopRatedMovies())
  }, []);

  return (
    <View style={makeStyle.container}>
      {/* search bar */}
      <SafeAreaView >
        <StatusBar style="light" />
        <View style={makeStyle.bodyContainer}>
          <Bars3CenterLeftIcon size="30" strokeWidth={2} color="white" />
          <Text
            style={makeStyle.text}
          >
            <Text style={styles.text}>M</Text>ovies
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>

            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>
      {
        !status ? (
          <Loading />
        ) : (
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 10 }}
          >

            {/* Trending Movies Carousel */}
              {trendingMovies.length > 0 && <TrendingMovies data={trendingMovies} />}

            {/* upcoming movies row */}
              {upcomingMovies.length > 0 && <MovieList hideSeeAll={false} title="Upcoming" data={upcomingMovies} />}


            {/* top rated movies row */}
              {topRatedMovies.length > 0 && <MovieList hideSeeAll={false} title="Top Rated" data={topRatedMovies} />}

          </ScrollView>
        )
      }

    </View>

  )
}

const makeStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.bgNeutral900,
  },
  bodyContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
  },
  text: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default HomeScreen;