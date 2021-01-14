import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, Image, TextInput, Button, Dimensions } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import MapView, {
    MAP_TYPES,
    PROVIDER_GOOGLE,
    Marker,
    Callout
} from 'react-native-maps'

import api from '../services/api';
import kombi from '../images/k_azul.png'
import mapMarker from '../images/marker04.png'
import FootholdsMap from './FootholdsMap';

interface FootholdItems {
    id: string;
    name: string;
    latitude: number;
    longitude: number;
}

  
export default function LandingPage() {
    const [footholds, setFootholds] = useState<FootholdItems[]>([])
    const [city, setCity] = useState('Florianópolis')
    const [citySelected, setCitySelected] = useState(false)
    const [lat, setLat] = useState<number>(10)
    const [lon, setLong] = useState<number>(0)
    const [webViewLeafletRef, setWebViewLeafletRef] = useState(null);
  
    const navigation = useNavigation()

    console.log(footholds)
    
    useEffect(() => {
        api.get('footholds').then(response => {
            setFootholds(response.data)
        })
    }, []) 

    
    function handleSelectedDestination() {

      let appId = '30c19f4e549b1f59d990ccc77c60dcbc';
      let units = 'metric';
  
      fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&APPID=${appId}&lang=pt_br&units=${units}`)
          .then(result => {   
              return result.json();
          })
          .then((result) => {
              setLat(result.coord.lat)
              setLong(result.coord.lon)          
          }).then(() => setCitySelected(true))
    }

    function handleNavigationWhoWeAre() {
        navigation.navigate('WhoWeAre')
    }

    function handleNavigationToFootholdDetails() {
        navigation.navigate('FootholdDetails')
    }

    function handleBackButton() {
        setCitySelected(false)
    }

    //  ----- ----- -----  SECOND RENDER (MAP) ----- ----- -----  //

    if(citySelected){
        return (
            <View style={styles.mapContainer}>
                <MapView
                    provider={PROVIDER_GOOGLE}
                    style={styles.map}
                    initialRegion={{
                        latitude: lat,
                        longitude: lon,
                        latitudeDelta: 0.020,
                        longitudeDelta: 0.020,
                    }}
                >
                    {footholds.map(foothold => {
                        return (
                            <Marker
                              key={foothold.id}
                              icon={mapMarker}
                              coordinate={{
                                  latitude: foothold.latitude,
                                  longitude: foothold.longitude,
                              }}
                            >
                                <Callout tooltip onPress={handleNavigationToFootholdDetails} >
                                    <View style={styles.calloutContainer}>
                                        <Text style={styles.calloutText}>{foothold.name}</Text>
                                    </View>
                                </Callout>
                            </Marker>
                        )
                    })}

                    

                </MapView>                

                <View style={styles.containerBackButton}>
                    <RectButton style={styles.BackButton} onPress={ handleBackButton }>
                        <Text style={styles.whoWeAreText}>
                            Voltar
                        </Text>
                    </RectButton>
                </View>

            </View>
        
        );

    //  ----- ----- ----- FIRST RENDER  ----- ----- -----  //
        
    } else {

        return (
        <View  style={styles.container}>
            <View style={styles.imageContainer} >
                <Image source={kombi} style={styles.image} />
            </View>

            <View style={styles.calloutContainer}>
                <Text style={styles.calloutText}>
                    Acolha uma Kombihome e seja acolhido!
                </Text>
            </View>

            <View style={styles.whoWeAre}>
                <RectButton style={styles.whoWeAreButton} onPress={ handleNavigationWhoWeAre }>
                    <Text style={styles.whoWeAreText}>
                        AkolheMe :   Quem somos...
                    </Text>
                </RectButton>
            </View>

            <View style={styles.footer}>
                <TextInput 
                style={styles.footerText}
                placeholder="Cidade destino "
                onChangeText={city => setCity(city)}
                />

                <RectButton style={styles.createFootholdButton} onPress={ handleSelectedDestination }>
                    <MaterialCommunityIcons name='van-passenger' size={28} color='white' />
                </RectButton>
            </View>
        </View>
        )
    }
}


// ------ ----- ----- STYLES ----- ----- ----- //

const styles = StyleSheet.create({
    mapContainer: {
        flex: 1,  
      },

    container: {
        flex: 1,
        backgroundColor: '#1a75ff',
    },
    
    imageContainer: {
        padding: 25,
        width: 'auto',
        height: 'auto',
    },

    image: {
        width: 'auto',
        height: 200,
        resizeMode: 'center',
    },
    
    calloutContainer: {
        padding: 24,
        paddingTop: 0,
        width: 'auto',
        height: 'auto',
        backgroundColor: '#1a75ff',
        justifyContent: 'center',   
        alignItems: 'center', 
    },
    
    calloutText: {
        color: '#fff',
        fontFamily: 'Nunito_700Bold',
        fontSize: 32,
    },

    whoWeAre: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 88,
        
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    whoWeAreButton: {
        color: 'white',
        height: 46,
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
    },

    whoWeAreText: {
        color: '#fff',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 18,
    },
    
    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 24,
    
        backgroundColor: '#fff',
        borderRadius: 12,
        height: 46,
        paddingLeft: 24,
    
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    
        elevation: 4,
    },
    
    footerText: {
        color: '#7791a0',
        fontFamily: 'Nunito_600SemiBold',
        fontSize: 18,
    },
    
    createFootholdButton: {
        width: 56,
        height: 46,
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
    
    },

    map: {
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
    },

    containerBackButton: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 24,
        
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 4,
    },

    BackButton: {
        color: 'white',
        height: 46,
        backgroundColor: '#fab143',
        borderRadius: 12,
    
        justifyContent: 'center',
        alignItems: 'center',
    },
});