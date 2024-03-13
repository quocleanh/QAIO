import Carousel from 'react-native-snap-carousel';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import style from '../styles/home';


const _HeaderComponent = ({ navigation }: { navigation: any }) => {

    return (

        <View style={style.header}>
            <View>
                <Image source={require('../assets/img/icon/scan_gif_50.gif')}
                    style={{ width: 25, height: 25 }} />
            </View>
            <View style={style.search_box}>
                <View style={{ flex: 1, flexDirection: 'row', alignContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/img/icon/camera-158-32.png')}
                        style={{ width: 30, height: 30 }} />
                    <Text style={{ paddingHorizontal: 10 }}>How are you, today?</Text>
                </View>
                <View style={{}}>
                    <View style={{}}>
                        <Text style={[style.search_button]}>Tìm</Text>
                    </View>
                </View>
            </View>
            <View>
                <Image source={require('../assets/img/icon/wallet-118-32.png')}
                    style={{ width: 30, height: 30 }} />
            </View>
        </View>

    );
};

export default _HeaderComponent;
