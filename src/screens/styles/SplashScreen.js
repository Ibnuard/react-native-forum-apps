import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.COLOR_PRIMARY
    },

    logo: {
        width: '100%',
        height: Mixins.scaleSize(52)
    }
})

export default styles