import * as React from 'react'
import { View, Text, StatusBar, Image } from 'react-native'
import Screen from '../components/Screen/Component'
import Button from '../components/Button/Component'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../store/Context'
import { Avatar } from 'react-native-paper'
import { TEXT_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_REGULAR } from '../common/Typography'
import styles from './styles/ProfileScreen'

import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';

const ProfileScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(false)

    React.useEffect(() => {
        //getUserData()
    }, [])



    const { logOut, currentUser } = React.useContext(AuthContext)

    async function handleLogout() {
        setIsLoading(true)
        console.log('Logging out....')
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setIsLoading(false)
            logOut()
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
    }

    return (
        <Screen theme={'dark'}>
            <View style={styles.topContainer}>
                <Avatar.Image size={72} source={{ uri: currentUser?.photoUrl }} />
                <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.name]}>{currentUser?.name}</Text>
                <Text style={[{ ...TEXT_NORMAL_REGULAR }, styles.email]}>{currentUser?.email}</Text>
            </View>
            <Button text='logout' onPress={() => handleLogout()} />
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default ProfileScreen