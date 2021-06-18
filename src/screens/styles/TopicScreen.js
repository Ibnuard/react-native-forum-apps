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
    },

    screenContainer: {
        padding: Mixins.scaleSize(24)
    },

    addBannerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: Mixins.scaleSize(12)
    },

    addBannerText: {
        paddingHorizontal: Mixins.scaleSize(4)
    },

    imageButton: {
        width: Mixins.scaleSize(100),
        marginTop: Mixins.scaleSize(14)
    },

    imageContainer: {
        height: Mixins.scaleSize(100),
        width: Mixins.scaleSize(100),
        borderRadius: 20
    },

    imageCaption: {
        textAlign: 'center',
        marginTop: Mixins.scaleSize(8),
        color: Colors.COLOR_DARK_GRAY
    }
})

export default styles