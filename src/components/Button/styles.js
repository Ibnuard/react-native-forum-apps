import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.COLOR_PRIMARY,
        paddingHorizontal: Mixins.scaleSize(14),
        paddingVertical: Mixins.scaleSize(12),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },

    containerDark: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.COLOR_SECONDARY,
        paddingHorizontal: Mixins.scaleSize(14),
        paddingVertical: Mixins.scaleSize(12),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },

    containerDisabled: {
        flexDirection: 'row',
        width: '100%',
        backgroundColor: Colors.COLOR_DARK_GRAY,
        paddingHorizontal: Mixins.scaleSize(14),
        paddingVertical: Mixins.scaleSize(12),
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 2
    },

    text: {
        color: Colors.COLOR_WHITE
    }
})

export default styles