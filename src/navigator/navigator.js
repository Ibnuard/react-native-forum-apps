import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

//screens
import HomeScreen from '../screens/HomeScreen';
import ProfileScreen from '../screens/ProfileScreen';
import Header from '../components/Header/component';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();
const Drawer = createDrawerNavigator();

//parent
export const AppNavigator = () => {
    return (
        <Tab.Navigator screenOptions={{
            header: () => <Header />
        }}>
            <Tab.Screen
                name="Home"
                component={HomeScreen} />
            <Tab.Screen
                name="Topic"
                component={ProfileScreen} />
            <Tab.Screen
                name="Profile"
                component={ProfileScreen} />
        </Tab.Navigator>
    )
}