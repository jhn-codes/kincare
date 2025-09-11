import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/authScreens/WelcomeScreen";
import Login from "../screens/authScreens/LoginScreen";
import SignUp from "../screens/authScreens/SignUpScreen";
import ForgotPassword from "../screens/authScreens/ForgotPasswordScreen";

export type AuthStackParamList = {
    Welcome: undefined,
    Login: undefined;
    SignUp: undefined;
    ForgotPassword: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

const AuthNavigation = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Welcome" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Welcome" component={Welcome} />
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="SignUp" component={SignUp} />
                <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AuthNavigation;