import { StyleSheet } from 'react-native'
import { Mixins, Colors } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.COLOR_WHITE,
        paddingHorizontal: Mixins.scaleSize(12),
        paddingTop: Mixins.scaleSize(14),
        paddingBottom: Mixins.scaleSize(24),
        marginBottom: .5
    },

    topParent: {
        flexDirection: 'row',
        marginBottom: Mixins.scaleSize(12)
    },

    topLeftChild: {
        flex: 1,
    },

    topLeftChildContent: {
        flexDirection: 'row',
        alignItems: 'center'
    },

    topLeftProfieImage: {
        height: Mixins.scaleSize(28),
        width: Mixins.scaleSize(28),
        backgroundColor: 'gray',
        borderRadius: 16
    },

    imageSize: {
        height: Mixins.scaleSize(28),
        width: Mixins.scaleSize(28),
        borderRadius: 16
    },

    topLeftNameTime: {
        paddingHorizontal: Mixins.scaleSize(10)
    },

    topRightChild: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Mixins.scaleSize(10)
    },

    topRightLove: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Mixins.scaleSize(6)
    },

    topRightComment: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: Mixins.scaleSize(6),
        marginRight: Mixins.scaleSize(4)
    },

    topRightOption: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: Mixins.scaleSize(4)
    },

    contentDesc: {
        paddingTop: Mixins.scaleSize(4)
    },

    insightCount: {
        paddingLeft: Mixins.scaleSize(4)
    }

})

export default styles