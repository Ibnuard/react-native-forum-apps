import * as React from 'react'
import { View, Image, FlatList, StatusBar } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'

import Screen from '../components/Screen/Component'
import PostCard from '../components/Card/PostCard/Component'

import styles from './styles/HomeScreen'
import _ from 'lodash'

import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import { IS_LIKED_POST, LIKE_POST, POST_REFERENCE } from '../api/Firestore'

const HomeScreen = ({ navigation }) => {
    const [post, setPost] = React.useState([])
    const { currentUser } = React.useContext(AuthContext)

    React.useEffect(() => {
        return POST_REFERENCE.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            setPost(_.reverse(list));
        });
    }, [])


    async function toggleLike(id) {
        console.log('like pressed')
        await LIKE_POST(id, currentUser?.email)
            .then(() => {
                console.log('Sukes Like / Unlike');
            })
            .catch((err) => {
                console.log('Err : ' + err);
            })
    }

    return (
        <Screen theme={'dark'}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <Image source={IMAGES.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            <FlatList
                data={post}
                renderItem={({ item, index }) =>
                    <PostCard
                        data={item}
                        user={currentUser}
                        onLikePress={() => toggleLike(item?.id)}
                        onOptionsPress={() => console.log('Options pressed')}
                        onCardPress={() => navigation.navigate('Detail', { data: item })} />
                } />
        </Screen>
    )
}

export default HomeScreen