import React from 'react';
import { View, Image, StyleSheet, Text } from 'react-native';
import COLORS from '../consts/colors';

const WelcomeScreen = ({ navigation }: { navigation: any }) => {
    // tự động chuyển đến homescreen sau 3s
    setTimeout(() => {
        navigation.navigate('Home')
    }, 500);
    return (
        <View style={styles.container}>
            <Image source={require('../assets/img/logo-white.png')} style={styles.logo} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: COLORS.Primary,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    logo: {
        elevation: 10,
        width: 200,
        height: 200,
        resizeMode: 'contain',
    }
});
export default WelcomeScreen;