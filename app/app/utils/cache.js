import AsyncStorage from '@react-native-async-storage/async-storage';
import dayjs from 'dayjs';

const prefix = 'cache';
const expiryInMinutes = 5;

const store = async (key, value) => {
    try {
        const item = { value, timestamp: Date.now() };
        await AsyncStorage.setItem(`${prefix}${key}`, JSON.stringify(item));
    } catch (error) {
        throw new Error(error);
    }
};

const isExpired = (item) => {
    const now = dayjs();
    const storedTime = dayjs(item.timestamp);
    return now.diff(storedTime, 'minute') > expiryInMinutes;
};

// eslint-disable-next-line consistent-return
const get = async (key) => {
    try {
        const value = await AsyncStorage.getItem(`${prefix}${key}`);
        const item = value ? JSON.parse(value) : null;

        if (isExpired(item)) {
            await AsyncStorage.removeItem(`${prefix}${key}`);
            return null;
        }

        return item.value;
    } catch (error) {
        throw new Error(error);
    }
};

export default { store, get };