import * as React from 'react'
import { View, Text, TextInput, TouchableOpacity } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'
import Button from '../components/Button/Component'

import { TEXT_LARGE_BOLD, TEXT_MEDIUM_REGULAR } from '../common/Typography'


//firebase
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'

const TopicScreen = ({ navigation }) => {
    const [post, setPost] = React.useState({ title: '', description: '' })
    const [isLoading, setIsLoading] = React.useState(false)
    const postRef = firestore().collection('Posts')

    const { currentUser } = React.useContext(AuthContext)

    async function sendPost() {
        setIsLoading(true)

        const postStructure = {
            title: post.title,
            description: post.description,
            timestamp: new Date(),
            creatorName: currentUser?.name,
            creatorEmail: currentUser?.email,
            creatorProfilePic: currentUser?.photoUrl,
            likeCounts: 0,
            commentCounts: 0
        }

        await postRef
            .add(postStructure)
            .then(() => {
                console.log('Posted!!');
                setIsLoading(false)
                setPost({ title: '', description: '' })
                navigation.jumpTo('Home')
            })
            .catch((err) => {
                console.log('error: ' + err)
            })
    }

    return (
        <>
            <View style={{ backgroundColor: 'orange', padding: 14, justifyContent: 'center' }}>
                <Text style={{ ...TEXT_LARGE_BOLD, color: 'white' }}>Create Topic</Text>
            </View>
            <Screen style={{ padding: 24 }}>
                <View style={{ flex: 1 }}>
                    <TextInput
                        placeholder={'Enter title'}
                        placeholderTextColor={Colors.COLOR_DARK_GRAY}
                        style={{ backgroundColor: Colors.COLOR_LIGHT_GRAY, color: Colors.COLOR_BLACK, paddingHorizontal: 12, borderRadius: 6, height: 48 }}
                        value={post.title}
                        onChangeText={(text) => setPost({ ...post, title: text })} />
                    <View style={{ backgroundColor: Colors.COLOR_LIGHT_GRAY, borderRadius: 6, minHeight: 100, maxHeight: 200, marginVertical: 14 }}>
                        <TextInput
                            placeholder={'Enter Description'}
                            placeholderTextColor={Colors.COLOR_DARK_GRAY}
                            style={{ color: Colors.COLOR_BLACK, paddingHorizontal: 12 }}
                            value={post.description}
                            multiline
                            onChangeText={(text) => setPost({ ...post, description: text })} />
                    </View>
                </View>
                <Button disabled={!post.title || !post.description || isLoading} text={'Post'} onPress={() => sendPost()} />
            </Screen>
        </>
    )
}

export default TopicScreen