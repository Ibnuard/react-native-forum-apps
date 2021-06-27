import { StyleSheet } from 'react-native'
import { TEXT_SMALL_REGULAR } from '../../common/Typography'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: Colors.COLOR_GRAY,
        width: '100%',
        borderRadius: 12,
    },

    containerStyle: {
        width: '100%',
        paddingVertical: Mixins.scaleSize(8)
    },


    eye: {
        padding: Mixins.scaleSize(12)
    },

    input: {
        flex: 1,
        color: Colors.COLOR_BLACK,
        padding: Mixins.scaleSize(12),
        height: Mixins.scaleSize(56)
    },

    errorText: {
        ...TEXT_SMALL_REGULAR,
        padding: Mixins.scaleSize(8),
        alignSelf: 'flex-start',
        color: Colors.COLOR_RED
    },

    text: {
        color: Colors.COLOR_WHITE
    }
})

export default styles