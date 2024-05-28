import AsyncStorage from '@react-native-async-storage/async-storage/lib/typescript/AsyncStorage';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, Text } from 'react-native';
import { Header } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

const CartScreen = () => {

    return (

        <View>
            <Header 
            containerStyle={{
                backgroundColor: '#00A79D',
                justifyContent: 'space-around',
            }}
            leftComponent={{
                icon: 'arrow-back',
                color: '#fff',
                onPress: () => { useNavigation().goBack()},
            }}
            centerComponent={{
                iconStyle: { color: '#fff' },
                text: 'Giỏ hàng',
                style: {
                    color: '#fff', fontSize: 20, fontWeight: 'bold'
                }

            }}
            />
            <SafeAreaProvider>
                <SafeAreaView>
                    
                        <Text>Cart Screen</Text>
                    
                </SafeAreaView>
            </SafeAreaProvider>
        </View>


    );
};

export default CartScreen;
