
import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions, SectionList } from 'react-native';
import { Image } from 'react-native-elements';
import { FlatList } from 'react-native-gesture-handler';
import { ImageBackground } from 'react-native';
import style from '../../styles/home';
import { ImageBackgroundBase } from 'react-native';
import COLORS from '../../consts/colors';

const CategoryComponent = ({ navigation }: { navigation: any }) => {
    const listCategories = [];
    listCategories.push({ Id: 1, Name: 'LazMall', Image: `http://localhost:8081/assets/img/icon/category_6.webp` });
    listCategories.push({ Id: 2, Name: '3 món từ 24k', Image: `http://localhost:8081/assets/img/icon/category_4.webp` });
    listCategories.push({ Id: 3, Name: 'Săn xu', Image: `http://localhost:8081/assets/img/icon/category_16.webp` });
    listCategories.push({ Id: 4, Name: 'Trồng cây hái quả', Image: `http://localhost:8081/assets/img/icon/category_14.webp` });
    listCategories.push({ Id: 5, Name: 'Nạp thẻ & Dịch vụ', Image: `http://localhost:8081/assets/img/icon/category_3.webp` });
    listCategories.push({ Id: 6, Name: 'LazLive', Image: `http://localhost:8081/assets/img/icon/category_15.webp` });
    listCategories.push({ Id: 7, Name: 'Xem thêm', Image: `http://localhost:8081/assets/img/icon/category_17.webp` });

    return (
        <View style={style.category}>
            <View style={{ paddingHorizontal: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: COLORS.Black }}>Danh sách sản phâm</Text>
                               
            </View> 
        </View>

    );
}
export default CategoryComponent;