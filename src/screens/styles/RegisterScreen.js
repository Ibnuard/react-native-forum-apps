import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        paddingHorizontal: Mixins.scaleSize(24)
    },

    logo: {
        width: '100%',
        height: Mixins.scaleSize(52)
    },

    input: {
        backgroundColor: Colors.COLOR_LIGHT_GRAY,
        height: Mixins.scaleSize(48),
        paddingHorizontal: Mixins.scaleSize(12),
        borderRadius: 24,
        marginVertical: Mixins.scaleSize(16)
    },

    buttonContainer: {
        marginTop: Mixins.scaleSize(42)
    }
})

export default styles