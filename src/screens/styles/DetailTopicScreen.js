import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    headerBar: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(14),
        alignItems: 'center',
        flexDirection: 'row',
    },

    title: {
        color: Colors.COLOR_WHITE,
        paddingHorizontal: Mixins.scaleSize(8)
    },

    logo: {
        height: Mixins.scaleSize(20),
        width: Mixins.scaleSize(80)
    },

    commentDivider: {
        backgroundColor: 'white',
        padding: Mixins.scaleSize(14),
        marginTop: Mixins.scaleSize(2),
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: .25
    },

    bottomContainer: {
        backgroundColor: 'white',
        paddingHorizontal: Mixins.scaleSize(12),
        paddingVertical: Mixins.scaleSize(16),
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        borderTopWidth: .5,
        borderTopColor: Colors.COLOR_LIGHT_GRAY
    },

    inputStyle: {
        backgroundColor: Colors.COLOR_LIGHT_GRAY,
        minHeight: Mixins.scaleSize(42),
        maxHeight: Mixins.scaleSize(92),
        paddingHorizontal: Mixins.scaleSize(12),
        borderRadius: 21,
        flex: 1,
        color: Colors.COLOR_BLACK
    },

    sendButton: {
        paddingLeft: Mixins.scaleSize(18)
    }
})

export default styles