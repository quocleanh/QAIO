import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, ImageBackground, RefreshControl, StatusBar } from 'react-native';

import style from '../styles/home';
import { Header, Image } from 'react-native-elements';
import COLORS from '../consts/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import BannerHomeComponent from '../components/home/BannerHomeComponent';
import FlashSaleComponent from '../components/home/FlashSaleComponent';
import VouchersStationComponent from '../components/home/VouchersStationComponent';
import CategoryComponent from '../components/home/CategoryComponent';
import ProductsRecommendComponent from '../components/home/ProductsRecommendComponent';
import PromotionComponent from '../components/home/PromotionComponent';


import FooterComponent from '../components/_FooterComponent';
import HeaderComponent from '../components/_HeaderComponent';
const HomeScreen = ({ navigation }: { navigation: any }) => {
    const [refreshing, setRefreshing] = React.useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        setTimeout(() => {
            setRefreshing(false);
        }, 2000);
    }, []);


    useEffect(() => {
        console.clear();
        navigation.setOptions({
            headerShown: false,
        });
    });
    return (
        <SafeAreaView style={style.bg_light}>
            <StatusBar backgroundColor={COLORS.Primary} barStyle="dark-content" />
            <HeaderComponent navigation={navigation} />
            <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                <BannerHomeComponent navigation={navigation} />
                <CategoryComponent navigation={navigation} />
                <PromotionComponent navigation={navigation} />
                <VouchersStationComponent navigation={navigation} />
                <FlashSaleComponent navigation={navigation} />
                <ProductsRecommendComponent navigation={navigation} />
            </ScrollView>
            {/* <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                    <BannerHomeComponent navigation={navigation} />
                    <CategoryComponent navigation={navigation} />
                    <PromotionComponent navigation={navigation} />
                    <VouchersStationComponent navigation={navigation} />
                    <FlashSaleComponent navigation={navigation} />
                    <ProductsRecommendComponent navigation={navigation} />
                </ScrollView>  */}


        </SafeAreaView>
    );
};
export default HomeScreen;
