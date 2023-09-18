import { View, Text, Dimensions, StyleSheet } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import { styles, theme } from '../app/theme';
const { width, height } = Dimensions.get('window');

export default function Loading() {
  return (
    <View style={[{ height, width }, makeStyle.container]} >
      <Progress.CircleSnail thickness={12} size={160} color={theme.background} />
    </View>
  )
}

const makeStyle = StyleSheet.create({
  container: {
    position: 'absolute',  // equivalent to "absolute"
    flexDirection: 'row', // equivalent to "flex-row"
    justifyContent: 'center', // equivalent to "justify-center"
    alignItems: 'center',   // equivalent to "items-center"
  },
});