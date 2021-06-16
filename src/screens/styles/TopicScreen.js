import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    header: {
        backgroundColor: Colors.COLOR_PRIMARY,
        padding: Mixins.scaleSize(14),
        flexDirection: 'row'
    },

    title: {
        color: Colors.COLOR_WHITE,
        paddingHorizontal: Mixins.scaleSize(8)
    }
})

export default styles