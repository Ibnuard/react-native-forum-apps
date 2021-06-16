import * as React from 'react'
import { View, Image, FlatList, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'
import _ from 'lodash'

import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import { LIKE_POST, POST_REFERENCE, REPORT_POST } from '../api/Firestore'
import { FAB } from 'react-native-paper'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'

const HomeScreen = ({ navigation }) => {
    const [post, setPost] = React.useState([])
    const { currentUser } = React.useContext(AuthContext)
    const [showMenu, setShowMenu] = React.useState(false)
    const [selectedPost, setSelectedPost] = React.useState([])
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)

    React.useEffect(() => {
        return POST_REFERENCE.orderBy('timestamp').onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            setPost(_.reverse(list));
        });
    }, [])


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
                setModalType('popup')
                setSnackBar(true)
            })
            .catch((err) => {
                setShowMenu(false)
                setModalType('popup')
                console.log('err :' + err)
            })
    }

    const menu = [
        {
            text: selectedPost?.creatorEmail == currentUser?.email ? 'Delete Post' : 'See Posts',
            onPress: () => (setShowMenu(false), navigation.navigate('Detail', { data: selectedPost }))
        },
        {
            text: 'Report',
            onPress: () => toggleReport()
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
            <FlatList
                data={post}
                contentContainerStyle={styles.listSpacing}
                renderItem={({ item, index }) =>
                    <PostCard
                        data={item}
                        user={currentUser}
                        onLikePress={() => toggleLike(item?.id)}
                        onOptionsPress={() => (setSelectedPost(item), setShowMenu(true))}
                        onCommentPress={() => navigation.navigate('Detail', { data: item })}
                        onCardPress={() => navigation.navigate('Detail', { data: item })} />
                } />
            <FAB
                visible={!showMenu && !snackBar}
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