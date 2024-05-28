import React from 'react';
import { View , Text} from 'react-native';

const Footer: React.FC = () => {
    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "#000"
        
        }}>
           <Text>Footer</Text>
        </View>
    );
};

export default Footer;
