import * as React from 'react'
import { Image, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'
import Screen from '../components/Screen/Component'
import { TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD } from '../common/Typography'
import Button from '../components/Button/Component'
import styles from './styles/LoginScreen'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'

const LoginScreen = ({ navigation }) => {


    //configure google signin
    GoogleSignin.configure({
        webClientId: '992419438996-nvdutfoq59f3h9e8m4mhdrscrkfosu3b.apps.googleusercontent.com',
    });

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    async function handleLoginButton() {
        console.log('logged in....')
        await onGoogleButtonPress()
            .then((credential) => {
                console.log('Login with google success! credential : ' + credential)
                navigation.navigate('AppStack')
            })
            .catch((err) => {
                console.log('Login with google failed! error : ' + err)
            })
    }


    return (
        <Screen style={styles.container}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <Image source={IMAGES.logoOrange} style={styles.logo} resizeMode={'contain'} />
            <Button
                text={'SignIn with Google'}
                icon={IMAGES.google}
                buttonStyle={styles.googleButton}
                textStyle={[{ ...TEXT_NORMAL_BOLD }, styles.googleText]}
                onPress={() => handleLoginButton()} />
        </Screen>
    )
}

export default LoginScreen