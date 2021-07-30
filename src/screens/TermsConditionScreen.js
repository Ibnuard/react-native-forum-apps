import * as React from 'react'
import { StatusBar, Image, Text, View, TouchableOpacity, ScrollView } from 'react-native'
import { IMAGES } from '../common/Images'
import styles from './styles/TermsCondition'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { Colors } from '../styles'
import { TEXT_MEDIUM_BOLD } from '../common/Typography'

const TermsCondition = ({ navigation }) => {
    return (
        <>
            <View style={{ padding: 14, flexDirection: 'row', alignItems: 'center', marginBottom: 1, backgroundColor: Colors.COLOR_WHITE }}>
                <TouchableOpacity style={{ paddingRight: 12 }} onPress={() => navigation.goBack()}>
                    <AntDesign name={"arrowleft"} size={20} />
                </TouchableOpacity>
                <Text style={{ ...TEXT_MEDIUM_BOLD }}>Terms and Conditions</Text>
            </View>
            <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 92 }}>
                <Text style={{ textAlign: 'justify' }}>
                    Papiacumi.com ta un plataforma digital unda cu tur dia tin un topico unda cu nos ta trata pa asina usuarionan por commenta. E meta di e plataforma aki ta , ta uno informative etambe eductative. Nos ta aim pa cada commentario of kritika ta uno constructivo.
                    Esaki ta unforma correcto unda nos kier enfoca riba dje pa asina duna di un usuario su banda dikon den su idea pa kico algo por mihor.{'\n'}
                </Text>
                <Text style={{ textAlign: 'justify' }}>
                    E plataforma aki ta resticto y no ta un plataforma pa desfama niun person ay tampoco niun compania. Aki tin reglanancu no mag di mentiona niun number di persona of compania, nada personal, nada pornografico, politico,  y tampoco no ta aun plataforma pa hasien niun promotion.{'\n'}
                </Text>
                <Text style={{ textAlign: 'justify' }}>
                    E persona cu hasi un ovetreding ta wordo geblock y kita pa 3 luna.{'\n'}
                </Text>
                <Text style={{ textAlign: 'justify' }}>
                    Riba e plataforma aki nos lo bai den different categorian di topico y no ta nos team lo bin cu topico, pero tin possibilidad cu cualkier persona por suggest un topico y subie. Esaki no kiermen cu e tey bira e tpopico pa por descuti riba dje, esaki por wordo recommend door di e reaction nan di e otro usuarionan, den forma di like of fire.{'\n'}
                </Text>
                <Text style={{ textAlign: 'justify' }}>
                    E categorianan cu nos lo bin cu ne ta{'\n'}{'\n'}
                    •	Suseso actual local{'\n'}
                    •	Suseso actual international{'\n'}
                    •	Suseso den pasado local y international{'\n'}
                    •	Humor{'\n'}
                    •	Problema nan social{'\n'}
                    •	Pareha{'\n'}
                    •	Homber{'\n'}
                    •	Muhe{'\n'}
                    •	Problemanan local{'\n'}
                </Text>
            </ScrollView>
        </>
    )
}

export default TermsCondition