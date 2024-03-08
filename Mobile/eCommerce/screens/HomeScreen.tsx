import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator, ImageBackground } from 'react-native';

import style from '../styles/home';
import { Image } from 'react-native-elements';
import COLORS from '../consts/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
import BannerHomeComponent from '../components/home/BannerHomeComponent';
import { BackgroundImage } from 'react-native-elements/dist/config';
const HomeScreen = ({ navigation }: { navigation: any }) => {
    const listCategory = [];
    listCategory.push({ Name: 'LazMall', Image: `http://localhost:8081/assets/img/icon/category_6.webp` });
    listCategory.push({ Name: '3 món từ 24k', Image: `http://localhost:8081/assets/img/icon/category_4.webp` });
    listCategory.push({ Name: 'Săn xu', Image: `http://localhost:8081/assets/img/icon/category_16.webp` });
    listCategory.push({ Name: 'Trồng cây hái quả', Image: `http://localhost:8081/assets/img/icon/category_14.webp` });
    listCategory.push({ Name: 'Nạp thẻ & Dịch vụ', Image: `http://localhost:8081/assets/img/icon/category_3.webp` });
    listCategory.push({ Name: 'LazLive', Image: `http://localhost:8081/assets/img/icon/category_15.webp` });
    listCategory.push({ Name: 'Xem thêm', Image: `http://localhost:8081/assets/img/icon/category_17.webp` });

    const listVoucher = [];

    for (let i = 1; i <= 2; i++) {
        const vc = genVoucher();
        listVoucher.push({ Name: 'Giảm ' + vc, Value: vc, Description: 'Voucher giảm giá' });
    }

    const listPromoHero = [];

    listPromoHero.push({ Name: 'Điện thoại và công nghệ ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sc6ad474d9a944c60886d0a815a332f97T.jpg_400x400q80.jpg_.webp' });
    listPromoHero.push({ Name: 'Giảm 50% ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sf1dcd52b0c0544b3a0ea10aa0e0655a8k.png_400x400q80.png_.webp' });
    listPromoHero.push({ Name: 'Freeship toàn quốc ', Value: '', Image: 'https://lzd-img-global.slatic.net/g/p/5b3ba5caef75d36b78b714bb2705fd18.jpg_400x400q80.jpg_.webp' });

    const listFlashsales = [];
    listFlashsales.push({ Name: ' ', Price: 923000, Discount: 20, Image: 'https://lzd-img-global.slatic.net/g/p/f2c9bf5d673e40d526219f2bdcfd6b4e.png_228x228q80.png_.webp', Desc: 'Trợ Giá 50.000₫' });
    listFlashsales.push({ Name: ' ', Price: 858000, Discount: 28, Image: 'https://lzd-img-global.slatic.net/g/ff/kf/Sdbb3ecf0f827487e989c4c554b9fa07fJ.jpg_228x228q80.jpg_.webp', Desc: 'Giảm 10% khi mua 2 sản phẩm' });
    listFlashsales.push({ Name: ' ', Price: 285000, Discount: 29, Image: 'https://lzd-img-global.slatic.net/g/p/59e6b1155a2081e20909f796b23d4990.png_228x228q80.png_.webp', Desc: 'Trợ Giá 44.000₫' });
    //listFlashsales.push({ Name: ' ', Price: 516000, Discount: 17, Image: 'https://lzd-img-global.slatic.net/g/p/dd902c670c0925559ec3b92baa7c87b0.jpg_228x228q80.jpg_.webp', Desc: 'Trợ Giá 24.000₫' });


    const numColumns = Math.ceil(listCategory.length / 2);

    function genVoucher() {
        const words = ['10k', '20k', '30k', '40k', '50k', '60k', '70k', '80k', '90k', '100k'];
        const randomWords = [];
        for (let i = 0; i < 1; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words.splice(randomIndex, 1);
            randomWords.push(word);
        }
        console.log(randomWords.join(' '));
        return randomWords.join(' ');
    }
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,

        });
    });
    return (
        <SafeAreaProvider>
            <SafeAreaView style={style.bg_light}>
                <ScrollView showsVerticalScrollIndicator>
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
                    <View style={style.banner}>
                        <BannerHomeComponent navigation={navigation} />
                    </View>

                    <View style={style.category}>
                        <View style={{ paddingHorizontal: 10 }}>
                            <ScrollView
                                horizontal
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={false}
                                contentContainerStyle={{ paddingVertical: 30, alignContent: 'flex-start' }}>
                                {listCategory.map((item, index) => (
                                    <View style={{ justifyContent: 'center', height: 80, width: 80, margin: 'auto' }}>
                                        <Image source={{ uri: item.Image }}
                                            style={{ width: 70, height: 70, margin: 'auto' }} />
                                        <Text numberOfLines={2}
                                            style={{ textAlign: 'center', fontSize: 12, padding: 5 }}>{item.Name}</Text>
                                    </View>
                                ))}

                            </ScrollView>

                        </View>
                    </View>
                    <View style={style.sales}>
                        <ImageBackground
                            source={require('../assets/img/banner-sale.jpg')}
                            style={{
                                width: Dimensions.get('window').width,
                                height: 200,
                            }}
                        >
                            <View style={{ marginTop: 35, paddingHorizontal: 10 }}>
                                <FlatList
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
                    <View style={{ backgroundColor: COLORS.Red }}>
                        <View style={style.vouchers} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.White, alignContent: 'space-around' }} >
                                <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Trạm Voucher</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: COLORS.Primary }}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View style={{ flex: 1, flexDirection: 'row', }}>
                                <FlatList
                                    data={listVoucher}
                                    numColumns={2}
                                    keyExtractor={(item, index) => index.toString()}
                                    renderItem={({ item, index }) => {
                                        return (
                                            <View style={{ flex: 1, flexDirection: 'column', margin: 5, backgroundColor: '#e9f9f8', borderRadius: 10, padding: 10 }}>
                                                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', alignContent: 'center' }}>
                                                    <Text style={{ fontSize: 14, color: '#55b2af', fontWeight: 'bold', textAlign: 'left', flex: 1 }}>Giảm {item.Value}</Text>
                                                    <Text style={{ fontSize: 12, backgroundColor: '#55b2af', paddingVertical: 5, color: COLORS.White, borderRadius: 5, paddingHorizontal: 20 }}>Lấy</Text>
                                                </View>
                                                <Text style={{ fontSize: 12, color: '#55b2af' }}>{item.Description}</Text>
                                            </View>
                                        );
                                    }}
                                />
                            </View>
                        </View>
                    </View>
                    <View style={style.flashsale} >
                        <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.White, alignContent: 'space-around' }} >
                            <View style={{ alignContent: 'center', flex: 1, flexDirection: 'row', justifyContent: 'space-around', backgroundColor: COLORS.Transparent }}>
                                <Image source={require('../assets/img/flash-sale.png')}
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
                                                        source={require('../assets/img/fl-price.png')}
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
                                }}
                            />
                        </View>
                    </View>

                    <View style={{
                        backgroundColor: COLORS.Light, justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                        <FlatList
                            data={[1, 2, 3, 4, 5, 6, 7, 8, 9]}
                            numColumns={2}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={style.product_recommend}>
                                        <Text>Product</Text>
                                    </View>
                                );
                            }}
                        />
                    </View>
                </ScrollView>


            </SafeAreaView>
        </SafeAreaProvider >

    );
};
export default HomeScreen;
