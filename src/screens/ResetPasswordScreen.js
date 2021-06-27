import * as React from 'react'
import { View, Text, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import Screen from '../components/Screen/Component'
import { Colors, Mixins } from '../styles'
import styles from './styles/RegisterScreen'
import Button from '../components/Button/Component'
import { TEXT_EXTRA_LARGE_BOLD, TEXT_NORMAL_BOLD, TEXT_SMALL_REGULAR } from '../common/Typography'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';
import { DEFAULT_IMAGE } from '../common/DefaultImage'
import Input from '../components/Input/Component'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { updatePostProfileImage, USER_REFERENCE } from '../api/Firestore'
import auth from '@react-native-firebase/auth'

const ResetPasswordScreen = ({ navigation, route }) => {
    const userData = route?.params?.data
    const [isLoading, setIsLoading] = React.useState(false)
    const [selectedImage, setSelectedImage] = React.useState(userData?.photoUrl)
    const [name, setName] = React.useState(userData?.name)

    async function resetPassword() {
        setIsLoading(true)
        await auth()
            .sendPasswordResetEmail(userData?.email)
            .then(() => {
                setIsLoading(false)
                alert(`Email untuk konfirmasi penggantian password telah dikirim ke ${userData?.email}. Silahkan cek email Anda untuk mengganti password.`)
                navigation.goBack()
                console.log('Sukses')
            })
            .catch((err) => {
                setIsLoading(false)
                alert(err.message)
            })
    }

    return (
        <Screen style={styles.container}>
            <Text style={{ ...TEXT_EXTRA_LARGE_BOLD, marginBottom: Mixins.scaleSize(12) }}>Reset Password</Text>
            <Input
                value={userData?.email}
                editable={false}
                onChangeText={(text) => setName(text)}
                maxLength={32}
                style={{ ...TEXT_NORMAL_BOLD }} />
            <View style={styles.buttonContainer}>
                <Button disabled={!name.length} text={'Send reset password confirmation'} onPress={() => resetPassword()} />
            </View>
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default ResetPasswordScreen