import * as React from 'react'
import { View, Text, StatusBar, TextInput, Image, TouchableOpacity, Dimensions } from 'react-native'
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
import { BANNER_REFERENCE } from '../api/Firestore'

const BannerScreen = ({ navigation, route }) => {
    const [selectedImage, setSelectedImage] = React.useState('')
    const [currentBanner, setCurrentBanner] = React.useState('')
    const [isLoading, setIsLoading] = React.useState(false)

    const { logOut } = React.useContext(AuthContext)

    React.useEffect(() => {
        getCurrentBanner()
    }, [])

    const { width, height } = Dimensions.get('window')

    async function getCurrentBanner() {
        const banner = await BANNER_REFERENCE.get()
        const data = banner.data()

        console.log('data : ' + data.imageUrl)

        setCurrentBanner(data.imageUrl)
        setSelectedImage(data.imageUrl)
    }

    console.log('cb : ' + currentBanner, ' si: ' + selectedImage)

    async function handleTakePicture() {
        await launchCamera({
            includeBase64: true,
            maxHeight: 512,
            maxWidth: 512,
            quality: 0.8,
            cameraType: 'back'
        }, res => {
            console.log('res : ' + JSON.stringify(res))
            if (!res.didCancel) {
                if (res?.assets[0].base64) {
                    setSelectedImage(res?.assets[0].base64)
                } else {
                    setSelectedImage(DEFAULT_IMAGE)
                }
            }
        });
    }

    async function handleSelectImage() {
        try {
            await launchImageLibrary({
                includeBase64: true,
                maxHeight: 512,
                maxWidth: 512,
                quality: 0.8
            }, async (res) => {
                console.log('res : ' + JSON.stringify(res))
                if (res?.assets[0]?.base64) {
                    setSelectedImage(res?.assets[0].base64)
                } else {
                    setSelectedImage(DEFAULT_IMAGE)
                }
            })
        } catch (error) {
            console.log('err : ' + error);
        }
    }

    async function uploadBanner() {
        setIsLoading(true)
        await BANNER_REFERENCE.update({
            imageUrl: [selectedImage]
        })
            .then(() => {
                setIsLoading(false)
                setCurrentBanner(selectedImage)
                alert('Banner updated')
                console.log('sukses')
            })
            .catch((err) => {
                setIsLoading(false)
                console.log('error : ' + err)
                alert(err)
            })
    }

    return (
        <Screen style={styles.container}>
            <Text style={TEXT_EXTRA_LARGE_BOLD}>Tap Image to update current banner!</Text>
            <TouchableOpacity activeOpacity={.6} onPress={() => handleSelectImage()}>
                <Image source={{ uri: 'data:image/png;base64, ' + selectedImage }} style={{ width: width, height: Mixins.scaleSize(215), alignSelf: 'center', borderRadius: 12, marginTop: Mixins.scaleSize(24) }} resizeMode={'contain'} />
            </TouchableOpacity>
            <View style={styles.buttonContainer}>
                <Button disabled={isLoading || currentBanner == selectedImage} text={'Update'} onPress={() => uploadBanner()} />
            </View>
            <View style={styles.buttonContainer}>
                <Button disabled={false} text={'Logout'} onPress={() => logOut()} />
            </View>
            <RenderModal visible={isLoading}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default BannerScreen