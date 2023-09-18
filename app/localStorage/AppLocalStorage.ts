const key = 'authToken';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthToken = () => {
    return localStorage.getItem(key);
}

const storeToken = async (token: string) => {
    try {
        await AsyncStorage.setItem(key, token);
    } catch (e) {
        console.error(e);
    }
};

