import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header/component';

import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../styles';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import SplashScreen from '../screens/SplashScreen';
import TopicScreen from '../screens/TopicScreen';
import DetailTopicScreen from '../screens/DetailTopicScreen';
import SignUpScreen from '../screens/SignUpScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import ResetPasswordScreen from '../screens/ResetPasswordScreen';
import UserListScreen from '../screens/UserList';
import BannerScreen from '../screens/BannerScreen';
import PostReportScreen from '../screens/PostReportScreen';
import CommentReportScreen from '../screens/CommentReportScreen';
import HomeAdminScreen from '../screens/HomeAdminScreen';
import HomeTopicScreen from '../screens/HomeAdminTopicScreen';
import TermsCondition from '../screens/TermsConditionScreen';
import PrivacyPolicy from '../screens/PrivacyPolicyScreen';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//parent
export const SplashStack = () => {
    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false
            }}
            initialRouteName={'Splash'}>
            <Stack.Screen
                name={'Splash'}
                component={SplashScreen} />
            <Stack.Screen
                name={'AuthStack'}
                component={AuthStack} />
        </Stack.Navigator>
    )
}


export const AuthStack = () => {
    return (
        <Stack.Navigator screenOptions={{
            headerShown: false
        }}>
            <Stack.Screen
                name={'Login'}
                component={LoginScreen} />
            <Stack.Screen
                name={'SignUp'}
                component={SignUpScreen} />
            <Stack.Screen
                name={'Register'}
                component={RegisterScreen} />
            <Stack.Screen
                name={'AppStack'}
                component={HomeFlow} />
        </Stack.Navigator>
    )
}


export const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Profile') {
                    iconName = 'user'
                } else if (route.name == 'Topic') {
                    iconName = 'bars'
                } else {
                    iconName = 'plussquareo'
                }

                return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.COLOR_PRIMARY,
            tabBarInactiveTintColor: Colors.COLOR_DARK_GRAY
        })}>
            <Tab.Screen
                name="Home"
                component={HomeAdminScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Topic"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }} />
        </Tab.Navigator>
    )
}

export const AdminNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home' || route.name === 'HomeAdmin') {
                    iconName = 'home';
                } else if (route.name === 'Users') {
                    iconName = 'user'
                } else {
                    iconName = 'plussquareo'
                }

                return <AntDesign name={iconName} size={size} color={color} />;
            },
            tabBarActiveTintColor: Colors.COLOR_PRIMARY,
            tabBarInactiveTintColor: Colors.COLOR_DARK_GRAY
        })}>
            <Tab.Screen
                name="HomeAdmin"
                component={HomeAdminScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Post Report"
                component={PostReportScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Comment Report"
                component={CommentReportScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Banner"
                component={BannerScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Users"
                component={UserListScreen}
                options={{
                    headerShown: false,
                }} />
        </Tab.Navigator>
    )
}

export const HomeFlow = ({ admin = false }) => {
    return (
        <Stack.Navigator screenOptions={{
            animationTypeForReplace: 'push'
        }}>
            <Stack.Screen
                name="TabFlow"
                component={admin ? AdminNavigator : AppNavigator}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="Detail"
                component={DetailTopicScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="ProfileDetail"
                component={ProfileScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="EditProfile"
                component={EditProfileScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="ResetPassword"
                component={ResetPasswordScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="PostTopic"
                component={TopicScreen}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="TermsCondition"
                component={TermsCondition}
                options={{
                    headerShown: false,
                }} />
            <Stack.Screen
                name="PAP"
                component={PrivacyPolicy}
                options={{
                    headerShown: false,
                }} />
        </Stack.Navigator>
    )
}
