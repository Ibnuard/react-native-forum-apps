import * as React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { AppNavigator, AuthStack, SplashStack, HomeFlow } from './navigator/navigator'
import { AuthContext } from './store/Context';

const AppStack = () => {
    const [state, dispatch] = React.useReducer(
        (prevState, action) => {
            switch (action.type) {
                case 'LOG_OUT':
                    return {
                        ...prevState,
                        token: null,
                        isAdmin: false,
                        isLoading: false
                    }
                case 'SIGN_IN':
                    return {
                        ...prevState,
                        token: 'user@token',
                        isLoading: false,
                        isAdmin: false,
                        user: action.user
                    }
                case 'SIGN_IN_ADMIN':
                    return {
                        ...prevState,
                        token: 'user@token',
                        isLoading: false,
                        isAdmin: true,
                        user: action.user,
                    }
                case 'UPDATE':
                    return {
                        ...prevState,
                        isLoading: false,
                        isAdmin: false,
                        user: action.user
                    }
            }
        },
        {
            isAdmin: false,
            token: null,
            isLoading: true,
            user: {}
        }
    )

    const authContext = React.useMemo(() => ({
        logOut: () => dispatch({ type: 'LOG_OUT' }),
        logIn: (user) => dispatch({ type: 'SIGN_IN', user: user }),
        logInAdmin: (user) => dispatch({ type: 'SIGN_IN_ADMIN', user: user }),
        updateUser: (user) => dispatch({ type: 'UPDATE', user: user }),
        currentUser: state.user
    }), [state.user])


    return (
        <AuthContext.Provider value={authContext}>
            <NavigationContainer>
                {state.isLoading
                    ? <SplashStack />
                    : state.token !== null
                        ? <HomeFlow admin={state?.isAdmin} />
                        : <AuthStack />}
            </NavigationContainer>
        </AuthContext.Provider>
    )
}

export default AppStack