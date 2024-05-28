import React, { useEffect, useState } from 'react';
import { View, Text, Alert, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaView } from 'react-native-safe-area-context';

const AccountScreen = ({ navigation }: { navigation: any }) => {
    interface User {
        _id: string;
        name: string;
        email: string;
        google_id: string;
        avatar: string;
        is_verified: boolean;
        role_id: number;
        language: string;
        created_time: number;
        updated_time: number;
    }

    interface LoginResponse {
        msg: string;
        msg_key: string;
        data: {
            user: User;
            token: string;
            refresh_token: string;
        };
    }

    const [userLogin, setUserLogin] = useState<LoginResponse>();
    useEffect(() => {
        const getUserLogin = async () => {
            try {
                let usersString = await AsyncStorage.getItem('LoginUser');
                if (usersString !== null) {
                    let users: LoginResponse = JSON.parse(usersString);
                    setUserLogin(users);
                }
            } catch (error) {
                navigation.navigate('Login');
                console.log('Error retrieving UserLogin from AsyncStorage:', error);
            }
        };

        getUserLogin();
    }, []);

    return (
        <SafeAreaView>
            <ScrollView>
                <View>
                    <Text>Welcome to the Home Page,  {userLogin?.data.user.name}!</Text>


                </View>
            </ScrollView>
        </SafeAreaView>

    );
};

export default AccountScreen;