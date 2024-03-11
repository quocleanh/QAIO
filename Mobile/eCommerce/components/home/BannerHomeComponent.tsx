import Carousel from 'react-native-snap-carousel';
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import style from '../../styles/home';


const BannerHomeComponent = ({ navigation }: { navigation: any }) => {
    const listCasual = [];
    listCasual.push({ Name: '', Image: `https://lzd-img-global.slatic.net/g/ot/homepage/fd4a1297755d97f6073ec4ff39ea6ba9.jpeg_760x760q80.jpg_.webp` });
    listCasual.push({ Name: '', Image: `https://lzd-img-global.slatic.net/g/ot/homepage/71286ba31f645d748e327b9e00f2f1af.jpeg_760x760q80.jpg_.webp` });
    listCasual.push({ Name: '', Image: `https://lzd-img-global.slatic.net/us/lazgcp/3d563bae-70a1-41b2-b6a3-16beba8a8b11_VN-1125-345.png_760x760q80.png_.webp` });

    return (

        <View style={style.banner}>
            <View style={{ flexDirection: 'column' }}>
                <Carousel
                    nestedScrollEnabled
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
