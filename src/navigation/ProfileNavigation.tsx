import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import Profile from "../screens/mainScreens/ProfileScreen";
import EditProfile from "../screens/profileScreens/EditProfileScreen";
import ActivityLog from "../screens/profileScreens/ActivityLogScreen";
import Settings from "../screens/profileScreens/SecuritySettingsScreen";
import About from "../screens/profileScreens/AboutScreen";

export type ProfileStackParamList = {
    ProfileMain: undefined;
    EditProfile: undefined;
    ActivityLog: undefined;
    Settings: undefined;
    About: undefined;
};

const Stack = createNativeStackNavigator<ProfileStackParamList>();

const screens = [
    {
        name: 'EditProfile' as const,
        component: EditProfile,
        options: { title: 'Edit Profile' },
    },
    {
        name: 'ActivityLog' as const,
        component: ActivityLog,
        options: { title: 'Activity Log' },
    },
    {
        name: 'Settings' as const,
        component: Settings,
        options: { title: 'Security & Settings' },
    },
    {
        name: 'About' as const,
        component: About,
        options: { title: 'About'},
    },
];

const ProfileStackNavigator = () => {
    return (
        <Stack.Navigator 
            initialRouteName="ProfileMain"
            screenOptions={{
                headerShown: true,
                headerTintColor: '#ffffff',
                headerTitleStyle: {
                    fontWeight: '600',
                },
                headerTitleAlign: 'center',
            }}
        >
            <Stack.Screen
                name="ProfileMain"
                component={Profile}
                options={{ headerShown: false }}
            />
            {screens.map(screen => (
                <Stack.Screen
                    key={screen.name}
                    name={screen.name}
                    component={screen.component}
                    options={{...screen.options, 
                    headerBackground: () => (
                        <LinearGradient
                            colors={['#00ACC1', '#2196F3']}
                            style={StyleSheet.absoluteFill}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 0 }}
                        />
                    ),
                    }}
                />
            ))}
        </Stack.Navigator>
    );
};

export default ProfileStackNavigator;