import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, ActivityIndicator } from 'react-native';

import style from '../styles/home';
import { Image } from 'react-native-elements';
import COLORS from '../consts/colors';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { FlatList } from 'react-native-gesture-handler';
const HomeScreen = ({ navigation }: { navigation: any }) => {
    const listCategory = [];
    for (let i = 1; i <= 20; i++) {
        listCategory.push({ Name: genName(), Image: `assets/img/icon/category_${i}.webp` });
    }
    const listCasual = [];
    listCasual.push({ Name: genName(), Image: `https://lzd-img-global.slatic.net/g/ot/homepage/fd4a1297755d97f6073ec4ff39ea6ba9.jpeg_760x760q80.jpg_.webp` });
    listCasual.push({ Name: genName(), Image: `https://lzd-img-global.slatic.net/g/ot/homepage/71286ba31f645d748e327b9e00f2f1af.jpeg_760x760q80.jpg_.webp` });
    listCasual.push({ Name: genName(), Image: `https://lzd-img-global.slatic.net/us/lazgcp/3d563bae-70a1-41b2-b6a3-16beba8a8b11_VN-1125-345.png_760x760q80.png_.webp` });

    const listVoucher = [];

    for (let i = 1; i <= 3; i++) {
        const vc = genVoucher();
        listVoucher.push({ Name: 'Giảm ' + vc, Value: vc });
    }

    const numColumns = Math.ceil(listCategory.length / 2);
    function genName() {
        const words = ['Điện tử', 'Thời trang', 'Sách', 'Nhà cửa', 'Làm đẹp', 'Thể thao', 'Đồ chơi', 'Thực phẩm', 'Sức khỏe', 'Vườn'];
        const randomWords = [];
        for (let i = 0; i < 2; i++) {
            const randomIndex = Math.floor(Math.random() * words.length);
            const word = words.splice(randomIndex, 1);
            randomWords.push(word);
        }
        return randomWords.join(' ');
    }
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
                            <View style={{ paddingHorizontal: 5, borderColor: COLORS.Primary, borderRadius: 50 }}>
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
                    <FlatList
                        horizontal
                        indicatorStyle='white'
                        pagingEnabled
                        initialScrollIndex={0}
                        snapToInterval={Dimensions.get('screen').width - 40}
                        inverted={true} // invert the list
                        decelerationRate="fast" // Control the speed of the scroll animation
                        automaticallyAdjustContentInsets={true}
                        showsVerticalScrollIndicator={true}
                        showsHorizontalScrollIndicator={true}
                        data={listCasual}
                        renderItem={({ item }) => {
                            return (
                                <View style={{ alignContent: 'center', justifyContent: 'center' }}>
                                    <Image source={{ uri: item.Image }}
                                        style={{ height: 123, width: Dimensions.get('screen').width - 40, borderRadius: 15 }} />
                                </View>
                            );
                        }}
                    />

                </View>
                <View style={style.category}>
                    <View style={{}}>
                        <ScrollView
                            horizontal
                            showsVerticalScrollIndicator={false}
                            showsHorizontalScrollIndicator={false}
                            contentContainerStyle={{ paddingVertical: 20 }}>
                            <FlatList
                                scrollEnabled={false}
                                contentContainerStyle={{
                                    alignSelf: 'flex-start',
                                }}
                                numColumns={numColumns}
                                showsVerticalScrollIndicator={false}
                                showsHorizontalScrollIndicator={true}
                                data={listCategory}
                                renderItem={({ item }) => {
                                    return (
                                        <View style={{ alignContent: 'center', justifyContent: 'center', paddingHorizontal: 10, width: 80 }}>
                                            <Image source={{ uri: 'http://localhost:8081/' + item.Image }}
                                                style={{ width: 50, height: 60 }} />
                                            <Text numberOfLines={2} style={{ textAlign: 'center', fontSize: 11 }}>{item.Name}</Text>
                                        </View>
                                    );
                                }}
                            />
                        </ScrollView>
                        <View style={{ }} >
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 20, paddingVertical: 10, backgroundColor: COLORS.Pink, alignContent: 'space-around' }} >
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Voucher</Text>
                                <TouchableOpacity>
                                    <Text style={{ color: COLORS.Primary }}>Xem thêm</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <View>
                                    <FlatList
                                        horizontal
                                        showsVerticalScrollIndicator={false}
                                        showsHorizontalScrollIndicator={false}
                                        data={listVoucher}
                                        renderItem={({ item }) => {
                                            return (
                                                <View style={{ paddingHorizontal: 10, paddingVertical: 10, backgroundColor: COLORS.White, borderRadius: 10, marginHorizontal: 10, marginVertical: 5 }}>
                                                    <Text style={{ fontSize: 16, fontWeight: 'bold' }}>{item.Name}</Text>
                                                    <Text style={{ fontSize: 12, color: COLORS.Grey }}>Hết hạn: 31/12/2021</Text>
                                                </View>
                                            );
                                        }}
                                    />
                                </View>
                            </View>
                        </View>
                    </View>
                </View>


            </SafeAreaView>
        </SafeAreaProvider >

    );
};
export default HomeScreen;
