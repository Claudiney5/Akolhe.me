import React from 'react'
import { View, StyleSheet, Dimensions, Text } from 'react-native'
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';

import map_html_script  from '../../scripts/map_html_script'
import mapMarkerImg from '../../images/marker04.png'


export default function SelectMapPosition() {
    const navigation = useNavigation()

    function handleNextStep(){
        navigation.navigate('NewFootholdData')
    }

    return (
        <>
        <View style={styles.mapContainer}>
            <WebView source={{ html: map_html_script }} />
        </View>

        <View style={styles.container}>
            <MapView
                initialRegion={{
                    latitude: -27.2092052,
                    longitude: -49.6401092,
                    latitudeDelta: 0.008,
                    longitudeDelta: 0.008,
                }}
                style={styles.mapStyle}
            >
                <Marker
                    icon={mapMarkerImg}
                    coordinate={{ latitude: -27.2092052, longitude: -49.6401092 }} />
            </MapView>

            <RectButton style={styles.nextButton} onPress={handleNextStep}>
                <Text style={styles.nextButtonText}>Próximo</Text>
            </RectButton>
        </View>
        </>
    )
    }

    const styles = StyleSheet.create({
        mapContainer: {

        },
            
        container: {
            flex: 1,
            position: 'relative'
        },

        mapStyle: {
            width: Dimensions.get('window').width,
            height: Dimensions.get('window').height,
        },

        nextButton: {
            backgroundColor: '#fab143',
            borderRadius: 8,
            justifyContent: 'center',
            alignItems: 'center',
            height: 48,

            position: 'absolute',
            left: 24,
            right: 24,
            bottom: 24,
        },

        nextButtonText: {
            fontFamily: 'Nunito_800ExtraBold',
            fontSize: 16,
            color: '#FFF',
        },
})