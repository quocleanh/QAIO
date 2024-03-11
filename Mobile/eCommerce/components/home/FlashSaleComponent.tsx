
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import style from '../../styles/home';
import { ImageBackgroundBase } from 'react-native';
import COLORS from '../../consts/colors';
interface FlashSaleProps {
     
}
const FlashSaleComponent = ({ navigation }: { navigation: any }) => {  
    
    const listFlashsales = [];
    listFlashsales.push({ Name: ' ', Price: 923000, Discount: 20, Image: 'https://lzd-img-global.slatic.net/g/p/f2c9bf5d673e40d526219f2bdcfd6b4e.png_228x228q80.png_.webp', Desc: 'Trợ Giá 50.000₫' });
    listFlashsales.push({ Name: ' ', Price: 858000, Discount: 28, Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sdbb3ecf0f827487e989c4c554b9fa07fJ.jpg_228x228q80.jpg_.webp', Desc: 'Giảm 10% khi mua 2 sản phẩm' });
    listFlashsales.push({ Name: ' ', Price: 285000, Discount: 29, Image: 'https://lzd-img-global.slatic.net/g/p/59e6b1155a2081e20909f796b23d4990.png_228x228q80.png_.webp', Desc: 'Trợ Giá 44.000₫' });
    //listFlashsales.push({ Name: ' ', Price: 516000, Discount: 17, Image: 'https://lzd-img-global.slatic.net/g/p/dd902c670c0925559ec3b92baa7c87b0.jpg_228x228q80.jpg_.webp', Desc: 'Trợ Giá 24.000₫' });




    return (
        <View style={style.flashsale}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.White, alignContent: 'space-around' }}>
                <View style={{ alignContent: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.Transparent }}>
                    <Image source={require('../../assets/img/flash-sale.png')}
                        style={{ width: 90, height: 20, marginTop: 5 }} />
                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
                        <Text style={style.countdown_item}>12</Text>
                        <Text style={style.countdown_item}>59</Text>
                        <Text style={style.countdown_item}>59</Text>
                    </View>
                </View>
                <TouchableOpacity>
                    <Text style={{ color: COLORS.Primary, lineHeight: 30 }}>Xem thêm</Text>
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.White, alignContent: 'space-around' }}>
                <FlatList 
                    nestedScrollEnabled
                    data={listFlashsales}
                    numColumns={3}
                    keyExtractor={(item, index) => index.toString()}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{
                                flex: 1,
                                flexDirection: 'column',
                                margin: 5, backgroundColor: COLORS.White,
                                borderRadius: 10,
                                padding: 0,
                                paddingTop: 0, alignItems: 'center',
                                alignContent: 'center', height: 150,
                                width: 100
                            }}>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Image source={{ uri: item.Image }}
                                        style={{
                                            borderRadius: 10,
                                            height: 120,
                                            width: 110,
                                            marginBottom: 7
                                        }} />
                                    <View style={{}}>
                                        <ImageBackground
                                            source={require('../../assets/img/fl-price.png')}
                                            style={{
                                                flex: 1, flexDirection: 'row',
                                                justifyContent: 'space-between',

                                                width: 110,
                                                height: 25,
                                                paddingHorizontal: 5
                                            }}
                                        >
                                            <Text style={{ fontSize: 13, color: COLORS.Black, paddingVertical: 5 }} numberOfLines={1}>{item.Price.toFixed(0).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}</Text>
                                            <Text style={{ fontSize: 11, color: COLORS.White, paddingVertical: 5, fontWeight: '800' }} numberOfLines={1}>
                                                -{item.Discount.toFixed(0)}%
                                            </Text>
                                        </ImageBackground>
                                    </View>
                                </View>
                            </View>
                        );
                    } } />
            </View>
        </View>

    );
} 
export default FlashSaleComponent;