import * as React from 'react'
import { View, Text, SafeAreaView, Image, StatusBar, TextInput } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'
import Screen from '../components/Screen/Component'
import { TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD } from '../common/Typography'
import Button from '../components/Button/Component'
import styles from './styles/LoginScreen'

const LoginScreen = ({ navigation }) => {
    return (
        <Screen style={styles.container}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <Image source={IMAGES.logoOrange} style={styles.logo} resizeMode={'contain'} />
            <Button
                text={'SignIn with Google'}
                icon={IMAGES.google}
                buttonStyle={styles.googleButton}
                textStyle={[{ ...TEXT_NORMAL_BOLD }, styles.googleText]}
                onPress={() => navigation.navigate('AppStack')} />
        </Screen>
    )
}

export default LoginScreen