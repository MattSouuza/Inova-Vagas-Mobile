import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';

const navigation = useNavigation();

export default function Logout() {
    
    AsyncStorage.removeItem('token-inova');
    navigation.navigate('Login');
}