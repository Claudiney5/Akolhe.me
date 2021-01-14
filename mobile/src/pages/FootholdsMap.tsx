import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps'
import { RectButton } from 'react-native-gesture-handler';
import WebView from 'react-native-webview';

import { useNavigation } from '@react-navigation/native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import mapMarker from '../images/marker04.png'
import kombi from '../images/k_botao02.png'
import map_html_script from '../scripts/map_html_script';
import api from '../services/api';

interface Foothold {
  id: number
  name: 'string'
  latitude: number
  longitude: number
}


export default function FootholdsMap() {
  const [footholds, setFootholds] = useState<Foothold>()
  const [lat, setLat] = useState<number>()
  const [lon, setLong] = useState<number>()
  const navigation = useNavigation()
  
  useEffect(() => {
    api.get('foothold').then(response => {
      setFootholds(response.data)
    })
  }, [])
  
  let jsCode = `footholdMap.setView([${lat}, ${lon}], 13)`

  function createNewFootholdLocation() {
    let appId = '30c19f4e549b1f59d990ccc77c60dcbc';
    let units = 'metric';

    fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&lang=pt_br&units=${units}`)
        .then(result => {   
            return result.json();
        })
        .then((result) => {
            setLat(result.coord.lat)
            setLong(result.coord.lon)          
        })    

  }


  function handleNavigationToFootholdDetails() {
    navigation.navigate('FootholdDetails')
  }




  return (
    <>
      <View style={styles.mapContainer}>
        <WebView 
          source={{ html: map_html_script }}
          injectedJavaScript={jsCode}
        />
        
      </View>

      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          style={styles.mapStyle}
          initialRegion={{
            latitude: -25.300,
            longitude: -57.600,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >

          {footholds.map(foothold => {
            return (
              <Marker
                key={foothold.id}
                icon={mapMarker}
                calloutAnchor={{
                  x: 2.4,
                  y: 0.8,
                }}
                coordinate={{
                  latitude: foothold.latitude,
                  longitude: foothold.longitude,
                }}
              >
                <Callout tooltip={true} onPress={handleNavigationToFootholdDetails}>
                  <View style={styles.calloutContainer}>
                    <Text style={styles.calloutText}>
                      {foothold.name}
                    </Text>
                  </View>
                </Callout>
              </Marker>
            );
          })}

        </MapView>

        <View style={styles.footer}>
          <Text style={styles.footerText}>Crie um apoio na cidade de...</Text>

          <RectButton style={styles.createFootholdButton} onPress={createNewFootholdLocation}>
            <MaterialCommunityIcons name='van-passenger' size={28} color='white' />
          </RectButton>
        </View>

      </View></>
  )
}

const styles = StyleSheet.create({
    mapContainer: {

    },

    container: {
      flex: 1,
      
    },
  
    mapStyle: {
      width: Dimensions.get('window').width,
      height: Dimensions.get('window').height,
    },
  
    calloutContainer: {
      width: 160,
      height: 46,
      paddingHorizontal: 16,
      backgroundColor: 'rgba(255,255,255,0.8)',
      borderRadius: 12,
      justifyContent: 'center',
  
    },
  
    calloutText: {
      color: '#0f2cd1',
      fontFamily: 'Nunito_700Bold',
    },
  
    footer: {
      position: 'absolute',
      left: 24,
      right: 24,
      bottom: 32,
  
      backgroundColor: '#fff',
      borderRadius: 12,
      height: 48,
      paddingLeft: 24,
  
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
      backgroundColor: '#1a75ff',
      borderRadius: 12,
  
      justifyContent: 'center',
      alignItems: 'center',
  
    },
  });
  