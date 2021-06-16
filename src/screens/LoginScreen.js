import * as React from 'react'
import { Image, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'
import Screen from '../components/Screen/Component'
import { TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD } from '../common/Typography'
import Button from '../components/Button/Component'
import styles from './styles/LoginScreen'

//firebase
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'

import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';

const LoginScreen = ({ navigation }) => {
    const [user, setUser] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)

    const { logIn } = React.useContext(AuthContext)

    //configure google signin
    /*
    GoogleSignin.configure({
        webClientId: '992419438996-nvdutfoq59f3h9e8m4mhdrscrkfosu3b.apps.googleusercontent.com',
    });
    */

    React.useEffect(() => {
        console.log(user)
        if (user) {
            isAlreadyRegistered(user)
        }
    }, [user])

    async function onGoogleButtonPress() {
        // Get the users ID token
        const { idToken } = await GoogleSignin.signIn();

        // Create a Google credential with the token
        const googleCredential = auth.GoogleAuthProvider.credential(idToken);

        // Sign-in the user with the credential
        return auth().signInWithCredential(googleCredential);
    }

    async function handleLoginButton() {
        setIsLoading(true)
        console.log('logged in....')
        await onGoogleButtonPress()
            .then((credential) => {
                const user = auth().currentUser
                setUser(user)
            })
            .catch((err) => {
                setIsLoading(false)
                console.log('Login with google failed! error : ' + err)
            })
    }

    async function isAlreadyRegistered(data) {
        const isUser = await firestore().collection('Users').doc(data?.email).get()
        setIsLoading(false)

        if (!isUser.exists) {
            console.log('user not exist!');
            navigation.navigate('Register', { data: data })
        } else {
            console.log('User exist!');
            logIn(isUser.data())
        }
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
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default LoginScreen