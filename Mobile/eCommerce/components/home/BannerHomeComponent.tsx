import Carousel from 'react-native-snap-carousel';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import style from '../../styles/home';


const BannerHomeComponent = ({ navigation }: { navigation: any }) => {
    const listCasual = [];
    listCasual.push({ Name: '', Image: `https://vn-test-11.slatic.net/shop/1bd337b687b0f7f0f423af89ec58bc59.png` });
    listCasual.push({ Name: '', Image: `https://vn-test-11.slatic.net/shop/15640e14af10bd0eadecc7ce4c084b9f.png` });
    listCasual.push({ Name: '', Image: `https://vn-test-11.slatic.net/shop/c13f8c16e7421fd5fad90204fa4aaa87.png` });

    return (

        <View style={style.banner}>
            <View style={{ flexDirection: 'column' }}>
                <Carousel 
                    nestedScrollEnabled={true}
                    layout={"default"}
                    data={listCasual} 
                    sliderWidth={Dimensions.get('screen').width}
                    itemWidth={Dimensions.get('screen').width - 20}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity   >
                                <View style={style.bannerItem}>
                                    <Image source={{ uri: item.Image }} style={{ width: '100%', height: 135, borderRadius: 10 }} />
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                />
            </View>
        </View>


    );
};

export default BannerHomeComponent;
