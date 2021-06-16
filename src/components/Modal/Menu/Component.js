import * as React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { TEXT_NORMAL_REGULAR } from '../../../common/Typography';
import { Colors } from '../../../styles';
import styles from './styles';

const Menu = ({ item = [], onPress }) => {
    return (
        <View style={styles.container}>
            <View style={styles.parent}>
                {
                    item.map((item, index) => {
                        return (
                            <TouchableOpacity key={index} style={styles.item} activeOpacity={.6} onPress={item?.onPress}>
                                <Text style={[{ ...TEXT_NORMAL_REGULAR }, item?.textStyle]}>{item?.text}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

export default Menu