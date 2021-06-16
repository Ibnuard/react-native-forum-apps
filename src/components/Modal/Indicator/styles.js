import { StyleSheet } from 'react-native'
import { Mixins } from '../../../styles'

const styles = StyleSheet.create({
    container: {
        height: Mixins.scaleSize(54),
        width: Mixins.scaleSize(54),
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
})

export default styles