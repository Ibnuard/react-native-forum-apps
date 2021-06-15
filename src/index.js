import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthStack, SplashStack } from './navigator/navigator'
import { AuthContext } from './store/Context';

const AppStack = () => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOG_OUT':
                    return {
                        ...prevState,
                        token: null,
                        isLoading: false
                    }
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        token: 'user@token',
                        isLoading: false,
                        user: action.user
                    }
            }
        },
        {
            token: null,
            isLoading: true,
            user: {}
        }
    )

    const authContext = React.useMemo(() => ({
        logOut: () => dispatch({ type: 'LOG_OUT' }),
        logIn: (user) => dispatch({ type: 'SIGN_IN', user: user }),
        currentUser: state.user
    }), [state.user])


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading
                    ? <SplashStack />
                    : state.token !== null
                        ? <AppNavigator />
                        : <AuthStack />}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default AppStack