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
    }
})

export default styles