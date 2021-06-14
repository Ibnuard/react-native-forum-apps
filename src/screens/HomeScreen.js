import * as React from 'react'
import { View, Text, SafeAreaView, Image, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'

const HomeScreen = () => {
    return (
        <Screen theme={'dark'}>
            <View style={{ backgroundColor: 'orange', padding: 14, justifyContent: 'center' }}>
                <Image source={IMAGES.logo} style={{ height: 20, width: 80 }} />
            </View>
            <PostCard />
            <PostCard />
        </Screen>
    )
}

export default HomeScreen