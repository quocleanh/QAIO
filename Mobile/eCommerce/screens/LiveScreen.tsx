import React from 'react';
import { Text } from 'react-native-elements';

const LiveScreen: React.FC = ( navigation: any) => {
    const VideoList = [];
    VideoList.push({ Id: 1, Name: 'LazMall', Image: `http://localhost:8081/assets/img/icon/category_6.webp` });
    return (
        <Text>
            Live Screen
        </Text>
    );
};

export default LiveScreen;