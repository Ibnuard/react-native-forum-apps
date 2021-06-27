import * as React from 'react'
import { View, Text, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import Screen from '../components/Screen/Component'
import { Colors, Mixins } from '../styles'
import styles from './styles/RegisterScreen'
import Button from '../components/Button/Component'
import { TEXT_EXTRA_LARGE_BOLD, TEXT_NORMAL_BOLD, TEXT_SMALL_REGULAR } from '../common/Typography'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import auth from '@react-native-firebase/auth'

import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';
import { DEFAULT_IMAGE } from '../common/DefaultImage'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const EditProfileScreen = ({ navigation, route }) => {
    const data = route?.params?.data
    const [username, setUsername] = React.useState(data?.displayName)
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState('')
    const [selectedImage, setSelectedImage] = React.useState(DEFAULT_IMAGE)

    const { logIn } = React.useContext(AuthContext)

    async function handleTakePicture() {
        await launchCamera({
            includeBase64: true,
            maxHeight: 512,
            maxWidth: 512,
            quality: 0.8,
            cameraType: 'back'
        }, res => {
            console.log('res : ' + JSON.stringify(res))
            if (res?.assets[0].base64) {
                setSelectedImage(res?.assets[0].base64)
            } else {
                setSelectedImage(DEFAULT_IMAGE)
            }
        });
    }

    async function handleSelectImage() {
        await launchImageLibrary({
            includeBase64: true,
            maxHeight: 512,
            maxWidth: 512,
            quality: 0.8
        }, res => {
            console.log('res : ' + JSON.stringify(res))
            if (res?.assets[0].base64) {
                setSelectedImage(res?.assets[0].base64)
            } else {
                setSelectedImage(DEFAULT_IMAGE)
            }
        })
    }

    async function registeredNewuser() {

        setError('')
        setIsLoading(true)

        await firestore()
            .collection('Users')
            .doc(data?.email)
            .set({
                name: username,
                email: data?.email,
                photoUrl: selectedImage,
            })
            .then(() => {
                console.log('User added!');
                const user = {
                    name: username,
                    email: data?.email,
                    photoUrl: selectedImage,
                }
                doLogin(user)
            })
            .catch((err) => {
                setIsLoading(false)
                setError(err)
                console.log('Erorr adding data : ' + JSON.stringify(err));
            })
    }

    async function doLogin(user) {
        await auth()
            .signInWithEmailAndPassword(data?.email, route?.params?.pass)
            .then(() => {
                logIn(user)
                setIsLoading(false)
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err?.message)
            })
    }

    return (
        <Screen style={styles.container}>
            <Text style={TEXT_EXTRA_LARGE_BOLD}>New user registration!</Text>
            <TouchableOpacity activeOpacity={.6} onPress={() => handleSelectImage()}>
                <Image source={{ uri: 'data:image/png;base64, ' + selectedImage }} style={{ width: Mixins.scaleSize(96), height: Mixins.scaleSize(96), alignSelf: 'center', borderRadius: 48, marginTop: Mixins.scaleSize(24) }} />
            </TouchableOpacity>
            <Text style={{ ...TEXT_SMALL_REGULAR, alignSelf: 'center', color: Colors.COLOR_DARK_GRAY, marginBottom: Mixins.scaleSize(24) }}>Tap picture to change</Text>
            <TextInput
                placeholder={'Set your display name'}
                placeholderTextColor={Colors.COLOR_DARK_GRAY}
                style={[{ ...TEXT_NORMAL_BOLD }, styles.input]}
                value={username}
                onChangeText={(text) => setUsername(text)} />
            {error?.length ? <Text style={[{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_RED }]}>* {error}</Text> : null}

            <View style={styles.buttonContainer}>
                <Button disabled={!username?.length} text={'Continue'} onPress={() => registeredNewuser()} />
            </View>
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default EditProfileScreen