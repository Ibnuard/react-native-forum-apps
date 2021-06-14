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

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//parent
export const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={({ route }) => ({
            tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === 'Home') {
                    iconName = 'home';
                } else if (route.name === 'Profile') {
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
                name="Home"
                component={HomeScreen}
                options={{
                    headerShown: false,
                }} />
            <Tab.Screen
                name="Topic"
                component={ProfileScreen} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen} />
        </Tab.Navigator>
    )
}

export const AuthStack = () => {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name={'LoginScreen'}
                component={LoginScreen} />
        </Stack.Navigator>
    )
}