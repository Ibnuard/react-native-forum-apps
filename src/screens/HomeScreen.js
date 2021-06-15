import * as React from 'react'
import { View, Text, SafeAreaView, Image, FlatList } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'
import _ from 'lodash'

import firestore from '@react-native-firebase/firestore'

const HomeScreen = () => {
    const [post, setPost] = React.useState([])

    const postRef = firestore().collection('Posts')

    React.useEffect(() => {
        return postRef.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                const { title, description, timestamp, creatorName, creatorEmail, creatorProfilePic, likeCounts, commentCounts } = doc.data();
                list.push({ id: doc.id, title, description, timestamp, creatorName, creatorEmail, creatorProfilePic, likeCounts, commentCounts });
            });
            setPost(_.reverse(list));
        });
    }, [])

    return (
        <Screen theme={'dark'}>
            <View style={{ backgroundColor: 'orange', padding: 14, justifyContent: 'center' }}>
                <Image source={IMAGES.logo} style={{ height: 20, width: 80 }} />
            </View>
            <FlatList
                data={post}
                renderItem={({ item, index }) => <PostCard data={item} onCardPress={() => console.log(item.title)} />} />
        </Screen>
    )
}

export default HomeScreen