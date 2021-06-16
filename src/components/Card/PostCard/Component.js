import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IMAGES } from '../../../common/Images'
import { TEXT_NORMAL, TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../../../common/Typography'
import { Colors } from '../../../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import moment from 'moment'

const PostCard = ({ data, onCardPress, onLikePress, onCommentPress, onOptionsPress, onProfilePress, user, showComment = true }) => {
    const liked = data?.likeUser?.indexOf(user?.email)

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
        <View style={styles.container}>

            <View style={styles.topParent}>
                <View style={styles.topLeftChild}>
                    <TouchableOpacity activeOpacity={.6} style={styles.topLeftChildContent} onPress={onProfilePress}>
                        <View style={styles.topLeftProfieImage}>
                            <Image source={{ uri: data?.creatorProfilePic }} style={styles.imageSize} />
                        </View>
                        <View style={styles.topLeftNameTime}>
                            <Text style={TEXT_SMALL_BOLD}>{data?.creatorName}</Text>
                            <Text style={{ ...TEXT_SMALL_REGULAR, color: Colors.COLOR_DARK_GRAY }}>{moment(data?.timestamp).startOf().fromNow()}</Text>
                        </View>
                    </TouchableOpacity>
                </View>

                <View style={styles.topRightChild}>
                    <View style={styles.topRightLove}>
                        <TouchableOpacity onPress={onLikePress}>
                            <AntDesign name={'heart'} size={12} color={liked !== -1 ? Colors.COLOR_RED : Colors.COLOR_DARK_GRAY} />
                        </TouchableOpacity>
                        <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.insightCount, liked == -1 ? null : styles.textLiked]}>{data?.likeCounts}</Text>
                    </View>
                    {showComment ? <TouchableOpacity onPress={onCommentPress} activeOpacity={.5} style={styles.topRightComment}>
                        <AntDesign name={'message1'} size={12} color={'blue'} />
                        <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.insightCount]}>{data?.commentCounts}</Text>
                    </TouchableOpacity> : null}
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
            </TouchableOpacity>
        </View>
    )
}

export default PostCard