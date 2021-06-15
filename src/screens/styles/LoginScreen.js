import { StyleSheet } from 'react-native'
import { Colors, Mixins } from '../../styles'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Colors.COLOR_PRIMARY,
        paddingHorizontal: Mixins.scaleSize(24)
    },

    googleButton: {
        width: '60%',
        borderRadius: 6,
        backgroundColor: Colors.COLOR_WHITE,
        borderWidth: .25
    },

    googleText: {
        marginLeft: Mixins.scaleSize(8)
    },

    logo: {
        width: '100%',
        height: Mixins.scaleSize(120),
        marginBottom: Mixins.scaleSize(32)
    }


})

export default styles