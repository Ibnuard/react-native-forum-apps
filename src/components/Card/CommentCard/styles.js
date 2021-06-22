import { StyleSheet } from 'react-native'
import { Mixins, Colors } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.COLOR_WHITE,
        flexDirection: 'row',
        padding: Mixins.scaleSize(12),
        marginVertical: .25
    },

    containerSelected: {
        backgroundColor: Colors.CYAN_BLUE
    },

    avatar: {
        height: Mixins.scaleSize(24),
        width: Mixins.scaleSize(24),
        backgroundColor: 'gray',
        borderRadius: 10
    },

    rightContent: {
        flex: 1,
        paddingHorizontal: Mixins.scaleSize(8)
    },

    topRightOption: {
        paddingHorizontal: 4,
        marginTop: -5
    },

    timestamp: {
        color: Colors.COLOR_DARK_GRAY,
        marginTop: Mixins.scaleSize(8)
    },

    bottomContainer: {
        backgroundColor: Colors.COLOR_WHITE,
        padding: Mixins.scaleSize(14),
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: .25
    }

})

export default styles