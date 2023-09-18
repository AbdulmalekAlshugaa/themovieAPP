import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react'
import { fallbackPersonImage, image185, image342 } from '../app/api/moviedb';
var {width, height} = Dimensions.get('window');

export default function Cast({cast, navigation}) {
  return (
    <View className="my-6">
          <Text style={{
              color: 'white',
              fontSize: 20,     // equivalent to "text-xl"
              marginHorizontal: 16, // equivalent to "mx-4"
              marginBottom: 16,     // equivalent to "mb-5"

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
                                    overflow: 'hidden',  // equivalent to "overflow-hidden"
                                    borderRadius: 40,   // equivalent to "rounded-full" (assuming a 2x radius)
                                    height: 80,          // equivalent to "h-20" (adjust as needed)
                                    width: 80,           // equivalent to "w-20" (adjust as needed)
                                    alignItems: 'center',  // equivalent to "items-center"
                                    borderColor: '#D1D5DB', // equivalent to "border-neutral-500"
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