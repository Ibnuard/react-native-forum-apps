import * as React from 'react'
import { View, Text, StatusBar, TextInput } from 'react-native'
import Screen from '../components/Screen/Component'
import { Colors } from '../styles'
import styles from './styles/RegisterScreen'
import Button from '../components/Button/Component'
import { TEXT_EXTRA_LARGE_BOLD, TEXT_NORMAL_BOLD, TEXT_NORMAL_REGULAR } from '../common/Typography'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'

const RegisterScreen = ({ navigation, route }) => {
    const data = route?.params?.data
    const [username, setUsername] = React.useState(data?.displayName)

    const { logIn } = React.useContext(AuthContext)

    async function registeredNewuser() {
        await firestore()
            .collection('Users')
            .doc(data?.email)
            .set({
                name: username,
                email: data?.email,
                photoUrl: data?.photoURL,
            })
            .then(() => {
                console.log('User added!');
                const user = {
                    name: username,
                    email: data?.email,
                    photoUrl: data?.photoURL,
                }
                logIn(user)
            })
            .catch((err) => {
                console.log('Erorr adding data : ' + JSON.stringify(err));
            })
    }

    return (
        <Screen style={styles.container}>
            <Text style={TEXT_EXTRA_LARGE_BOLD}>New user registration!</Text>
            <TextInput
                placeholder={'Set your display name'}
                placeholderTextColor={Colors.COLOR_DARK_GRAY}
                style={[{ ...TEXT_NORMAL_BOLD }, styles.input]}
                value={username}
                onChangeText={(text) => setUsername(text)} />

            <View style={styles.buttonContainer}>
                <Button disabled={!username.length} text={'Continue'} onPress={() => registeredNewuser()} />
            </View>
        </Screen>
    )
}

export default RegisterScreen