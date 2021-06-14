import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigator/navigator'
import LoginScreen from './screens/LoginScreen';

const AppStack = () => {
    return (
        <NavigationContainer>
            <LoginScreen />
        </NavigationContainer>
    )
}

export default AppStack