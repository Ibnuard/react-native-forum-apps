import * as React from 'react'
import { Image, Text, TouchableOpacity } from 'react-native'
import { TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR } from '../../common/Typography'
import styles from './styles'

const Button = ({
    onPress,
    text = 'Press Me!',
    textStyle,
    icon,
    theme = 'default',
    buttonStyle,
    disabled = false
}) => {
    return (
        <TouchableOpacity
            style={[disabled ? styles.containerDisabled : theme == 'default' ? styles.container : styles.containerDark, buttonStyle]} onPress={disabled ? null : onPress} activeOpacity={disabled ? 1 : .8}>
            <Image source={icon} />
            <Text style={[{ ...TEXT_NORMAL_REGULAR }, styles.text, textStyle]}>{text}</Text>
        </TouchableOpacity>
    )
}

export default Button