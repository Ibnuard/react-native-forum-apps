import * as React from 'react'
import { View, Image, FlatList, StatusBar, Text } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'
import _ from 'lodash'

import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import { deleteQueryBatch, DELETE_POST, GET_IMAGE_BANNER, IMAGE_REFERENCE, LIKE_POST, POST_REFERENCE, REPORT_POST } from '../api/Firestore'
import { FAB } from 'react-native-paper'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'
import { TEXT_MEDIUM_BOLD } from '../common/Typography'

import AntDesign from 'react-native-vector-icons/AntDesign'

const HomeScreen = ({ navigation, route }) => {
    const [post, setPost] = React.useState([])
    const { currentUser } = React.useContext(AuthContext)
    const [showMenu, setShowMenu] = React.useState(false)
    const [selectedPost, setSelectedPost] = React.useState([])
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)
    const [banner, setBanner] = React.useState([])

    React.useEffect(() => {
        return POST_REFERENCE.orderBy('timestamp').onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            setPost(_.reverse(list));
        });
    }, [])

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getBanner()
        });

        return unsubscribe;
    }, [navigation])

    async function getBanner() {
        console.log('getting baner...');
        const banner = await GET_IMAGE_BANNER()
        setBanner(banner?.imageUrl)
    }


    async function toggleLike(id) {
        console.log('like pressed')
        await LIKE_POST(id, currentUser?.email)
            .then(() => {
                console.log('Sukes Like / Unlike');
            })
            .catch((err) => {
                console.log('Err : ' + err);
            })
    }

    async function toggleReport() {
        setModalType('loading')
        await REPORT_POST(selectedPost?.id, currentUser?.email, selectedPost)
            .then(() => {
                setShowMenu(false)
                setSnackBar(true)
            })
            .catch((err) => {
                setShowMenu(false)
                console.log('err :' + err)
            })
    }

    async function toggleDeletePost() {
        setModalType('loading')
        /*
        await DELETE_POST(selectedPost?.id)
            .then(() => {
                console.log('Delete Success!!');
                setShowMenu(false)
            })
            .catch((err) => {
                console.log('Delet failed!!')
                setShowMenu(false)
            })
            */
        await deleteQueryBatch(selectedPost?.id)
            .then(() => {
                setShowMenu(false)
                console.log('Delete Sukses!')
            })
            .catch((err) => {
                setShowMenu(false)
                console.log('Delete Failed : ' + err)
            })
    }

    const menu = [
        {
            text: 'See Posts',
            onPress: () => (setShowMenu(false), navigation.navigate('Detail', { data: selectedPost }))
        },
        {
            text: selectedPost?.creatorEmail == currentUser?.email || currentUser?.email == '4dm1n2021' ? 'Delete Post' : 'Report',
            onPress: () => selectedPost?.creatorEmail == currentUser?.email || currentUser?.email == '4dm1n2021' ? toggleDeletePost() : toggleReport()
        },
        {
            text: 'Cancel',
            textStyle: { color: Colors.COLOR_RED },
            onPress: () => (setShowMenu(false), setSelectedPost([]))
        },
    ]

    return (
        <Screen theme={'dark'}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <Image source={IMAGES.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            {!post.length ?
                <View style={styles.noPost}>
                    <AntDesign name={'frowno'} size={60} color={Colors.COLOR_DARK_GRAY} />
                    <Text style={[{ ...TEXT_MEDIUM_BOLD, color: Colors.COLOR_DARK_GRAY }, styles.noPostText]}>No Post Yet!</Text>
                </View> :
                <FlatList
                    data={post}
                    contentContainerStyle={styles.listSpacing}
                    renderItem={({ item, index }) =>
                        <>
                            <PostCard
                                data={item}
                                user={currentUser}
                                showBottom={currentUser?.email !== '4dm1n2021'}
                                onLikePress={() => toggleLike(item?.id)}
                                onProfilePress={() => navigation.navigate('ProfileDetail', { data: item })}
                                onOptionsPress={() => (setModalType('popup'), setSelectedPost(item), setShowMenu(true))}
                                onCommentPress={() => navigation.navigate('Detail', { data: item })}
                                onCardPress={() => navigation.navigate('Detail', { data: item })} />
                            {currentUser?.email == '4dm1n2021' ? <View style={{ width: '100%', height: 5 }} /> : null}
                            {index !== 0 && (index + 1) % 5 == 0 && (index + 1) !== post?.length ? <Image source={{ uri: 'data:image/png;base64,' + banner[0] }} resizeMode={'cover'} style={{ width: '100%', minHeight: 180, maxHeight: 256 }} /> : null}
                        </>
                    } />
            }
            <FAB
                visible={!showMenu && !snackBar && currentUser.email !== '4dm1n2021'}
                style={styles.fab}
                small
                color={'white'}
                icon="plus"
                onPress={() => navigation.navigate('PostTopic')}
            />
            <RenderModal visible={showMenu}>
                {modalType == 'popup' ? <Menu item={menu} /> : <Indicator />}
            </RenderModal>
            <Snackbar
                visible={snackBar}
                duration={3000}
                onDismiss={() => setSnackBar(false)}>
                Report success, Thanks for reporting!
            </Snackbar>
        </Screen>
    )
}

export default HomeScreen