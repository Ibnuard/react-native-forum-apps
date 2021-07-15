import * as React from 'react'
import { View, Text, FlatList, TouchableOpacity, Image } from 'react-native'
import Screen from '../components/Screen/Component'
import Button from '../components/Button/Component'
import { GoogleSignin } from '@react-native-google-signin/google-signin';
import { AuthContext } from '../store/Context'
import { Avatar } from 'react-native-paper'
import { TEXT_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR, TEXT_SMALL_BOLD } from '../common/Typography'
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
import { IMAGES } from '../common/Images';

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
                auth().signOut().then(() => setIsLoading(false))
                logOut()
            } else {
                try {
                    console.log('Logging out google...')
                    await GoogleSignin.revokeAccess();
                    await GoogleSignin.signOut();
                    auth().signOut().then(() => setIsLoading(false))
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
        <Screen theme={'dark'} style={{ backgroundColor: Colors.COLOR_WHITE }}>
            <View style={styles.headerBar}>
                <Image source={IMAGES.logo} style={{ width: Mixins.scaleSize(80), height: Mixins.scaleSize(20) }} />
            </View>
            <View style={{ backgroundColor: Colors.COLOR_PRIMARY, height: Mixins.scaleSize(125), width: '100%', position: 'relative' }} />
            <View style={{ marginTop: -120 }}>
                <View style={{ backgroundColor: Colors.COLOR_WHITE, margin: Mixins.scaleSize(18), paddingVertical: Mixins.scaleSize(24), justifyContent: 'center', alignItems: 'center', borderRadius: 8, elevation: 3 }}>
                    <Image source={{ uri: 'data:image/jpeg;base64,' + userData?.photoUrl }} style={{ height: Mixins.scaleSize(72), width: Mixins.scaleSize(72), borderRadius: 36, backgroundColor: Colors.COLOR_DARK_GRAY }} />
                    <Text style={[{ ...TEXT_MEDIUM_BOLD }, styles.nameDark]}>{isFromHome?.creatorEmail == '4dm1n2021' ? 'PapiaCumi Admin' : userData?.name ?? 'Loading...'}</Text>
                    <Text style={[{ ...TEXT_SMALL_BOLD, color: 'gray' }]}>{isFromHome?.creatorEmail == '4dm1n2021' ? 'PapiaCumi Admin' : userData?.email ?? 'Loading...'}</Text>
                    <Text style={[{ ...TEXT_SMALL_BOLD, color: 'gray' }]}>{isFromHome?.creatorEmail == '4dm1n2021' ? 'PapiaCumi Admin' : userData?.phone ?? 'Loading...'}</Text>
                </View>
                <View>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: Mixins.scaleSize(12), borderBottomWidth: .25, borderBottomColor: 'grey' }} onPress={() => navigation.jumpTo('Home')}>
                        <View style={{ width: Mixins.scaleSize(36), height: Mixins.scaleSize(36), backgroundColor: Colors.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center', borderRadius: 18, marginRight: Mixins.scaleSize(10) }}>
                            <AntDesign name={'antdesign'} size={18} color={'white'} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Dashboard</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: Mixins.scaleSize(12), borderBottomWidth: .25, borderBottomColor: 'grey' }} onPress={() => navigation.navigate('EditProfile', { data: userData })}>
                        <View style={{ width: Mixins.scaleSize(36), height: Mixins.scaleSize(36), backgroundColor: Colors.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center', borderRadius: 18, marginRight: Mixins.scaleSize(10) }}>
                            <AntDesign name={'edit'} size={18} color={'white'} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Edit Profile</Text>
                    </TouchableOpacity>
                    {user?.providerData[0]?.providerId == 'password' ? <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: Mixins.scaleSize(12), borderBottomWidth: .25, borderBottomColor: 'grey' }} onPress={() => navigation.navigate('ResetPassword', { data: userData })}>
                        <View style={{ width: Mixins.scaleSize(36), height: Mixins.scaleSize(36), backgroundColor: Colors.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center', borderRadius: 18, marginRight: Mixins.scaleSize(10) }}>
                            <AntDesign name={'key'} size={18} color={'white'} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Reset Password</Text>
                    </TouchableOpacity> : null}
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: Mixins.scaleSize(12), borderBottomWidth: .25, borderBottomColor: 'grey' }} onPress={() => navigation.jumpTo('Topic')}>
                        <View style={{ width: Mixins.scaleSize(36), height: Mixins.scaleSize(36), backgroundColor: Colors.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center', borderRadius: 18, marginRight: Mixins.scaleSize(10) }}>
                            <AntDesign name={'staro'} size={18} color={'white'} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Suggestion Topic</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', padding: Mixins.scaleSize(12), borderBottomWidth: .25, borderBottomColor: 'grey' }} onPress={() => handleLogout()}>
                        <View style={{ width: Mixins.scaleSize(36), height: Mixins.scaleSize(36), backgroundColor: Colors.COLOR_PRIMARY, justifyContent: 'center', alignItems: 'center', borderRadius: 18, marginRight: Mixins.scaleSize(10) }}>
                            <AntDesign name={'logout'} size={18} color={'white'} />
                        </View>
                        <Text style={{ ...TEXT_MEDIUM_BOLD }}>Logout</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <RenderModal visible={showMenu}>
                <Indicator />
            </RenderModal>
        </Screen>
    )
}

export default ProfileScreen