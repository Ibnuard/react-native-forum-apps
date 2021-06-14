import * as React from 'react'
import { SafeAreaView } from 'react-native'
import styles from './styles'

const Screen = ({ theme = 'light', style, children }) => {
    return <SafeAreaView style={[theme == 'light' ? styles.container : styles.containerDark, style]}>{children}</SafeAreaView>
}

export default Screen