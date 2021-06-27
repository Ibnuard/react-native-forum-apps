import * as React from 'react'
import { Image, StatusBar, TextInput, View, Text, TouchableOpacity } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors, Mixins } from '../styles'
import Screen from '../components/Screen/Component'
import { TEXT_EXTRA_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR, TEXT_SMALL_BOLD } from '../common/Typography'
import Button from '../components/Button/Component'
import styles from './styles/LoginScreen'

//firebase
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'

import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';
import Input from '../components/Input/Component'
import { validateEmail } from '../utils/utils'

const SignUpScreen = ({ navigation }) => {
    const [user, setUser] = React.useState(null)
    const [isLoading, setIsLoading] = React.useState(false)
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [emailError, setEmailError] = React.useState('')
    const [passwordError, setPasswordError] = React.useState('')

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
            navigation.navigate('Register', { data: data, pass: password })
        } else {
            console.log('User exist!');
            logIn(isUser.data())
            doLogin()
        }
    }

    function onEmailBlur() {
        validateEmail(email) ? setEmailError('') : setEmailError('Email not valid!')
    }

    function onPasswordBlur() {
        password.length >= 6 ? setPasswordError('') : setPasswordError('Password must consist of at least 6 characters')
    }

    async function onRegister() {
        setIsLoading(true)
        console.log('Register.....');
        await auth()
            .createUserWithEmailAndPassword(email, password)
            .then((credential) => {
                if (credential) {
                    setIsLoading(false)
                    isAlreadyRegistered(credential.user)
                }
            })
            .catch((err) => {
                setIsLoading(false)
                console.log(err?.message)
                if (err?.message == "[auth/email-already-in-use] The email address is already in use by another account.") {
                    setEmailError("The email address is already in use by another account.")
                }
            })
    }

    /**
     * 
     * GAP BETWEEN RENDER 
     * 
     */

    function renderEmailInput() {
        return (
            <Input
                placeholder={'Input Email'}
                placeholderTextColor={Colors.COLOR_DARK_GRAY}
                numberOfLines={1}
                onBlur={() => onEmailBlur()}
                keyboardType={'email-address'}
                errorMessage={emailError}
                value={email}
                onChangeText={(val) => setEmail(val)} />
        )
    }

    function renderPasswordInput() {
        const [showPassword, setShowPassword] = React.useState(true)
        return (
            <Input
                placeholder={'Input Password'}
                placeholderTextColor={Colors.COLOR_DARK_GRAY}
                numberOfLines={1}
                isPassword={showPassword}
                onBlur={() => onPasswordBlur()}
                errorMessage={passwordError}
                onEyePress={() => setShowPassword(!showPassword)}
                showEye
                value={password}
                onChangeText={(val) => setPassword(val)} />
        )
    }


    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <Text style={{ ...TEXT_EXTRA_LARGE_BOLD, alignSelf: 'flex-start', color: Colors.COLOR_BLACK }}>Set Up!</Text>
            <Text style={{ ...TEXT_NORMAL_REGULAR, alignSelf: 'flex-start', color: Colors.COLOR_DARK_GRAY, marginBottom: Mixins.scaleSize(24) }}>Set your username and password</Text>
            {renderEmailInput()}
            {renderPasswordInput()}
            <Button
                text={'Register'}
                disabled={!email.length || !password.length || emailError.length || passwordError.length}
                buttonStyle={{ marginVertical: Mixins.scaleSize(24), height: Mixins.scaleSize(44), borderRadius: 6 }}
                onPress={() => onRegister()} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...TEXT_NORMAL_REGULAR, color: Colors.COLOR_BLACK }}>Already have an account? </Text>
                <TouchableOpacity activeOpacity={.7} onPress={() => navigation.navigate('Login')}>
                    <Text style={{ ...TEXT_NORMAL_BOLD, color: Colors.COLOR_SECONDARY }}>Login</Text>
                </TouchableOpacity>
            </View>
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </View>
    )
}

export default SignUpScreen