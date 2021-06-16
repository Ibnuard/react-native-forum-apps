import * as React from 'react'
import { View, Text, FlatList } from 'react-native'
import Screen from '../components/Screen/Component'
import Button from '../components/Button/Component'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../store/Context'
import { Avatar } from 'react-native-paper'
import { TEXT_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_REGULAR } from '../common/Typography'
import styles from './styles/ProfileScreen'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'

import { DELETE_POST, LIKE_POST, POST_REFERENCE, REPORT_POST } from '../api/Firestore'
import { Colors } from '../styles';

import PostCard from '../components/Card/PostCard/Component'
import _ from 'lodash'

const ProfileScreen = ({ navigation }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [totalPost, setTotalPost] = React.useState(0)
    const [post, setPost] = React.useState([])
    const [showMenu, setShowMenu] = React.useState(false)
    const [selectedPost, setSelectedPost] = React.useState([])
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getUserData()
        });

        return unsubscribe;
    }, [navigation]);

    const { logOut, currentUser } = React.useContext(AuthContext)

    async function getUserData() {
        await POST_REFERENCE
            .where('creatorEmail', '==', currentUser?.email)
            .get()
            .then((querySnapshot) => {
                console.log('size : ' + querySnapshot.size)
                setTotalPost(querySnapshot.size)
            })
    }

    React.useEffect(() => {
        return POST_REFERENCE.orderBy('timestamp').onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });

            const filtered = list.filter(function (item) {
                return item.creatorEmail == currentUser?.email
            })

            setPost(_.reverse(filtered));
        });
    }, [])

    async function handleLogout() {
        setIsLoading(true)
        console.log('Logging out....')
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            setIsLoading(false)
            logOut()
        } catch (error) {
            setIsLoading(false)
            console.error(error);
        }
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
        await DELETE_POST(selectedPost?.id)
            .then(() => {
                console.log('Delete Success!!');
                setShowMenu(false)
            })
            .catch((err) => {
                console.log('Delet failed!!')
                setShowMenu(false)
            })
    }

    const menu = [
        {
            text: 'See Posts',
            onPress: () => (setShowMenu(false), navigation.navigate('Detail', { data: selectedPost }))
        },
        {
            text: selectedPost?.creatorEmail == currentUser?.email ? 'Delete Post' : 'Report',
            onPress: () => selectedPost?.creatorEmail == currentUser?.email ? toggleDeletePost() : toggleReport()
        },
        {
            text: 'Cancel',
            textStyle: { color: Colors.COLOR_RED },
            onPress: () => (setShowMenu(false), setSelectedPost([]))
        },
    ]

    return (
        <Screen theme={'dark'}>
            <View style={styles.headerBar}>
                <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.email]}>{currentUser?.email}</Text>
            </View>
            <View style={styles.topContainer}>
                <Avatar.Image size={48} source={{ uri: currentUser?.photoUrl }} />
                <View style={styles.info}>
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.name]}>{currentUser?.name} | </Text>
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.name]}>{totalPost} {totalPost >= 2 ? 'Posts' : 'Post'}</Text>
                </View>
                <Button
                    buttonStyle={{ backgroundColor: Colors.COLOR_WHITE, borderRadius: 24, width: '50%' }}
                    textStyle={{ color: Colors.COLOR_PRIMARY }}
                    text='Logout'
                    onPress={() => handleLogout()} />
            </View>
            <View style={{ backgroundColor: Colors.COLOR_PRIMARY, padding: 12, marginVertical: .25 }}>
                <Text style={{ ...TEXT_MEDIUM_BOLD, color: Colors.COLOR_WHITE }}>{totalPost == 0 ? 'No Post Yet!' : totalPost >= 2 ? 'My Posts' : 'My Post'}</Text>
            </View>

            <FlatList
                data={post}
                contentContainerStyle={styles.listSpacing}
                renderItem={({ item, index }) =>
                    <PostCard
                        data={item}
                        user={currentUser}
                        onLikePress={() => toggleLike(item?.id)}
                        onOptionsPress={() => (setModalType('popup'), setSelectedPost(item), setShowMenu(true))}
                        onCommentPress={() => navigation.navigate('Detail', { data: item })}
                        onCardPress={() => navigation.navigate('Detail', { data: item })} />
                } />
            <RenderModal visible={showMenu}>
                {modalType == 'popup' ? <Menu item={menu} /> : <Indicator />}
            </RenderModal>
        </Screen>
    )
}

export default ProfileScreen