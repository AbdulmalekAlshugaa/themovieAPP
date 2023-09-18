import { Dimensions, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useNavigation } from '@react-navigation/native'
import { TextInput, Text, Button } from 'react-native-paper'
import { View } from 'react-native-animatable'
import { LoginFlow } from '../app/helper/utilts'

const LoginScreen = () => {
    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        const login = LoginFlow(email, password);

        if (login) {
            navigation.navigate('Home')
        }
    }




    return (
        <SafeAreaView style={makeStyle.container}>
            <View style={makeStyle.header}>
                < Text style={makeStyle.text} >
                    {"Welcome to \n Movie App"}
                </Text >
            </View>

            <View >
                <TextInput
                    mode="outlined"
                    label="Email"
                    placeholder="Enter your email"
                    placeholderTextColor={'lightgray'}
                    style={makeStyle.input}
                    textColor='white'
                    activeUnderlineColor='white'
                    activeOutlineColor='white'
                    onChangeText={text => setEmail(text)}

                />
                <TextInput
                    mode="outlined"
                    label="password"
                    placeholder="Enter your password"
                    placeholderTextColor={'lightgray'}
                    style={makeStyle.input}
                    secureTextEntry={true}
                    textColor='white'
                    activeUnderlineColor='white'
                    activeOutlineColor='white'
                    onChangeText={text => setPassword(text)}
                />
            </View>

            <View style={makeStyle.button}>
                <Button
                    buttonColor='#334155'
                    mode="contained"
                    onPress={() => handleLogin()}>
                    Login
                </Button>
            </View>
        </SafeAreaView>
    )
}

const makeStyle = StyleSheet.create({
    container: {
        backgroundColor: '#121212',
        flex: 1,
    },
    header: {
        backfaceVisibility: 'visible',

        height: Dimensions.get('window').height / 3,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        color: 'white',
        textAlign: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 2,
    },
    input: {
        marginHorizontal: 16,
        marginVertical: 8,
        backgroundColor: '#121212',
    },

    button: {
        marginHorizontal: 16,
        marginVertical: 32,
        backgroundColor: '#121212',
    },

});

export default LoginScreen