import * as React from 'react'
import { Image, Text, TouchableOpacity, TextInput, View } from 'react-native'
import { TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR, TEXT_SMALL_REGULAR } from '../../common/Typography'
import { Colors } from '../../styles'
import styles from './styles'
import FontAwesome from 'react-native-vector-icons/FontAwesome'

const Input = (props) => {
    return (
        <View style={styles.containerStyle}>
            <View style={styles.container}>
                <TextInput
                    {...props}
                    secureTextEntry={props?.isPassword}
                    style={styles.input} />
                {props?.showEye && <TouchableOpacity activeOpacity={.7} style={styles.eye} onPress={props?.onEyePress}>
                    <FontAwesome name={props?.isPassword ? 'eye' : 'eye-slash'} size={20} color={Colors.COLOR_DARK_GRAY} />
                </TouchableOpacity>}
            </View>
            {props?.errorMessage?.length ? <Text style={styles.errorText}>{props?.errorMessage}</Text> : null}
        </View>
    )
}

export default Input