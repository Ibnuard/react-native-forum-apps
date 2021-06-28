import * as React from 'react'
import { View, Image, FlatList, StatusBar, Text } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors, Mixins } from '../styles'

import Screen from '../components/Screen/Component'

import styles from './styles/HomeScreen'
import _ from 'lodash'

import { deleteQueryBatch, DELETE_POST, GET_IMAGE_BANNER, IMAGE_REFERENCE, LIKE_POST, POST_REFERENCE, REPORT_POST, USER_REFERENCE } from '../api/Firestore'

import { TEXT_MEDIUM_BOLD, TEXT_NORMAL_REGULAR } from '../common/Typography'

import AntDesign from 'react-native-vector-icons/AntDesign'
import { TouchableOpacity } from 'react-native-gesture-handler'

const UserListScreen = ({ navigation }) => {
    const [users, setUsers] = React.useState([])

    React.useEffect(() => {
        return USER_REFERENCE.onSnapshot((querySnapshot) => {
            const list = [];
            querySnapshot.forEach(doc => {
                list.push({ ...doc.data(), id: doc.id, });
            });
            setUsers(_.reverse(list));
        });
    }, [])



    return (
        <Screen theme={'dark'}>
            <StatusBar backgroundColor={Colors.COLOR_PRIMARY} barStyle={'light-content'} />
            <View style={styles.headerBar}>
                <Image source={IMAGES.logo} style={styles.logo} resizeMode={'contain'} />
            </View>
            {!users.length ?
                <View style={styles.noPost}>
                    <AntDesign name={'frowno'} size={60} color={Colors.COLOR_DARK_GRAY} />
                    <Text style={[{ ...TEXT_MEDIUM_BOLD, color: Colors.COLOR_DARK_GRAY }, styles.noPostText]}>No User Yet!</Text>
                </View> :
                <FlatList
                    data={users}
                    contentContainerStyle={styles.listSpacing}
                    renderItem={({ item, index }) =>
                        <>
                            <TouchableOpacity style={{ backgroundColor: 'white', padding: Mixins.scaleSize(12), flexDirection: 'row', alignItems: 'center', marginBottom: .5 }} onPress={() => navigation.navigate('ProfileDetail', { admin: item })}>
                                <Image source={{ uri: 'data:image/jpeg;base64,' + item?.photoUrl }} style={{ width: 54, height: 54, borderRadius: 12, backgroundColor: Colors.COLOR_LIGHT_YELLOW }} />
                                <View style={{ paddingHorizontal: Mixins.scaleSize(12) }}>
                                    <Text style={TEXT_MEDIUM_BOLD}>{item?.name}</Text>
                                    <Text style={TEXT_NORMAL_REGULAR}>{item?.email}</Text>
                                </View>
                            </TouchableOpacity>
                        </>
                    } />
            }
        </Screen>
    )
}

export default UserListScreen