import React from 'react';
import { Image, View } from 'react-native';
import styles from '../styles/styles';
import { Badge } from 'react-native-elements'; 
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import COLORS from '../consts/colors';

const Header: React.FC = () => {
    return (
        
        <View style={styles.header}>
        <View>
          <Image source={require('../assets/img/logo-main.png')} 
            style={styles.logo}>
          </Image>
        </View>
        <View style={styles.iconheader}>
          <Badge
            status="warning"
            value={1} 
            containerStyle={{ position: 'absolute', top: -10, right: -10 ,}}
          />
          <MaterialIcon name="shopping-cart" style={{ marginTop: 0 }} size={25} color={COLORS.Primary} >

          </MaterialIcon>
        </View>
      </View>
    );
};

export default Header;
