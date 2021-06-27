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
import Input from '../components/Input/Component'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updatePostProfileImage, USER_REFERENCE } from '../api/Firestore'

const EditProfileScreen = ({ navigation, route }) => {
    const userData = route?.params?.data
    const [isLoading, setIsLoading] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState(userData?.photoUrl)
    const [name, setName] = React.useState(userData?.name)

    const { updateUser } = React.useContext(AuthContext)

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

    async function updateUserData() {
        setIsLoading(true)
        await USER_REFERENCE
            .doc(userData?.email)
            .update({
                name: name,
                photoUrl: selectedImage
            })
            .then(() => {
                const user = {
                    name: name,
                    photoUrl: selectedImage,
                    email: userData?.email
                }
                updateUser(user)
                doMassiveUpdate()
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err.message)
            })
    }

    async function doMassiveUpdate() {
        await updatePostProfileImage(userData?.email, selectedImage, name)
            .then(() => {
                setIsLoading(false)
                navigation.goBack()
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err.message)
            })
    }

    return (
        <Screen style={styles.container}>
            <Text style={TEXT_EXTRA_LARGE_BOLD}>Edit Profile</Text>
            <TouchableOpacity activeOpacity={.6} onPress={() => handleSelectImage()}>
                <Image source={{ uri: 'data:image/png;base64, ' + selectedImage }} style={{ width: Mixins.scaleSize(96), height: Mixins.scaleSize(96), alignSelf: 'center', borderRadius: 48, marginTop: Mixins.scaleSize(24) }} />
            </TouchableOpacity>
            <Text style={{ ...TEXT_SMALL_REGULAR, alignSelf: 'center', color: Colors.COLOR_DARK_GRAY, marginBottom: Mixins.scaleSize(24), marginTop: Mixins.scaleSize(4) }}>Tap picture to change</Text>
            <Text style={{ ...TEXT_NORMAL_BOLD }}>Username</Text>
            <Input
                value={name}
                onChangeText={(text) => setName(text)}
                maxLength={32}
                style={{ ...TEXT_NORMAL_BOLD }} />
            <Text style={{ ...TEXT_NORMAL_BOLD, marginTop: Mixins.scaleSize(12) }}>Email</Text>
            <Input
                value={userData?.email}
                editable={false}
                maxLength={32}
                style={{ ...TEXT_NORMAL_BOLD }} />
            <View style={styles.buttonContainer}>
                <Button disabled={!name.length} text={'Save'} onPress={() => updateUserData()} />
            </View>
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default EditProfileScreen