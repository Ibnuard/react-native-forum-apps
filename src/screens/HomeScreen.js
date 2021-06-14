import * as React from 'react'
import { View, Text, SafeAreaView, Image, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'

const HomeScreen = () => {
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: Colors.COLOR_LIGHT_GRAY }}>
            <View style={{ backgroundColor: 'orange', padding: 14, justifyContent: 'center' }}>
                <Image source={IMAGES.logo} style={{ height: 20, width: 80 }} />
            </View>
            <PostCard />
            <PostCard />
        </SafeAreaView>
    )
}

export default HomeScreen