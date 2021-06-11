import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator } from './navigator/navigator'

const AppStack = () => {
    return (
        <NavigationContainer>
            <AppNavigator />
        </NavigationContainer>
    )
}

export default AppStack