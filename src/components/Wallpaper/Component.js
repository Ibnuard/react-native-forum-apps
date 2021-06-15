import * as React from 'react'
import { Dimensions, Image, View } from 'react-native'

const Wallpaper = () => {

    const { width, height } = Dimensions.get('window')

    return (
        <View style={{ height: height, width: width, position: 'absolute' }}>
            <Image />
        </View>
    )
}

export default Wallpaper