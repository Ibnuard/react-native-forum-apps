import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(24),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: Mixins.scaleSize(24)
    },

    name: {
        color: Colors.COLOR_WHITE,
        marginTop: Mixins.scaleSize(8)
    },

    email: {
        color: Colors.COLOR_LIGHT_GRAY
    }
})

export default styles