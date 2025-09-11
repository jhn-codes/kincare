import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import AuthNavigation from "./AuthNavigation";
import MainNavigation from "./MainNavigation";

export type RootStackParamList = {
    MainNav: undefined;
    AuthNav: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const AppNavigation = () => {
    return (
    );
};

export default AppNavigation;