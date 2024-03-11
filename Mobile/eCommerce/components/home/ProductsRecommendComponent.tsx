
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import style from '../../styles/home';
import { ImageBackgroundBase } from 'react-native';
import COLORS from '../../consts/colors';


const ProductsRecommendComponent = ({ navigation }: { navigation: any }) => {
    const ProductsRecommend = [];

    ProductsRecommend.push({
        id: 1,
        name: 'Gương treo tường hình oval Cielo Le Giare LGSP',
        price: 15000,
        image: 'http://static.superstones.com.vn/products-test/hinh-gach/612EHAX.jpg',
    });

    ProductsRecommend.push({
        id: 2,
        name: 'Quạt Mini Tích Hợp Đèn Ngủ Cao Cấp | Quạt kẹp bàn Tích Điện 15000 mAh - 10000mAh',
        price: 15000,
        image: 'http://static.superstones.com.vn/products-test/hinh-gach/1224KACAFULA.jpg',
    });

    ProductsRecommend.push({
        id: 3,
        name: '[E-Voucher] Sở hữu lPhone 15 Pro Max 512Gb - Voucher Basica V59',
        price: 15000,
        image:'http://static.superstones.com.vn/products-test/hinh-gach/612PL612548.jpg'
    });

    ProductsRecommend.push({
        id: 4 ,
        name: 'Ổ Cắm Điện Đa Năng 6 Cổng Tích Hợp Sạc USB 2 Cáp USB 3 Và 5M Dây Cáp Dày Chất Lượng Cao 100% Chính Hãng 2023 New. ',
        price: 15000,
        image: 'http://static.superstones.com.vn/products-test/hinh-gach/612DAFL.jpg',
    });

    return (
        <View style={{
            backgroundColor: COLORS.Light, 
            flexDirection: 'column',
             flex: 1,
              borderRadius: 10,  
        }}>
            <FlatList data={ProductsRecommend}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductDetailScreen', { item })}
                        style={styles.product}>
                        <Image source={{ uri: item.image }} style={styles.image} />
                        <View style={styles.productInfo}>
                            <Text lineBreakMode='clip' numberOfLines={2}  style={styles.productName}>{item.name}</Text>
                            <Text style={styles.productPrice}>{item.price} đ</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </View>

    );
}
const styles = {
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 20,
        marginTop: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    viewAll: {
        fontSize: 14,
        fontWeight: 'bold',
        color: COLORS.Primary,
    },
    product: {
        width: (Dimensions.get('screen').width / 2 ) -10 , 
        justifyContent: 'center',
        alignItems: 'center', 
        backgroundColor: COLORS.White,
        marginVertical: 7,
        marginHorizontal: 5,
        borderRadius: 10, 
    },
    image: {width: (Dimensions.get('screen').width / 2 ) -10 , 
        height: 220,
        
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    productInfo: {
        padding: 10,
    },
    productName: {
        fontSize: 18,
    },
    productTag: {
        fontSize: 12,
        color: COLORS.Primary,
        marginTop: 5,
    },
    productPrice: {
       
    },
};
export default ProductsRecommendComponent;