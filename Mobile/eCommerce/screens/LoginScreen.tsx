import React, { useState } from 'react';
import { TextInput, View, Alert, Image, StyleSheet, ImageBackground, TouchableOpacity, StatusBar } from 'react-native';
import { Button, Text } from 'react-native-elements';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {
    SafeAreaView,
} from 'react-native';

const handleForgotPassword = () => {
    Alert.alert('Thông tin', 'Vui lòng liên IT BFO để được hỗ trợ');
};

const LoginScreen = ({ navigation }: { navigation: any }) => { 
    const [username, setUsername] = useState('quoc.leanh.001@gmail.com');
    const [password, setPassword] = useState('Quoc@123');
    const [showPassword, setShowPassword] = useState(false);
    const toggleShowPassword = () => {
        setShowPassword(!showPassword);
    };
    const handleLogin = async () => {

        username.trim();
        password.trim();
        const users = await CheckLogin(username, password);
        if (users) {
            try {
                const usersData = users; // Wait for the Promise to resolve
                const usersString = JSON.stringify(usersData); // Convert the result to a string
                let response = JSON.parse(usersString);

                if (response.msg_key == '_LOGIN_SUCCESS_') {
                    //Kiểm tra xem access token và resfresh token còn hạn không
                    let access_token = response.data.access_token;
                    let refresh_token = response.data.refresh_token;
                    await AsyncStorage.setItem('LoginUser', usersString);
                    navigation.navigate('Home');
                }
                else {

                    Alert.alert('Thông tin', 'Tài khoản hoặc mật khẩu không đúng');
                }

            } catch (error) {
                console.log('Error saving login information:', error);
            }
        }
        else {
            Alert.alert('Thông tin', 'Tài khoản hoặc mật khẩu không đúng');
        }
    };
    async function CheckLogin(username: string, password: string) {
        try {  
            // let json = await response.json();
            let response =
            {
                "msg": "LOGIN_SUCCESS",
                "msg_key": "_LOGIN_SUCCESS_",
                "data": {
                    "user": {
                        "_id": "641727e8b47cd32bc93e0d6a",
                        "name": "Quốc Lê",
                        "email": "quoc.leanh.001@gmail.com",
                        "google_id": "106195142741860161807",
                        "avatar": "https://lh3.googleusercontent.com/a/AGNmyxaW_6ZKODeHCx1IakmUCFOQ1LNObNQmkBK-qfiZZA=s96-c",
                        "is_verified": true,
                        "role_id": 3,
                        "language": "vi",
                        "created_time": 1679239144,
                        "updated_time": 1703132453
                    },
                    "token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NDE3MjdlOGI0N2NkMzJiYzkzZTBkNmEiLCJyb2xlaWQiOjMsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJxdW9jLmxlYW5oLjAwMUBnbWFpbC5jb20iLCJ0eXBlIjoiMSIsImlzX3ZlcmlmeSI6MSwiaXNzIjoiR29vbm1hLmNvbSIsImV4cCI6MTcwMzE0MDk5Mn0.vT86tXDjxu27O2v6JKveRwfYukKxWIbSHVKGi1uqShorCMzxAXq5k-C4H9_i7wkg9mbDISrZVPQvBzKB0eO1sQ",
                    "refresh_token": "eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiI2NDE3MjdlOGI0N2NkMzJiYzkzZTBkNmEiLCJyb2xlaWQiOjMsInVzZXJuYW1lIjoiIiwiZW1haWwiOiJxdW9jLmxlYW5oLjAwMUBnbWFpbC5jb20iLCJ0eXBlIjoiMiIsImlzX3ZlcmlmeSI6MSwiaXNzIjoiR29vbm1hLmNvbSIsImV4cCI6MTcwMzc0NDA5Mn0.YN59bZleu9Fc41Gvte9xQu942Xxd0XNxnWw0hw7Y5xdFReU_U63VbjbFmLJ2yupbfjcf7pbqQeceWvN2uX8IGg"
                }
            }
            return response;
        } catch (error) {
            console.error(error);
        }
    }
    return ( 
        <ImageBackground blurRadius={90}
            source={require('../assets/img/bg-2.png')} style={styles.containerbg} >
            <StatusBar barStyle={'light-content'} />
            <View style={{ flex: 2}} >
                <Image resizeMode="contain" source={require('../assets/img/logo-white.png')} style={styles.logo}>
                </Image>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Tên đăng nhập"
                    placeholderTextColor="#fff"
                    value={username}
                    onChangeText={setUsername}
                    autoCapitalize="none"
                />
                <TextInput
                    autoCapitalize="none"
                    placeholder="Mật khẩu"
                    secureTextEntry={!showPassword} // Toggle secureTextEntry based on showPassword state
                    style={styles.TextInput}
                    value={password}
                    onChangeText={setPassword}
                    placeholderTextColor="#fff"
                />
                <TouchableOpacity onPress={toggleShowPassword} style={styles.toggleButton}>
                    <Image
                        source={showPassword ? require('../assets/icon/eye.png') : require('../assets/icon/eye-off.png')}
                        style={[styles.eyeIcon, { tintColor: 'white' }]}
                    />
                </TouchableOpacity>
                <Button onPress={handleLogin}
                    title="Đăng nhập"
                    loading={false}
                    loadingProps={{ size: 'small', color: 'white' }}
                    buttonStyle={{
                        backgroundColor: '#961b1e',
                        borderRadius: 100,
                    }}
                    titleStyle={{ fontWeight: 'bold', fontSize: 23 }}
                    containerStyle={{
                        marginHorizontal: 50,
                        height: 50,
                        width: 200,
                        marginVertical: 10,
                    }}
                />

                <Text onPress={handleForgotPassword}>Quên mật khẩu?</Text>
            </View> 
        </ImageBackground>
    );
};
const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        paddingTop: 50,
    },
    containerbg: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {

    },
    SafeAreaView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    TextInput: {
        height: 50,
        width: 300,
        margin: 12,
        padding: 10,
        fontSize: 17,
        borderBottomWidth: 1,
        borderBottomColor: '#fff',
        backgroundColor: 'transparent',
        borderWidth: 0,
        color: '#fff', // Set the text color to white
    },
    tinyLogo: {
        borderColor: '#fff',
        paddingBottom: 50,
        width: 50,
        height: 50,
    },
    logo: {
        height: 250,
        marginBottom: -70
    },
    loginButton: {
        marginTop: 20,
        backgroundColor: '#3498db',
        paddingVertical: 15,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    toggleButton: {
        padding: 10,
        top: -65,
        right: 0,
        left: 130,
        width: '100%',
    },
    eyeIcon: {
        width: 30,
        height: 30,
    }
});
export default LoginScreen;
