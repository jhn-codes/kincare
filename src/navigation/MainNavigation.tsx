import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/mainScreens/HomeScreen";
import Reminder from "../screens/mainScreens/ReminderScreen";
import FoodSugesstion from "../screens/mainScreens/FoodSuggestionScreen";
import ProfileStackNavigator from "./ProfileNavigation";

export type MainTabParamList = {
    Home: undefined;
    Reminder: undefined;
    FoodSuggestion: undefined;
    Profile: undefined;
};

const Tab = createBottomTabNavigator<MainTabParamList>();

const MainNavigation = () => {
    return (
        <Tab.Navigator initialRouteName="Home" screenOptions={{headerShown: false}}>
            <Tab.Screen name="Home" component={Home} />
            <Tab.Screen name="Reminder" component={Reminder} />
            <Tab.Screen name="FoodSuggestion" component={FoodSugesstion}
                options={{tabBarLabel: "Food Suggestion"}}
            />
            <Tab.Screen name="Profile" component={ProfileStackNavigator} />
        </Tab.Navigator>
    );
};

export default MainNavigation;