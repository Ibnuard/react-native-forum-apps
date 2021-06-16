import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        width: '80%',
        justifyContent: 'center',
        borderRadius: 12
    },

    parent: {
        backgroundColor: 'white',
        borderRadius: Mixins.scaleSize(12),
        paddingHorizontal: Mixins.scaleSize(6),
        paddingVertical: Mixins.scaleSize(2)
    },

    item: {
        padding: Mixins.scaleSize(12),
        borderTopWidth: .5,
        borderTopColor: Colors.COLOR_LIGHT_GRAY
    }
})

export default styles