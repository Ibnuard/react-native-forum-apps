import { StyleSheet } from 'react-native'
import { Mixins, Colors } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        backgroundColor: Colors.COLOR_WHITE,
        paddingHorizontal: Mixins.scaleSize(12),
        paddingVertical: Mixins.scaleSize(14),
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
        borderRadius: 10
    },

    imageSize: {
        height: Mixins.scaleSize(28),
        width: Mixins.scaleSize(28),
        borderRadius: 10
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
        flex: 1,
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
        paddingTop: Mixins.scaleSize(4),
        marginBottom: Mixins.scaleSize(8)
    },

    insightCount: {
        paddingLeft: Mixins.scaleSize(4)
    },

    textLiked: {
        color: Colors.COLOR_RED,
        fontWeight: 'bold'
    },

    centerContainer: {
        padding: Mixins.scaleSize(6),
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white'
    },

    centerLike: {
        paddingHorizontal: Mixins.scaleSize(4),
        color: Colors.COLOR_DARK_GRAY
    },

    centerComment: {
        paddingHorizontal: Mixins.scaleSize(4),
        color: Colors.COLOR_DARK_GRAY
    },

    bottomContainer: {
        backgroundColor: 'white',
        flexDirection: 'row',
        padding: Mixins.scaleSize(12),
        marginBottom: Mixins.scaleSize(4),
        marginVertical: .5
    },

    bottomLikeContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        borderRightWidth: .25,
        borderRightColor: Colors.COLOR_DARK_GRAY
    },

    bottomCommentContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row'
    },

    bottomTextTitle: {
        paddingHorizontal: Mixins.scaleSize(12)
    },

    textBoldRed: {
        color: Colors.COLOR_RED,
        fontWeight: 'bold'
    }

})

export default styles