import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity, BackHandler, Keyboard, Image, Dimensions, ScrollView } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors, Mixins } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'
import Button from '../components/Button/Component'

import { TEXT_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_MEDIUM_REGULAR, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR, TEXT_SMALL_REGULAR } from '../common/Typography'

//firebase
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles/TopicScreen'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { POST_REFERENCE } from '../api/Firestore'

const TopicScreen = ({ navigation, route }) => {
    const selectedPost = route?.params?.post

    const [post, setPost] = React.useState({ title: selectedPost?.title ?? '', description: selectedPost?.description ?? '' })
    const [isLoading, setIsLoading] = React.useState(false)
    const [showMenu, setShowMenu] = React.useState(false)
    const postRef = firestore().collection('Posts')
    const [modalType, setModalType] = React.useState('popup')
    const [selectedImage, setSelectedImage] = React.useState(selectedPost?.banner ?? '')

    const { width } = Dimensions.get('window')

    const { currentUser } = React.useContext(AuthContext)



    async function sendPost() {
        setIsLoading(true)
        Keyboard.dismiss()

        const postStructure = {
            title: post.title,
            description: post.description,
            timestamp: moment().format(),
            creatorName: currentUser?.email == '4dm1n2021' ? 'PapiaCumi Admin' : currentUser?.name,
            creatorEmail: currentUser?.email,
            creatorProfilePic: currentUser?.photoUrl,
            banner: selectedImage,
            likeCounts: 0,
            dislikeCounts: 0,
            commentCounts: 0,
            reportCounts: 0,
            likeUser: [],
            dislikeUser: []
        }

        await postRef
            .add(postStructure)
            .then(() => {
                console.log('Posted!!');
                setIsLoading(false)
                setPost({ title: '', description: '' })
                navigation.goBack()
            })
            .catch((err) => {
                setIsLoading(false)
                console.log('error: ' + err)
            })
    }

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
                setSelectedImage('')
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
                setSelectedImage('')
            }
        })
    }

    async function updatePost() {
        setIsLoading(true)
        await POST_REFERENCE.doc(selectedPost?.id).update({
            title: post.title,
            description: post.description,
            timestamp: moment().format(),
            banner: selectedImage
        }).then(() => {
            console.log('Posted!!');
            setIsLoading(false)
            setPost({ title: '', description: '' })
            navigation.goBack()
        })
            .catch((err) => {
                setIsLoading(false)
                console.log('error: ' + err)
            })
    }

    const menu = [
        {
            text: 'Take a picture',
            onPress: () => (setShowMenu(false), handleTakePicture())
        },
        {
            text: 'Select from gallery',
            onPress: () => (setShowMenu(false), handleSelectImage())
        },
        {
            text: 'Cancel',
            textStyle: { color: Colors.COLOR_RED },
            onPress: () => setShowMenu(false)
        },
    ]

    return (
        <>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()}>
                    <AntDesign name={'arrowleft'} size={18} color={Colors.COLOR_WHITE} />
                </TouchableOpacity>
                <Text style={[{ ...TEXT_LARGE_BOLD }, styles.title]}>{selectedPost ? 'Edit Topic' : 'Create Topic'}</Text>
            </View>
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <Screen style={styles.screenContainer}>
                    <View style={{ marginBottom: Mixins.scaleSize(62) }} >
                        <TextInput
                            placeholder={'Enter title'}
                            placeholderTextColor={Colors.COLOR_DARK_GRAY}
                            style={{ backgroundColor: Colors.COLOR_LIGHT_GRAY, color: Colors.COLOR_BLACK, paddingHorizontal: 12, borderRadius: 6, height: 48 }}
                            value={post.title}
                            maxLength={64}
                            onChangeText={(text) => setPost({ ...post, title: text })} />
                        <View style={{ backgroundColor: Colors.COLOR_LIGHT_GRAY, borderRadius: 6, minHeight: 100, maxHeight: 200, marginVertical: 14 }}>
                            <TextInput
                                placeholder={'Enter Description'}
                                placeholderTextColor={Colors.COLOR_DARK_GRAY}
                                style={{ color: Colors.COLOR_BLACK, paddingHorizontal: 12 }}
                                value={post.description}
                                maxLength={512}
                                multiline
                                onChangeText={(text) => setPost({ ...post, description: text })} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Topic Banner</Text>

                        {!selectedImage?.length ? <TouchableOpacity activeOpacity={.6} style={styles.addBannerButton} onPress={() => setShowMenu(true)}>
                            <MaterialIcon name={'photo'} size={20} color={Colors.COLOR_SECONDARY} />
                            <Text style={[{ ...TEXT_NORMAL_BOLD, color: Colors.COLOR_SECONDARY }, styles.addBannerText]}>Add topic banner</Text>
                        </TouchableOpacity> : null}

                        {selectedImage?.length ? <TouchableOpacity onPress={() => setSelectedImage('')} style={{ width: 100, marginTop: 14 }}>
                            <Image source={{ uri: `data:image/jpeg;base64,${selectedImage}` }} style={{ height: 100, width: 100, borderRadius: 20 }} />
                            <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.imageCaption]} >Tap image to remove</Text>
                        </TouchableOpacity> : null}
                    </View>
                    <Button disabled={!post.title || !post.description || isLoading} text={selectedImage ? 'Update' : 'Post'} onPress={() => selectedPost ? updatePost() : sendPost()} />
                    <RenderModal visible={showMenu}>
                        {modalType == 'popup' ? <Menu item={menu} /> : <Indicator />}
                    </RenderModal>
                </Screen>
            </ScrollView>
        </>
    )
}

export default TopicScreen