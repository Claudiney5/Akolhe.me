import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
    title: string
}


export default function WhiteHeader(props: HeaderProps) {

    const navigation = useNavigation()

    return (
        <View style={styles.whiteContainer}>
            <BorderlessButton onPress={navigation.goBack} >
                <Feather name='arrow-left' size={24} color='#1a75ff' />
            </BorderlessButton>
            <Text style={styles.blueTitle}>
                {props.title}
            </Text>
            <View />
        </View>
    )
}

const styles = StyleSheet.create({
    
    whiteContainer: {
        padding: 16,
        backgroundColor: '#dde3f0',
        borderBottomWidth: 1,
        borderColor: '#dfe6ff',
        paddingTop: 36,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 6,
    },

    blueTitle: {
        fontFamily: 'Nunito_700Bold',
        color: '#1a75ff',
        fontSize: 20,
        alignItems: 'center',
    },
})