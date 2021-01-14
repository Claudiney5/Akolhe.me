import React from 'react'
import { StyleSheet, Text, ScrollView, Image, TouchableOpacity, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import kombi from '../images/k_verm.jpg'

export default function WhoWeAre() {
    const navigation = useNavigation()

    function createNewFootholdLocation() {
      navigation.navigate('CitySelect')
    }


    return (
        <ScrollView style={styles.container}>
            <Text style={styles.whoWeAreText}>
                AkolheMe é um aplicativo gratuíto para você inscrever Pontos de Apoios (PA) 
                e receber kombihomes de todo o Brasil e até mesmo de outros países. Ao memos 
                tempo você é acolhido na casa destes aventureiros, suas kombis, fazendo amizades, trocando histórias.
            </Text>

            <View style={styles.kombiImageContainer}>
                <Image  style={styles.kombiImage} source={kombi} />
            </View>

            <Text style={styles.whoWeAreText}>
                PA podem ser locais interessantes para acampar, pernoitar, ou, quem sabe, 
                apenas um posto de combustível com um bom chuveiro com água quente...

            </Text>
            <Text style={styles.whoWeAreText}>
                Ao preencher os dados não informe seu endereço. Ele deve ser fornecido apenas 
                após os primeiros contatos.

            </Text>
            <Text style={styles.whoWeAreText}>
                Ao cadastrar seu PA, deixe bem claro as regras da casa, como horário de chegada e saída, 
                possibilidade de recebimendo de pets, e outras regras que você desejar se o PA for seu.
            </Text>
            <Text style={styles.whoWeAreText}>
                Ao receber alguém em sua casa procure conhecer melhor e antecipadamente os viajantes.
                Só acolha se você se sentir seguro com as pessoas que frequentarão seu PA.
            </Text>
            <Text style={styles.whoWeAreText}>
                E então, o que você acha? Vamos receber um aventureiro?
            </Text>
            <View style={styles.footer}>
                <Text style={styles.footerText}>Quero criar um PA!</Text>

                <RectButton style={styles.createFootholdButton} onPress={createNewFootholdLocation}>
                    <MaterialCommunityIcons name='van-passenger' size={28} color='white' />
                </RectButton>
            </View>

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#1a75ff',
    },

    whoWeAreText: {
        padding: 16,
        paddingBottom: 0,

        fontFamily: 'Nunito_600SemiBold',
        fontSize: 16,
        color: 'white',
    },

    kombiImageContainer: {
        padding: 16,
        paddingBottom: 0,
    },    

    kombiImage: {
        maxWidth: '100%',
        height: 250,
        borderRadius: 8,
    },

    footer: {
        margin: 20,

    
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 48,
        paddingLeft: 20,
    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
        elevation: 6,
      },
    
      footerText: {

        color: '#8fa7b3',
        fontFamily: 'Nunito_700Bold'
      },

    createFootholdButton: {

        width: 48,
        height: 48,
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
    
      },
})