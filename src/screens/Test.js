import * as React from 'react'
import { View, Text, StatusBar, TextInput, Image, TouchableOpacity } from 'react-native'
import Screen from '../components/Screen/Component'
import { Colors, Mixins } from '../styles'
import styles from './styles/RegisterScreen'
import Button from '../components/Button/Component'
import { TEXT_EXTRA_LARGE_BOLD, TEXT_MEDIUM_BOLD, TEXT_NORMAL_BOLD, TEXT_SMALL_REGULAR } from '../common/Typography'
import firestore from '@react-native-firebase/firestore'
import { AuthContext } from '../store/Context'
import auth from '@react-native-firebase/auth'

import RenderModal from '../components/Modal/Component';
import Indicator from '../components/Modal/Indicator/Component';
import { DEFAULT_IMAGE } from '../common/DefaultImage'

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { Slider } from "@miblanchard/react-native-slider"
import { IMAGES } from '../common/Images'

const TestScreen = ({ navigation, route }) => {
    const [slideValue, setSlideValue] = React.useState(0)
    const trackArray = [0, 10, 20, 30, 40, 50]

    function getIndexOfTrack(value = 0) {
        if (value == 0) {
            return 0
        } else return value / 10
    }


    return (
        <Screen style={styles.container}>
            <Text style={TEXT_NORMAL_BOLD}>Berapa jumlah poin yang ingin di tukar?</Text>
            <Text style={TEXT_SMALL_REGULAR}>Tukar poin ke Link Aja</Text>
            <Text style={TEXT_MEDIUM_BOLD}>100</Text>

            <Slider
                value={slideValue}
                onValueChange={value => setSlideValue(value)}
                containerStyle={{ marginHorizontal: 24 }}
                minimumValue={0}
                maximumValue={50}
                step={10}
                trackMarks={trackArray}
                trackStyle={{ backgroundColor: 'gray' }}
                thumbTintColor={Colors.COLOR_RED}
                minimumTrackTintColor={Colors.COLOR_RED}
                thumbStyle={{ height: 10, width: 10, borderRadius: 5 }}
                thumbTouchSize={{ height: 20, width: 20 }}
                renderTrackMarkComponent={(index) => {
                    return (
                        <>
                            <View style={{ height: 10, width: 10, backgroundColor: getIndexOfTrack(slideValue) >= index ? 'red' : 'gray', borderRadius: 4 }} />
                        </>
                    )
                }}
            />
        </Screen>
    )
}

export default TestScreen