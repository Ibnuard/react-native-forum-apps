import * as React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import Screen from '../components/Screen/Component'
import Button from '../components/Button/Component'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../store/Context'
import { Avatar } from 'react-native-paper'
import { TEXT_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR } from '../common/Typography'
import styles from './styles/ProfileScreen'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'

import { DELETE_POST, LIKE_POST, POST_REFERENCE, REPORT_POST, USER_REFERENCE } from '../api/Firestore'
import { Colors, Mixins } from '../styles';

import auth from '@react-native-firebase/auth'
import PostCard from '../components/Card/PostCard/Component'
import AntDesign from 'react-native-vector-icons/AntDesign'
import _ from 'lodash'
import { ADMIN_PROFILE } from '../common/DefaultImage';
import { sortOnKey } from '../utils/utils';

const ProfileScreen = ({ navigation, route }) => {
    const [isLoading, setIsLoading] = React.useState(false)
    const [totalPost, setTotalPost] = React.useState(0)
    const [post, setPost] = React.useState([])
    const [showMenu, setShowMenu] = React.useState(false)
    const [selectedPost, setSelectedPost] = React.useState([])
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)

    const [userData, setUserData] = React.useState([])

    const isFromHome = route?.params?.data
    const isFromComment = route?.params?.comment
    const isAdmin = route?.params?.admin

    const user = auth().currentUser

    React.useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // do something
            getUserData()
        });

        return unsubscribe;
    }, [navigation]);

    const { logOut, currentUser } = React.useContext(AuthContext)

    console.log('test : ' + user?.providerData[0]?.providerId)

    async function getUserData() {

        if (isFromHome) {
            await POST_REFERENCE
                .where('creatorEmail', '==', isFromHome?.creatorEmail)
                .get()
                .then((querySnapshot) => {
                    console.log('size : ' + querySnapshot.size)
                    setTotalPost(querySnapshot.size)
                })

            const data = await USER_REFERENCE.doc(isFromHome?.creatorEmail).get()
            setUserData(data.data())
        } else if (isFromComment) {
            await POST_REFERENCE
                .where('creatorEmail', '==', isFromComment?.email)
                .get()
                .then((querySnapshot) => {
                    console.log('size : ' + querySnapshot.size)
                    setTotalPost(querySnapshot.size)
                })

            const data = await USER_REFERENCE.doc(isFromComment?.email).get()
            setUserData(data.data())
        } else if (isAdmin) {
            await POST_REFERENCE
                .where('creatorEmail', '==', isAdmin?.email)
                .get()
                .then((querySnapshot) => {
                    console.log('size : ' + querySnapshot.size)
                    setTotalPost(querySnapshot.size)
                })

            const data = await USER_REFERENCE.doc(isAdmin?.email).get()
            setUserData(data.data())
        } else {
            await POST_REFERENCE
                .where('creatorEmail', '==', currentUser?.email)
                .get()
                .then((querySnapshot) => {
                    console.log('size : ' + querySnapshot.size)
                    setTotalPost(querySnapshot.size)
                })

            const data = await USER_REFERENCE.doc(currentUser?.email).get()
            setUserData(data.data())
        }
    }

    React.useEffect(() => {
        if (userData?.email) {
            return POST_REFERENCE.where('creatorEmail', '==', userData?.email).onSnapshot((querySnapshot) => {
                const list = [];
                querySnapshot.forEach(doc => {
                    list.push({ ...doc.data(), id: doc.id, });
                });

                /*
                const filtered = list.filter(function (item) {
                    return item.creatorEmail == userData?.email
                })*/

                setPost(sortOnKey(list, 'timestamp'));
            });
        } else if (isFromHome?.creatorEmail == '4dm1n2021') {
            return POST_REFERENCE.where('creatorEmail', '==', '4dm1n2021').onSnapshot((querySnapshot) => {
                const list = [];
                querySnapshot.forEach(doc => {
                    list.push({ ...doc.data(), id: doc.id, });
                });

                /*
                const filtered = list.filter(function (item) {
                    return item.creatorEmail == userData?.email
                })*/

                setPost(sortOnKey(list, 'timestamp'));
            });
        }

    }, [userData?.email])

    async function handleLogout() {
        setIsLoading(true)
        console.log('Logging out : ' + JSON.stringify(user?.providerData[0].providerId))

        if (currentUser?.email == '4dm1n2021') {
            console.log('Logging out admin...')
            logOut()
        } else {
            if (user?.providerData[0]?.providerId == 'password') {
                console.log('Logging out email/pass...')
                auth().signOut()
                setIsLoading(false)
                logOut()
            } else {
                try {
                    console.log('Logging out google...')
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    auth().signOut()
                    setIsLoading(false)
                    logOut()
                } catch (error) {
                    setIsLoading(false)
                    console.error(error);
                }
            }
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
                <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                    {isFromHome || isAdmin || isFromComment ? <TouchableOpacity style={styles.backButton} activeOpacity={.6} onPress={() => navigation.goBack()}>
                        <AntDesign name={'arrowleft'} size={18} color={Colors.COLOR_WHITE} />
                    </TouchableOpacity> : null}
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.email]}>{isFromHome?.creatorEmail == '4dm1n2021' ? 'PapiaCumi Admin' : userData?.email ?? '-'}</Text>
                </View>
                {!isFromHome && !isAdmin && !isFromComment ? <TouchableOpacity onPress={() => handleLogout()}>
                    <Text style={{ ...TEXT_NORMAL_BOLD, color: Colors.COLOR_WHITE }}>Logout</Text>
                </TouchableOpacity> : null}
            </View>
            <View style={styles.topContainer}>
                {/*<Avatar.Image size={48} source={{ uri: 'data:image/jpeg;base64,' + userData?.photoUrl }} />*/}
                <Image source={{ uri: 'data:image/jpeg;base64,' + userData?.photoUrl }} style={{ height: Mixins.scaleSize(96), width: Mixins.scaleSize(96), borderRadius: 12, backgroundColor: Colors.COLOR_DARK_GRAY }} />
                <View style={styles.info}>
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.name]}>{isFromHome?.creatorEmail == '4dm1n2021' ? 'PapiaCumi Admin' : userData?.name ?? 'Loading...'} | </Text>
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.name]}>{totalPost} {totalPost >= 2 ? 'Posts' : 'Post'}</Text>
                </View>
                <View style={{ flexDirection: 'row' }}>
                    {!isFromHome && !isAdmin && !isFromComment ? <Button
                        buttonStyle={{ backgroundColor: Colors.COLOR_WHITE, borderRadius: 24, width: '40%', marginHorizontal: Mixins.scaleSize(8) }}
                        textStyle={{ color: Colors.COLOR_PRIMARY }}
                        text='Edit Profile'
                        onPress={() => navigation.navigate('EditProfile', { data: userData })} /> : null}
                    {!isFromHome && !isAdmin && !isFromComment && user?.providerData[0]?.providerId == 'password' ? <Button
                        buttonStyle={{ backgroundColor: Colors.COLOR_WHITE, borderRadius: 24, width: '40%', marginHorizontal: Mixins.scaleSize(8) }}
                        textStyle={{ color: Colors.COLOR_PRIMARY }}
                        text='Reset Password'
                        onPress={() => navigation.navigate('ResetPassword', { data: userData })} /> : null}
                </View>
            </View>
            <View style={{ backgroundColor: Colors.COLOR_PRIMARY, padding: Mixins.scaleSize(12), marginVertical: .25 }}>
                <Text style={{ ...TEXT_MEDIUM_BOLD, color: Colors.COLOR_WHITE }}>{totalPost == 0 ? 'No Post Yet!' : totalPost >= 2 ? 'Posts' : 'Post'}</Text>
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
            <Snackbar
                visible={snackBar}
                duration={3000}
                onDismiss={() => setSnackBar(false)}>
                Report success, Thanks for reporting!
            </Snackbar>
        </Screen>
    )
}

export default ProfileScreen