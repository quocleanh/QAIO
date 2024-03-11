
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import style from '../../styles/home';
import { ImageBackgroundBase } from 'react-native';
import COLORS from '../../consts/colors';
interface PromotionProps {
     
}
const PromotionComponent = ({ navigation }: { navigation: any }) => {  
    
    const listPromoHero = [];
    listPromoHero.push({ Name: 'Điện thoại và công nghệ ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sc6ad474d9a944c60886d0a815a332f97T.jpg_400x400q80.jpg_.webp' });
    listPromoHero.push({ Name: 'Giảm 50% ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sf1dcd52b0c0544b3a0ea10aa0e0655a8k.png_400x400q80.png_.webp' });
    listPromoHero.push({ Name: 'Freeship toàn quốc ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/p/5b3ba5caef75d36b78b714bb2705fd18.jpg_400x400q80.jpg_.webp' });

 


    return (
        <View style={style.sales}>
        <ImageBackground
            source={require('../../assets/img/banner-sale.jpg')}
            style={{
                width: Dimensions.get('window').width,
                height: 200,
            }}
        >
            <View style={{ marginTop: 35, paddingHorizontal: 10 }}>
                <FlatList
                    scrollEnabled={false}
                    data={listPromoHero}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 5, backgroundColor: 'rgb(247, 226, 223)',
                                borderRadius: 10,
                                padding: 10,
                                paddingTop: 5, alignItems: 'center',
                                alignContent: 'center', height: 150,
                                width: 100
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Image source={{ uri: item.Image }}
                                        style={{
                                            borderRadius: 10,
                                            height: 100,
                                            width: 110,
                                        }} />
                                    <Text style={{ fontSize: 14, color: COLORS.Black, paddingVertical: 5 }} numberOfLines={1}>{item.Name}</Text>
                                </View>
                            </View>
                        );
                    }}
                />
            </View>
        </ImageBackground>
    </View>

    );
} 
export default PromotionComponent;