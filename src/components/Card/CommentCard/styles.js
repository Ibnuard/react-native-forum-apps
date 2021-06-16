import { StyleSheet } from 'react-native'
import { Mixins, Colors } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: Mixins.scaleSize(12),
        marginVertical: .25
    },

    avatar: {
        height: Mixins.scaleSize(24),
        width: Mixins.scaleSize(24),
        backgroundColor: 'gray',
        borderRadius: 10
    },

    rightContent: {
        paddingHorizontal: Mixins.scaleSize(8)
    },

    timestamp: {
        color: Colors.COLOR_DARK_GRAY,
        marginTop: Mixins.scaleSize(8)
    }

})

export default styles