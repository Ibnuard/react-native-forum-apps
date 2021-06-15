import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthStack } from './navigator/navigator'

const AppStack = () => {
    return (
        <NavigationContainer>
            <AuthStack />
        </NavigationContainer>
    )
}

export default AppStack