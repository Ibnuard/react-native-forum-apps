import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    topContainer: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(24),
        justifyContent: 'flex-start',
        alignItems: 'center',
    },

    headerBar: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(14),
        flexDirection: 'row',
        alignItems: 'center',
    },

    backButton: {
        paddingRight: Mixins.scaleSize(8)
    },

    info: { flexDirection: 'row', paddingTop: Mixins.scaleSize(8), marginBottom: Mixins.scaleSize(14) },

    name: {
        color: Colors.COLOR_WHITE,
        marginTop: Mixins.scaleSize(8)
    },

    nameDark: {
        color: Colors.COLOR_BLACK,
        marginTop: Mixins.scaleSize(8)
    },

    listSpacing: { paddingBottom: Mixins.scaleSize(72) },

    email: {
        color: Colors.COLOR_LIGHT_GRAY,
    }
})

export default styles