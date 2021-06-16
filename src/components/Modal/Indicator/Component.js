import * as React from 'react'
import { View, Text, } from 'react-native'
import { ActivityIndicator } from 'react-native-paper';
import { Colors } from '../../../styles';
import styles from './styles';

const Indicator = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={'small'} animating={true} color={Colors.COLOR_PRIMARY} />
        </View>
    )
}

export default Indicator