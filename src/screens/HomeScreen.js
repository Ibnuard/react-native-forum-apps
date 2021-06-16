import * as React from 'react'
import { View, Image, FlatList, StatusBar } from 'react-native'
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
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <Image source={IMAGES.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            <FlatList
                data={post}
                renderItem={({ item, index }) => <PostCard data={item} onCardPress={() => console.log(item.title)} />} />
        </Screen>
    )
}

export default HomeScreen