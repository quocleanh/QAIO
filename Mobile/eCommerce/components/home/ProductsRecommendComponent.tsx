
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import style from '../../styles/home';
import { ImageBackgroundBase } from 'react-native';
import COLORS from '../../consts/colors';
import productModel from '../../models/productModel';


const ProductsRecommendComponent = ({ navigation }: { navigation: any }) => {



    const [productsRecommend, setProductsRecommend] = useState<productModel[]>([]);

    useEffect(() => {
        loadProducts();
    }, []);

    const loadProducts = () => {
        const newProducts: productModel[] = [...productsRecommend];
        for (let i = 0; i < 4; i++) {
            newProducts.push({
                Id: Math.floor(Math.random() * 10000000),
                tags: i % 2 === 0 ? [{ 'Sale': 'Sale 15-19' }, { 'Xin': 'Shop Xịn' }] : [{ 'Xin': 'Shop Xịn' }],
                promotion: i % 2 === 0 ? 'Uu dai cho bạn' : 'Freeship Xtra',
                Name: 'Gương treo tường hình oval Cielo Le Giare LGSP ' + i,
                Price: 15000,
                SalePrice: 10000,
                PresentImage: 'https://www.vietceramics.com/media/4644656/460x400px-h4.jpg?quality=85',
                Code: '',
                Type: 0,
                Images: [],
                Description: '',
                Variables: [{
                    'Name': 'Kích thước',
                    'List':
                        [
                            { id: '1', name: '60 x 60 cm' },
                            { id: '2', name: '60 x 120 cm' },
                            { id: '3', name: '120 x 120 cm' }
                        ]
                }, {
                    'Name': 'Màu sắc',
                    'List':
                        [
                            { id: '9', name: 'Đỏ campuchia' },
                            { id: '8', name: 'Xanh Malaysia' },
                            { id: '7', name: 'Vàng Tung Của' },
                            { id: '6', name: 'Trắng Ma Rốc' },
                            { id: '5', name: 'Đen Nam Phi' }
                        ]
                }],
                SelectedVariables: {
                    Name: '',
                    Id: ''
                }
            });
        }
        setProductsRecommend(newProducts);
    };


    return (
        <View style={{

            flexDirection: 'column',
            flex: 1,
            borderRadius: 10,
        }}>

            <FlatList
                data={productsRecommend}
                numColumns={2}
                nestedScrollEnabled={true}
                scrollEnabled={false}
                contentContainerStyle={{
                    backgroundColor: COLORS.Light,
                    flexDirection: 'column', flex: 1, padding: 0
                }}
                keyExtractor={(item) => item.Id.toString()}
                //onEndReached={loadProducts}
                onEndReachedThreshold={0.5}
                renderItem={({ item }) => (
                    <View style={{
                        borderRadius: 5,
                        margin: 5,
                        height: 'auto',
                        flex: 1,
                        backgroundColor: COLORS.White,
                        width: Dimensions.get("screen").width / 2 - 10,
                        position: 'relative',
                    }}>
                        <TouchableOpacity onPress={() => navigation.navigate('Detail', { Product: item.Code })}>
                            <Image source={{ uri: item.PresentImage }} style={{ width: '100%', height: 200, borderRadius: 5 }} />
                            <View style={{ padding: 5 }}>
                                {item.tags ? (
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        {item.tags.map((tag, index) => {
                                            return <Text key={index} style={{ marginHorizontal: 5, marginStart: 0, fontSize: 10, color: COLORS.White, fontWeight: 'bold', marginTop: 5, backgroundColor: COLORS.Primary, padding: 3, paddingHorizontal: 5, borderRadius: 5 }}> {Object.values(tag)}</Text>;
                                        })}
                                    </View>
                                ) : null}

                                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                    <Text lineBreakMode='clip' numberOfLines={2} style={{ fontSize: 16, fontWeight: 'bold', marginTop: 5 }}>{item.Name}</Text>
                                </View>
                                <View style={{ flex: 1, flexDirection: 'column' }}>
                                    <Text style={{ fontSize: 20, color: COLORS.Primary, fontWeight: 'bold', marginTop: 5 }}>
                                        {item.Price.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}
                                    </Text>
                                    {item.promotion ? (
                                        <Text style={{ fontSize: 15, color: COLORS.Primary, marginTop: 0 }}>
                                            {item.promotion}
                                        </Text>
                                    ) : null}
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between', marginVertical: 5 }}>
                                        <View style={{ flex: 1, flexDirection: 'row' }}>
                                            <Image source={require('../../assets/icon/star.png')} style={{ width: 18, height: 18 }} />
                                            <Text> 5 (1101)</Text>
                                        </View>
                                        <View>
                                            <Text>1k đã bán</Text>
                                        </View>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row' }}>
                                        <Image source={require('../../assets/icon/pin.png')} style={{ width: 15, height: 15 }} />
                                        <Text style={{ color: COLORS.Grey, fontSize: 12, marginLeft: 5 }}>
                                            Hồ Chí Minh
                                        </Text>
                                    </View>

                                </View>


                            </View>
                        </TouchableOpacity>
                        <TouchableOpacity style={{ position: 'absolute', bottom: 5, right: 0 }}>
                            <Text style={{ fontSize: 29 }}>...</Text>
                        </TouchableOpacity>
                    </View>
                )} />
        </View>

    );
}
const styles = {

};
export default ProductsRecommendComponent;