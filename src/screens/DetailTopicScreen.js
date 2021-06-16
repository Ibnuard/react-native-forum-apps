import * as React from 'react'
import { View, Image, FlatList, StatusBar, TouchableOpacity, Text, TextInput } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

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
import { COMMENT_POST, LIKE_POST, POST_REFERENCE } from '../api/Firestore'
import moment from 'moment'

const DetailTopicScreen = ({ navigation, route }) => {
    const { currentUser } = React.useContext(AuthContext)
    const POST_DATA = route?.params?.data

    const [post, setPost] = React.useState(POST_DATA)
    const [comment, setComment] = React.useState('')
    const [commentList, setCommentList] = React.useState([])

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

        const commentData = {
            comment: comment,
            timestamp: moment().format()
        }

        await COMMENT_POST(POST_DATA?.id, currentUser, commentData)
            .then(() => {
                setComment('')
                console.log('Sukses post comment!');
            })
            .catch((err) => {
                console.log('err: ' + err);
            })
    }

    return (
        <Screen theme={'dark'}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <TouchableOpacity activeOpacity={.6} onPress={() => navigation.goBack()}>
                    <AntDesign name={'arrowleft'} size={18} color={Colors.COLOR_WHITE} />
                </TouchableOpacity>
                <Text style={[{ ...TEXT_LARGE_BOLD }, styles.title]}>Topic</Text>
            </View>
            <PostCard
                data={post}
                user={currentUser}
                showComment={false}
                onLikePress={() => toggleLike(POST_DATA?.id)}
                onOptionsPress={() => console.log('Options pressed')}
                onCardPress={() => console.log('test')} />
            <View style={{ backgroundColor: 'white', padding: 14, marginTop: 2, flexDirection: 'row', alignItems: 'center' }}>
                <Text style={{ ...TEXT_NORMAL_BOLD }}>Comment</Text>
                <Text style={{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_DARK_GRAY }}>  ●  {post.commentCounts == 0 ? 'No comments yet' : `${post?.commentCounts} comments`}</Text>
            </View>
            <FlatList
                data={commentList}
                renderItem={({ item, index }) => <CommentCard data={item} />} />
            <View style={{ backgroundColor: 'white', paddingHorizontal: 12, paddingVertical: 16, position: 'absolute', bottom: 0, width: '100%', flexDirection: 'row', alignItems: 'center', borderTopWidth: .5, borderTopColor: Colors.COLOR_LIGHT_GRAY }}>
                <TextInput
                    style={{ backgroundColor: Colors.COLOR_LIGHT_GRAY, minHeight: 42, maxHeight: 92, paddingHorizontal: 12, borderRadius: 21, flex: 1, color: Colors.COLOR_BLACK }}
                    placeholderTextColor={Colors.COLOR_DARK_GRAY}
                    placeholder={'Enter your comment...'}
                    multiline={true}
                    maxLength={100}
                    onChangeText={(text) => setComment(text)}
                    value={comment} />
                <TouchableOpacity style={{ paddingLeft: 18 }} activeOpacity={comment.length ? .6 : 1} onPress={() => comment.length ? toggleComment() : null}>
                    <IonIcons name={'send'} size={20} color={comment.length ? Colors.COLOR_PRIMARY : Colors.COLOR_DARK_GRAY} />
                </TouchableOpacity>
            </View>
        </Screen>
    )
}

export default DetailTopicScreen