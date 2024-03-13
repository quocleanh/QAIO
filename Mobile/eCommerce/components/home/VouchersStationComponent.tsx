import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, ScrollView, Dimensions } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import style from '../../styles/home';
import COLORS from '../../consts/colors';
import { color } from 'react-native-elements/dist/helpers';

interface VouchersStationProps {


}
const VouchersStationComponent = ({ navigation }: { navigation: any }) => {

    const listVouchers = [];

    for (let i = 1; i <= 2; i++) {
        const vc = '10k ';
        listVouchers.push({ Name: 'Giảm ' + vc, Value: vc, Description: 'Voucher giảm giá' });
    }

    return (
        <View style={{ backgroundColor: COLORS.Red }}>
            <View style={style.vouchers} >
                <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 10, paddingHorizontal: 5, backgroundColor: COLORS.White, alignContent: 'space-around' }} >
                    <Text style={{ fontSize: 17, fontWeight: 'bold' }}>Trạm Voucher </Text>
                    <TouchableOpacity style={{   flexDirection: 'row' }}>
                        <Text style={{ color: COLORS.Primary }}>
                            Xem thêm
                        </Text><MaterialIcon name="chevron-right" size={20} style={{}} color={COLORS.Primary} />
                    </TouchableOpacity>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', }}>
                    <FlatList
                        nestedScrollEnabled={true}
                        data={listVouchers}
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

    );
}
export default VouchersStationComponent;