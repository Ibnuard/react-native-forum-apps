import * as React from 'react'
import { View, Text, Image, TouchableOpacity, FlatList } from 'react-native'
import { IMAGES } from '../../../common/Images'
import { TEXT_EXTRA_SMALL_BOLD, TEXT_EXTRA_SMALL_REGULAR, TEXT_MEDIUM_REGULAR, TEXT_NORMAL, TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../../../common/Typography'
import { Colors, Mixins } from '../../../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import moment from 'moment'
import { POST_REFERENCE } from '../../../api/Firestore'

const CommentCard = ({ data, replyData = [], isSelected, indexed, onPress, onLongPress, email, onButtonPrees, onProfilePress, onReplyPress, onReplyLongPress, onDisLikePress, onLikePress, showReply = true }) => {
    const own = email == data?.email || email == '4dm1n2021'

    const replys = replyData?.filter(function (item) {
        return item?.replyAt == data?.id
    })

    const selected = (key) => {
        return isSelected == key
    }

    const liked = data?.likeUser?.indexOf(email)
    const disliked = data?.dislikeUser?.indexOf(email)

    function renderCard() {
        return (
            <>
                <TouchableOpacity style={[styles.container, selected(indexed) ? styles.containerSelected : null]} activeOpacity={.7} onLongPress={onLongPress} onPress={onPress}>
                    <TouchableOpacity activeOpacity={.7}>
                        <Image source={{ uri: 'data:image/jpeg;base64,' + data?.photoUrl }} style={styles.avatar} />
                    </TouchableOpacity>
                    <View style={styles.rightContent}>
                        <View style={{ flex: 1 }}>
                            <Text style={{ ...TEXT_SMALL_BOLD, flex: 1 }}>{data?.name}</Text>
                            <Text style={{ ...TEXT_SMALL_REGULAR }}>{data?.comment}</Text>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.timestamp]}>{moment(data?.timestamp).startOf().fromNow()}</Text>
                                {data?.likeCounts < 1 ? null : <Text style={[{ ...TEXT_SMALL_BOLD, marginLeft: Mixins.scaleSize(8) }, styles.timestamp]}>{data?.likeCounts} {data?.likeCounts > 1 ? 'likes' : 'like'}</Text>}
                                {data?.dislikeCounts < 1 ? null : <Text style={[{ ...TEXT_SMALL_BOLD, marginLeft: Mixins.scaleSize(8) }, styles.timestamp]}>{data?.dislikeCounts} {data?.dislikeCounts > 1 ? 'dislikes' : 'dislike'}</Text>}
                                {showReply ? <TouchableOpacity onPress={onReplyPress}>
                                    <Text style={{ ...TEXT_SMALL_BOLD, marginTop: Mixins.scaleSize(8), marginHorizontal: Mixins.scaleSize(8), color: 'blue' }}>Reply</Text>
                                </TouchableOpacity> : null}

                            </View>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                            <TouchableOpacity style={{ padding: 8 }} onPress={() => onDisLikePress ? onDisLikePress(data?.id) : null}>
                                <AntDesign name={'dislike1'} size={14} color={disliked !== -1 ? Colors.COLOR_PRIMARY : 'gray'} />
                            </TouchableOpacity>
                            <View style={{ marginHorizontal: 2 }} />
                            <TouchableOpacity style={{ padding: 8 }} onPress={() => onLikePress ? onLikePress(data?.id) : null}>
                                <AntDesign name={'heart'} size={14} color={liked !== -1 ? 'red' : 'gray'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
                {
                    selected(indexed) ? <TouchableOpacity style={styles.bottomContainer} onPress={() => onButtonPrees(own ? 'd' : 'r', data?.id, false)}>
                        <Text style={{ ...TEXT_SMALL_BOLD, color: Colors.COLOR_RED }}>{own ? 'Delete' : 'Report'}</Text>
                    </TouchableOpacity> : null
                }
            </>
        )
    }

    return (
        <>
            <FlatList
                data={replys}
                ListHeaderComponent={renderCard()}
                renderItem={({ item, index }) => {
                    const rliked = item?.likeUser?.indexOf(email)
                    const rdisliked = item?.dislikeUser?.indexOf(email)

                    return (
                        <>
                            <TouchableOpacity style={[styles.replyContainer, selected(item.id + index) ? styles.containerSelected : null]} activeOpacity={.7} onLongPress={() => !onReplyLongPress ? null : onReplyLongPress(item?.id + index)} onPress={onPress}>
                                <TouchableOpacity activeOpacity={.7}>
                                    <Image source={{ uri: 'data:image/jpeg;base64,' + item?.photoUrl }} style={styles.replyAvatar} />
                                </TouchableOpacity>
                                <View style={styles.rightContent}>
                                    <View style={{ flex: 1 }}>
                                        <Text style={{ ...TEXT_EXTRA_SMALL_BOLD, flex: 1 }}>{item?.name}</Text>
                                        <Text style={{ ...TEXT_EXTRA_SMALL_REGULAR }}>{item?.comment}</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            <Text style={[{ ...TEXT_EXTRA_SMALL_REGULAR }, styles.replyTimestamp]}>{moment(item?.timestamp).startOf().fromNow()}</Text>
                                            {item?.likeCounts < 1 ? null : <Text style={[{ ...TEXT_EXTRA_SMALL_BOLD, marginLeft: Mixins.scaleSize(8) }, styles.timestamp]}>{item?.likeCounts} {item?.likeCounts > 1 ? 'likes' : 'like'}</Text>}
                                            {item?.dislikeCounts < 1 ? null : <Text style={[{ ...TEXT_EXTRA_SMALL_BOLD, marginLeft: Mixins.scaleSize(8) }, styles.timestamp]}>{item?.dislikeCounts} {item?.dislikeCounts > 1 ? 'dislikes' : 'dislike'}</Text>}
                                        </View>

                                    </View>
                                    <View style={{ flexDirection: 'row' }}>
                                        <TouchableOpacity style={{ padding: 8 }} onPress={() => onDisLikePress ? onDisLikePress(item?.id) : null}>
                                            <AntDesign name={'dislike1'} size={10} color={rdisliked !== -1 ? Colors.COLOR_PRIMARY : 'gray'} />
                                        </TouchableOpacity>
                                        <View style={{ marginHorizontal: 2 }} />
                                        <TouchableOpacity style={{ padding: 8 }} onPress={() => onLikePress ? onLikePress(item?.id) : null}>
                                            <AntDesign name={'heart'} size={10} color={rliked !== -1 ? 'red' : 'gray'} />
                                        </TouchableOpacity>
                                    </View>
                                </View>

                            </TouchableOpacity>
                            {
                                selected('r' + index) ? <TouchableOpacity style={styles.bottomContainer} onPress={() => onButtonPrees(own ? 'd' : 'r', item?.id, true)}>
                                    <Text style={{ ...TEXT_SMALL_BOLD, color: Colors.COLOR_RED }}>{own ? 'Delete' : 'Report'}</Text>
                                </TouchableOpacity> : null
                            }
                        </>
                    )
                }}
            />

        </>
    )
}

export default CommentCard