import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { BorderlessButton } from 'react-native-gesture-handler'
import { Feather } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'

interface HeaderProps {
    title: string
}

export default function Header(props: HeaderProps) {
    const navigation = useNavigation()


    return (
        <View style={styles.container}>
            <BorderlessButton onPress={navigation.goBack} >
                <Feather name='arrow-left' size={24} color='white' />
            </BorderlessButton>
            <Text style={styles.title}>
                {props.title}
            </Text>
            <View />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        padding: 16,
        backgroundColor: '#1a75ff',
        borderBottomWidth: 1,
        borderColor: '#1a75ff',
        paddingTop: 36,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 6,
    },

    title: {
        fontFamily: 'Nunito_700Bold',
        color: 'white',
        fontSize: 20,
        alignItems: 'center',
    },
})