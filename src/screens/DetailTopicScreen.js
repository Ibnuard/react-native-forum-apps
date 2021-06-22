import * as React from 'react'
import { View, Image, FlatList, StatusBar, TouchableOpacity, Text, TextInput, Keyboard, ScrollView } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors, Mixins } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'
import CommentCard from '../components/Card/CommentCard/Component'

import styles from './styles/DetailTopicScreen'
import _ from 'lodash'

import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import IonIcons from 'react-native-vector-icons/Ionicons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { TEXT_LARGE_BOLD, TEXT_MEDIUM_REGULAR, TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../common/Typography'
import { COMMENT_POST, deleteQueryBatch, DELETE_COMMENT, DELETE_POST, LIKE_POST, POST_REFERENCE, REPORT_COMMENT, REPORT_POST } from '../api/Firestore'
import moment from 'moment'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'


const DetailTopicScreen = ({ navigation, route }) => {
    const { currentUser } = React.useContext(AuthContext)
    const POST_DATA = route?.params?.data

    const [post, setPost] = React.useState(POST_DATA)
    const [comment, setComment] = React.useState('')
    const [commentList, setCommentList] = React.useState([])
    const [showMenu, setShowMenu] = React.useState(false)
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)
    const [selectedComment, setSelectedComment] = React.useState(null)

    React.useEffect(() => {
        return POST_REFERENCE.doc(POST_DATA?.id).collection('Comments').orderBy('timestamp').onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            setCommentList(_.reverse(list));
        });
    }, [])

    React.useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .doc(POST_DATA?.id)
            .onSnapshot(documentSnapshot => {
                setPost(documentSnapshot.data())
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [POST_DATA.id]);

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

    async function toggleComment() {
        console.log('post comment....');
        setComment('')
        Keyboard.dismiss()

        const commentData = {
            comment: comment,
            timestamp: moment().format()
        }

        await COMMENT_POST(POST_DATA?.id, currentUser, commentData)
            .then(() => {
                console.log('Sukses post comment!');
            })
            .catch((err) => {
                console.log('err: ' + err);
            })
    }

    async function toggleReport() {
        setModalType('loading')
        await REPORT_POST(POST_DATA?.id, currentUser?.email, post)
            .then(() => {
                setShowMenu(false)
                setSnackBar(true)
            })
            .catch((err) => {
                setShowMenu(false)
                console.log('err :' + err)
            })
    }

    async function toggleReportComment() {
        setModalType('loading')
        setShowMenu(true)
        await REPORT_COMMENT(commentList[selectedComment]?.id, currentUser?.email, commentList[selectedComment])
            .then(() => {
                setSelectedComment(null)
                setShowMenu(false)
                setSnackBar(true)
            })
            .catch((err) => {
                setSelectedComment(null)
                setShowMenu(false)
                console.log('err :' + err)
            })
    }

    async function toggleDeletePost() {
        setModalType('loading')
        await deleteQueryBatch(POST_DATA?.id)
            .then(() => {
                console.log('Delete Success!!');
                setPost(POST_DATA)
                setShowMenu(false)
                navigation.goBack()
            })
            .catch((err) => {
                console.log('Delet failed!!')
                setShowMenu(false)
            })
    }

    async function toggleDeleteComment() {
        setModalType('loading')
        setShowMenu(true)
        await DELETE_COMMENT(POST_DATA?.id, commentList[selectedComment]?.id)
            .then(() => {
                setSelectedComment(null)
                console.log('Delete Success!!');
                setShowMenu(false)
            })
            .catch((err) => {
                console.log('Delet failed!!')
                setSelectedComment(null)
                setShowMenu(false)
            })
    }

    const menu = [
        {
            text: post?.creatorEmail == currentUser?.email ? 'Delete Post' : 'Report',
            onPress: () => post?.creatorEmail == currentUser?.email ? toggleDeletePost() : toggleReport()
        },
        {
            text: 'Cancel',
            textStyle: { color: Colors.COLOR_RED },
            onPress: () => setShowMenu(false)
        },
    ]

    return (
        <Screen theme={'dark'}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()}>
                    <AntDesign name={'arrowleft'} size={18} color={Colors.COLOR_WHITE} />
                </TouchableOpacity>
                <Text style={[{ ...TEXT_LARGE_BOLD }, styles.title]}>Topic</Text>
            </View>

            <FlatList
                data={commentList}
                contentContainerStyle={{ paddingBottom: Mixins.scaleSize(82) }}
                ListHeaderComponent={
                    <>
                        <PostCard
                            data={post}
                            user={currentUser}
                            showComment={false}
                            onProfilePress={() => navigation.navigate('ProfileDetail', { data: post })}
                            onLikePress={() => toggleLike(POST_DATA?.id)}
                            onOptionsPress={() => (setModalType('popup'), setShowMenu(true))}
                            onCardPress={() => null} />

                        <View style={styles.commentDivider}>
                            <Text style={{ ...TEXT_NORMAL_BOLD }}>Comment</Text>
                            <Text style={{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_DARK_GRAY }}>  ●  {post?.commentCounts == 0 ? 'No comments yet' : `${post?.commentCounts} comments`}</Text>
                        </View>
                    </>
                }
                renderItem={({ item, index }) =>
                    <CommentCard
                        data={item}
                        isSelected={selectedComment == index}
                        email={currentUser?.email}
                        onProfilePress={() => navigation.navigate('ProfileDetail', { comment: item })}
                        onButtonPrees={(t) => t == 'r' ? toggleReportComment() : toggleDeleteComment()}
                        onPress={() => selectedComment !== index ? setSelectedComment(index) : setSelectedComment(null)} />
                } />

            {selectedComment == null ? <View style={styles.bottomContainer}>
                <TextInput
                    style={styles.inputStyle}
                    placeholderTextColor={Colors.COLOR_DARK_GRAY}
                    placeholder={'Enter your comment...'}
                    multiline={false}
                    maxLength={100}
                    onChangeText={(text) => setComment(text)}
                    value={comment} />
                <TouchableOpacity style={styles.sendButton} activeOpacity={comment.length ? .6 : 1} onPress={() => comment.length ? toggleComment() : null}>
                    <IonIcons name={'send'} size={20} color={comment.length ? Colors.COLOR_PRIMARY : Colors.COLOR_DARK_GRAY} />
                </TouchableOpacity>
            </View> : null}
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

export default DetailTopicScreen