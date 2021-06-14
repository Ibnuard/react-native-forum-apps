import * as React from 'react'
import { View, Text, SafeAreaView, Image, StatusBar, TextInput } from 'react-native'
import { IMAGES } from '../common/Images'
import { Colors } from '../styles'
import Screen from '../components/Screen/Component'

const LoginScreen = () => {
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    return (
        <Screen style={{ justifyContent: 'center', alignItems: 'center', marginHorizontal: 24 }}>
            <Text>Login Screen</Text>
            <TextInput
                style={{ borderWidth: .25, width: '100%', height: 46, paddingHorizontal: 12, borderRadius: 16 }}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => setEmail(text)}
                value={email} />
            <TextInput
                style={{ borderWidth: .25, width: '100%', height: 46, paddingHorizontal: 12, borderRadius: 16 }}
                placeholder={'Email'}
                keyboardType={'email-address'}
                onChangeText={(text) => setEmail(text)}
                value={email} />
        </Screen>
    )
}

export default LoginScreen