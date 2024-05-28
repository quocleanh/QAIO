import HomeScreen from "../screens/HomeScreen"; // Import the missing component
import HistoryScreen from "../screens/HistoryScreen"; // Import the missing component
import ScanScreen from "../screens/ScanScreen"; // Import the missing component
import AccountScreen from "../screens/AccoountScreen"; // Import the missing component
import SettingsScreen from "../screens/SettingsScreen"; // Import the missing component
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();
const Tabs = () => {
    return (
        <Tab.Navigator initialRouteName="HomeScreen" screenOptions={{ headerShown: false }}>
            <Tab.Screen name="Home" component={HomeScreen} />
            <Tab.Screen name="History" component={HistoryScreen} />
            <Tab.Screen name="Scan" component={ScanScreen} />
            <Tab.Screen name="Account" component={AccountScreen} />
            <Tab.Screen name="Setting" component={SettingsScreen} />
        </Tab.Navigator>
    );
}
export default Tabs;