import * as React from 'react'
import { StatusBar, Image } from 'react-native'
import { IMAGES } from '../common/Images'
import Screen from '../components/Screen/Component'
import styles from './styles/SplashScreen'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../store/Context'
import { WEB_CLIENT_ID } from '../api/env'
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'

const SplashScreen = ({ navigation }) => {

    const { logIn } = React.useContext(AuthContext)

    React.useEffect(() => {
        configureGoogleSignIn()
    }, [])

    function configureGoogleSignIn() {
        GoogleSignin.configure({
            offlineAccess: false,
            webClientId: WEB_CLIENT_ID
        })

        isSigned()
    }

    async function isSigned() {
        const isSignedIn = await GoogleSignin.isSignedIn();
        setTimeout(() => {
            isSignedIn ? getUserData() : isOnAuth()
        }, 2500)
        console.log('is User signed? : ' + isSignedIn)
    }

    async function isOnAuth() {
        const user = await auth().currentUser
        user ? getUserData() : gotoLogin()
    }

    async function getUserData() {
        const user = await auth().currentUser
        const userData = await firestore().collection('Users').doc(user?.email).get()

        if (userData) {
            logIn(userData.data())
        }

        console.log('datas: ' + JSON.stringify(userData.data()))
    }

    function gotoLogin() {
        console.log('user not exist')
        navigation.reset({
            index: 0,
            routes: [{ name: 'AuthStack' }],
        })
    }

    return (
        <Screen style={styles.container}>
            <StatusBar hidden />
            <Image source={IMAGES.logoOrange} style={styles.logo} resizeMode={'contain'} />
        </Screen>
    )
}

export default SplashScreen