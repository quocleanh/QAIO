import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../../styles/home';

interface Category {
        Name: string;
        Code: number;
        IsActive: boolean
}
interface TabsListProps {
        onTabPress: (code: number) => void; // Change the parameter type to number
}
const TabsList: React.FC<TabsListProps> = ({ onTabPress }) => {
        const [categoriesHome, setCategoriesHome] = useState<Category[]>([]);
        const [selectedCategoryIndex, setSelectedCategoryIndex] = useState<number>(-1); // Change the state variable type to number

        useEffect(() => {
                const dataSample = [
                        { "Name": "All", "Code": -1, "IsActive": true },
                        { "Name": "Gạch ốp lát", "Code": 0, "IsActive": true },
                        { "Name": "Thiết bị vệ sinh", "Code": 1, "IsActive": true },
                        { "Name": "Sàn gỗ", "Code": 2, "IsActive": true },
                ];
                setCategoriesHome(dataSample);
        }, []);

        return (
                <View style={styles.categoryContainer}>
                {categoriesHome.map(category => (
                    <TouchableOpacity key={category.Code} onPress={() => {onTabPress(category.Code); setSelectedCategoryIndex(category.Code);}}>
                        <Text style={[styles.categoryText, selectedCategoryIndex === category.Code && styles.categoryText_Active]}>
                            {category.Name}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
        );
};

export default TabsList;