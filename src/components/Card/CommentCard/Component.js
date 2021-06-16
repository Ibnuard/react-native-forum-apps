import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IMAGES } from '../../../common/Images'
import { TEXT_MEDIUM_REGULAR, TEXT_NORMAL, TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../../../common/Typography'
import { Colors } from '../../../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import moment from 'moment'

const CommentCard = ({ data }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: data?.photoUrl }} style={styles.avatar} />
            <View style={styles.rightContent}>
                <Text style={{ ...TEXT_SMALL_BOLD }}>{data?.name}</Text>
                <Text style={{ ...TEXT_SMALL_REGULAR }}>{data?.comment}</Text>
                <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.timestamp]}>{moment(data?.timestamp).startOf().fromNow()}</Text>
            </View>
        </View>
    )
}

export default CommentCard