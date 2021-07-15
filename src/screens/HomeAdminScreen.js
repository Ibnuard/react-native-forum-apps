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
import { COMMENT_POST, deleteQueryBatch, DELETE_COMMENT, DELETE_POST, DISLIKE_COMMENT, DISLIKE_POST, LIKE_COMMENT, LIKE_POST, onCommentReported, POST_REFERENCE, REPLY_COMMENT, REPORT_COMMENT, REPORT_POST } from '../api/Firestore'
import moment from 'moment'

import RenderModal from '../components/Modal/Component';
import Menu from '../components/Modal/Menu/Component'
import Indicator from '../components/Modal/Indicator/Component'
import { Snackbar } from 'react-native-paper'


const HomeAdminScreen = ({ navigation, route }) => {
    const { currentUser } = React.useContext(AuthContext)
    const POST_DATA = route?.params?.data

    const [post, setPost] = React.useState(POST_DATA)
    const [comment, setComment] = React.useState('')
    const [commentList, setCommentList] = React.useState([])
    const [replyList, setReplyList] = React.useState([])
    const [showMenu, setShowMenu] = React.useState(false)
    const [modalType, setModalType] = React.useState('popup')
    const [snackBar, setSnackBar] = React.useState(false)
    const [selectedComment, setSelectedComment] = React.useState(null)
    const [replyAt, setReplyAt] = React.useState(null)
    const id = 'ADMIN'

    React.useEffect(() => {
        return POST_REFERENCE.doc(id).collection('Comments').orderBy('timestamp').onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            const filterReply = list.filter(function (item) {
                return !item?.replyAt
            })

            const filterGetReply = list.filter(function (item) {
                return item?.replyAt
            })
            setCommentList(filterReply);
            setReplyList(filterGetReply)
        });
    }, [])

    console.log('reindx : ' + selectedComment);

    React.useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .doc(id)
            .onSnapshot(documentSnapshot => {
                setPost(documentSnapshot.data())
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [id]);

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
            timestamp: moment().format(),
            reportCounts: 0,
            likeCounts: 0,
            dislikeCounts: 0,
            likeUser: [],
            dislikeUser: []
        }

        if (!replyAt) {
            await COMMENT_POST(id, currentUser, commentData, true)
                .then(() => {
                    console.log('Sukses post comment!');
                })
                .catch((err) => {
                    console.log('err: ' + err);
                })
        } else {
            await COMMENT_POST(id, currentUser, { ...commentData, replyAt: replyAt?.id }, false)
                .then(() => {
                    setReplyAt(null)
                    console.log('Sukses post comment!');
                })
                .catch((err) => {
                    setReplyAt(null)
                    console.log('err: ' + err);
                })
        }

    }

    async function toggleReport() {
        setModalType('loading')
        await REPORT_POST(id, currentUser?.email, post)
            .then(() => {
                setShowMenu(false)
                setSnackBar(true)
            })
            .catch((err) => {
                setShowMenu(false)
                console.log('err :' + err)
            })
    }

    async function toggleReportComment(ids) {
        setModalType('loading')
        setShowMenu(true)
        await onCommentReported(id, ids)
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
        await deleteQueryBatch(id)
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

    async function toggleDisLike(ids) {
        console.log('dislike pressed')
        await DISLIKE_POST(ids, currentUser?.email)
            .then(() => {
                console.log('Sukes DisLike / Undislike');
            })
            .catch((err) => {
                console.log('Err : ' + err);
            })
    }

    async function toggleDeleteComment(ids, isReply) {
        setModalType('loading')
        setShowMenu(true)
        await DELETE_COMMENT(id, ids, isReply)
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

    async function onLikeComment(ids) {
        await LIKE_COMMENT(id, currentUser?.email, ids)
            .then(() => 'sukeses')
            .catch(() => 'errors')
    }

    async function onDisLikeComment(ids) {
        await DISLIKE_COMMENT(id, currentUser?.email, ids)
            .then(() => 'sukeses')
            .catch(() => 'errors')
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
                <Image source={IMAGES.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            <FlatList
                data={commentList}
                contentContainerStyle={{ paddingBottom: Mixins.scaleSize(120) }}
                ListHeaderComponent={
                    <>
                        <Image source={IMAGES.banner} resizeMode={'stretch'} style={{ width: '100%', height: 120 }} />
                        <PostCard
                            data={post}
                            user={currentUser}
                            showComment={false}
                            showOptions={false}
                            showBottom={false}
                            onLikePress={() => toggleLike(id)}
                            onDisLikePress={() => toggleDisLike(id)}
                            onOptionsPress={() => (setModalType('popup'), setShowMenu(true))}
                            onCardPress={() => currentUser?.email !== '4dm1n2021' ? null : navigation.navigate('PostTopic', { post: post })} />

                        <View style={styles.commentDivider}>
                            <Text style={{ ...TEXT_NORMAL_BOLD }}>Comment</Text>
                            <Text style={{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_DARK_GRAY }}>  ●  {post?.commentCounts == 0 ? 'No comments yet' : `${post?.commentCounts} comments`}</Text>
                        </View>
                    </>
                }
                renderItem={({ item, index }) =>
                    <CommentCard
                        data={item}
                        indexed={index}
                        replyData={replyList}
                        isSelected={selectedComment}
                        email={currentUser?.email}
                        onButtonPrees={(t, ids, isReply) => t == 'r' ? toggleReportComment(ids) : toggleDeleteComment(ids, isReply)}
                        onReplyPress={() => setReplyAt(item)}
                        onLongPress={() => selectedComment !== index ? setSelectedComment(index) : setSelectedComment(null)}
                        onReplyLongPress={(idx) => selectedComment !== idx ? setSelectedComment(idx) : setSelectedComment(null)}
                        onLikePress={(ids) => onLikeComment(ids)}
                        onDisLikePress={(ids) => onDisLikeComment(ids)} />
                } />

            {selectedComment == null && currentUser?.email !== '4dm1n2021' ?
                <View>
                    {replyAt ? <View style={{ backgroundColor: 'white', padding: Mixins.scaleSize(12), flexDirection: 'row', alignItems: 'center' }}>
                        <Text style={{ flex: 1 }}>
                            Reply to {' '}
                            <Text style={{ fontWeight: 'bold' }}>{replyAt?.name}</Text>
                        </Text>
                        <TouchableOpacity onPress={() => setReplyAt(null)}>
                            <AntDesign name={'close'} size={14} color={'gray'} />
                        </TouchableOpacity>
                    </View> : null}
                    <View style={styles.bottomContainer}>
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
                    </View>
                </View>
                : null}
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

export default HomeAdminScreen