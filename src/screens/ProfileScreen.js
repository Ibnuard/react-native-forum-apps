import * as React from 'react'
import { View, Text, StatusBar } from 'react-native'
import styles from './styles/HomeScreen'
import Screen from '../components/Screen/Component'
import Button from '../components/Button/Component'
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const ProfileScreen = ({ navigation }) => {

    async function handleLogout() {
        console.log('Logging out....')
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            navigation.popToTop()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <Screen theme={'dark'}>
            <Button text='logout' onPress={() => handleLogout()} />
        </Screen>
    )
}

export default ProfileScreen