import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185 } from '../app/api/moviedb';


const Cast = ({ cast, navigation }) => {
  return (
    <View className="my-6">
          <Text style={{
              color: 'white',
              fontSize: 20,
              marginHorizontal: 16,
              marginBottom: 16,    

          }}>Top Cast</Text>
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                cast && cast.map((person, index)=>{
                    return (
                        <TouchableOpacity 
                            key={index} 
                            onPress={()=> navigation.navigate('Person', person)} 
                            style={{
                                marginRight: 16,
                                alignItems: 'center',
                            }}>
                            <View 
                                style={{
                                    overflow: 'hidden',
                                    borderRadius: 40,
                                    height: 80,
                                    width: 80,
                                    alignItems: 'center',
                                    borderColor: '#D1D5DB',
                                    borderWidth: 1,
                                }}

                            >
                                <Image 
                                    style={{
                                        borderRadius: 16,
                                        height: 96,
                                        width: 80,
                                    }}
                                    // source={require('../assets/images/castImage1.png')} 
                                    source={{uri: image185(person?.profile_path) || fallbackPersonImage}} 
                                />
                            </View>
                            
                            <Text
                                style={{
                                    color: 'white',
                                    fontSize: 14,     // equivalent to "text-base"
                                    marginTop: 8,     // equivalent to "mt-2"
                                }}
                            >

                                {
                                    person?.character.length>10? person.character.slice(0,10)+'...' : person?.character
                                }
                            </Text>
                            <Text style={{
                                color: '#9CA3AF', // equivalent to "text-neutral-400"
                                fontSize: 12,
                            }}>
                                {
                                    person?.original_name.length>10? person.original_name.slice(0,10)+'...' : person?.original_name
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
            
        </ScrollView>

    </View>
  )
}


import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
    container: {
        marginVertical: 6,
    },
    sectionTitle: {
        color: 'white',
        fontSize: 20,
        marginHorizontal: 16,
        marginBottom: 16,
    },
    scrollView: {
        flexDirection: 'row',
    },
    castItemContainer: {
        marginRight: 16,
        alignItems: 'center',
    },
    castImageContainer: {
        overflow: 'hidden',
        borderRadius: 40,
        height: 80,
        width: 80,
        alignItems: 'center',
        borderColor: '#D1D5DB',
        borderWidth: 1,
    },
    castImage: {
        borderRadius: 16,
        height: 96,
        width: 80,
    },
    castCharacter: {
        color: 'white',
        fontSize: 14,
        marginTop: 8,
    },
    castName: {
        color: '#9CA3AF',
        fontSize: 12,
    },
});

export default Cast
