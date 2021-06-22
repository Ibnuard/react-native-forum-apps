import * as React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import { IMAGES } from '../../../common/Images'
import { TEXT_MEDIUM_REGULAR, TEXT_NORMAL, TEXT_NORMAL_BOLD, TEXT_SMALL_BOLD, TEXT_SMALL_REGULAR } from '../../../common/Typography'
import { Colors } from '../../../styles'
import AntDesign from 'react-native-vector-icons/AntDesign'
import styles from './styles'
import moment from 'moment'

const CommentCard = ({ data, isSelected = false, onPress, email, onButtonPrees, onProfilePress }) => {
    const own = email == data?.email
    return (
        <>
            <TouchableOpacity style={[styles.container, isSelected ? styles.containerSelected : null]} activeOpacity={.7} onPress={onPress}>
                <TouchableOpacity activeOpacity={.7} onPress={onProfilePress}>
                    <Image source={{ uri: data?.photoUrl }} style={styles.avatar} />
                </TouchableOpacity>
                <View style={styles.rightContent}>
                    <Text style={{ ...TEXT_SMALL_BOLD, flex: 1 }}>{data?.name}</Text>
                    <Text style={{ ...TEXT_SMALL_REGULAR }}>{data?.comment}</Text>
                    <Text style={[{ ...TEXT_SMALL_REGULAR }, styles.timestamp]}>{moment(data?.timestamp).startOf().fromNow()}</Text>
                </View>
                {/*
            <TouchableOpacity onPress={onOptionsPress} activeOpacity={.5} style={styles.topRightOption}>
                <AntDesign name={'ellipsis1'} size={20} color={'gray'} />
            </TouchableOpacity>*/}
            </TouchableOpacity>
            {isSelected ? <TouchableOpacity style={styles.bottomContainer} onPress={() => onButtonPrees(own ? 'd' : 'r')}>
                <Text style={{ ...TEXT_SMALL_BOLD, color: Colors.COLOR_RED }}>{own ? 'Delete' : 'Report'}</Text>
            </TouchableOpacity> : null}
        </>
    )
}

export default CommentCard