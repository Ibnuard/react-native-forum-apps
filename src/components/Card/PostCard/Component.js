import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IMAGES } from '../../../common/Images'
import { TEXT_LARGE_REGULAR, TEXT_NORMAL, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../../../common/Typography'
import { Colors } from '../../../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import MaterialIcon from 'react-native-vector-icons/MaterialIcons'
import styles from './styles'
import moment from 'moment'

const PostCard = ({ data, onCardPress, onLikePress, onDisLikePress, onCommentPress, onOptionsPress, onProfilePress, user, showComment = true, showBottom = true }) => {
    const liked = data?.likeUser?.indexOf(user?.email)
    const disliked = data?.dislikeUser?.indexOf(user?.email)

    /*
    const [liked, setLiked] = React.useState(false)

    React.useEffect(() => {
        const subscriber = firestore()
            .collection('Posts')
            .doc(data?.id)
            .collection('Likes')
            .doc(user?.email)
            .onSnapshot(documentSnapshot => {
                if (documentSnapshot.exists) {
                    setLiked(true)
                } else {
                    setLiked(false)
                }
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [data?.id]);

    /*
    React.useEffect(() => {
        isLiked()
    }, [])*/

    return (
        <>
            <View style={styles.container}>
                <View style={styles.topParent}>
                    <View style={styles.topLeftChild}>
                        <TouchableOpacity activeOpacity={.6} style={styles.topLeftChildContent} onPress={onProfilePress}>
                            <View style={styles.topLeftProfieImage}>
                                <Image source={{ uri: 'data:image/jpeg;base64,' + data?.creatorProfilePic }} style={styles.imageSize} resizeMode={'cover'} />
                            </View>
                            <View style={styles.topLeftNameTime}>
                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                    <Text style={TEXT_SMALL_BOLD}>{data?.creatorName}</Text>
                                    {data?.creatorEmail == '4dm1n2021' ? <MaterialIcon name={'verified'} size={12} color={Colors.COLOR_PRIMARY} style={{ paddingHorizontal: 4 }} /> : null}
                                </View>
                                <Text style={{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_DARK_GRAY }}>{moment(data?.timestamp).startOf().fromNow()}</Text>
                            </View>
                        </TouchableOpacity>
                    </View>

                    <View style={styles.topRightChild}>
                        <TouchableOpacity onPress={onOptionsPress} activeOpacity={.5} style={styles.topRightOption}>
                            <AntDesign name={'ellipsis1'} size={24} color={'gray'} />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity activeOpacity={.6} onPress={onCardPress}>
                    <Text style={TEXT_NORMAL_BOLD}>{data?.title}</Text>
                    {showComment ? <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.contentDesc]} numberOfLines={3}>
                        {data?.description}
                    </Text> :
                        <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.contentDesc]}>
                            {data?.description}
                        </Text>}
                    {data?.banner ? <Image source={{ uri: `data:image/jpeg;base64,${data?.banner}` }} style={{ width: '100%', height: 256, borderRadius: 12 }} resizeMode={'cover'} /> : null}
                </TouchableOpacity>
            </View>
            <View style={styles.centerContainer}>
                <View style={styles.topRightLove}>
                    <AntDesign name={'heart'} size={10} color={Colors.COLOR_RED} />
                    <Text style={[{ ...TEXT_SMALL_BOLD }, styles.centerLike]} >{data?.likeCounts}</Text>
                    <View style={{ paddingHorizontal: 4 }} />
                    <AntDesign name={'dislike1'} size={11} color={Colors.COLOR_PRIMARY} />
                    <Text style={[{ ...TEXT_SMALL_BOLD }, styles.centerLike]} >{data?.dislikeCounts}</Text>
                </View>
                <Text style={[{ ...TEXT_SMALL_BOLD }, styles.centerComment]} >{data?.commentCounts} {data?.commentCounts >= 2 ? ' Comments' : ' Comment'}</Text>
            </View>
            {showBottom ? <View style={styles.bottomContainer} >
                <TouchableOpacity activeOpacity={.6} style={styles.bottomLikeContainer} onPress={onLikePress}>
                    <AntDesign name={'heart'} size={16} color={liked !== -1 ? Colors.COLOR_RED : Colors.COLOR_DARK_GRAY} />
                    <Text style={[styles.bottomTextTitle, { ...TEXT_NORMAL_REGULAR }, liked !== -1 ? styles.textBoldRed : null]}>{liked !== -1 ? 'Liked' : 'Like'}</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={.6} style={styles.bottomLikeContainer} onPress={onDisLikePress}>
                    <AntDesign name={'dislike1'} size={16} color={disliked !== -1 ? Colors.COLOR_PRIMARY : Colors.COLOR_DARK_GRAY} />
                    <Text style={[styles.bottomTextTitle, { ...TEXT_NORMAL_REGULAR }, disliked !== -1 ? styles.textBoldOrange : null]}>{disliked !== -1 ? 'Disliked' : 'Dislike'}</Text>
                </TouchableOpacity>
                {showComment ? <TouchableOpacity activeOpacity={.6} style={styles.bottomCommentContainer} onPress={onCommentPress}>
                    <AntDesign name={'message1'} size={14} color={'blue'} />
                    <Text style={[styles.bottomTextTitle, { ...TEXT_NORMAL_REGULAR }]}>Comment</Text>
                </TouchableOpacity> : null}
            </View> : null}
        </>
    )
}

export default PostCard