import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(14),
        justifyContent: 'center'
    },

    logo: {
        height: Mixins.scaleSize(20),
        width: Mixins.scaleSize(80)
    },

    fab: {
        backgroundColor: Colors.COLOR_PRIMARY,
        position: 'absolute',
        margin: Mixins.scaleSize(24),
        right: 0,
        bottom: 0,
    }
})

export default styles