import React, { useState} from 'react'
import { StyleSheet, Text, TextInput, Image, View, ScrollView, Alert } from 'react-native';

import {
  WebViewLeaflet, 
  WebViewLeafletEvents, 
  Marker, 
  Popup,
  INFINITE_ANIMATION_ITERATIONS, 
  LatLng,  
  WebviewLeafletMessage,
  AnimationType,
  MapShapeType
} from 'react-native-webview-leaflet';
import { RectButton } from 'react-native-gesture-handler';
import { useNavigation } from '@react-navigation/native';

import kombi from '../../images/k_azul1.jpg'




// ------------------- EXPORT DEFAULT INIT ------------------------

export default function CitySelect2 () {
  const [city, setCity] = useState('Brasília')
  const [citySelected2, setCitySelected2] = useState(false)
  const [lat, setLat] = useState<number>()
  const [lon, setLong] = useState<number>()

  const navigation = useNavigation()

  function showSelectedMapPosition() {
    navigation.navigate('SelectedMapPosition')
  }
 

  function handleSelectedPosition() {
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

    setCitySelected2(true)
  }

// ---------------- MOSTRANDO PONTOS DE APOIO NA CIDADE ESCOLHIDA -------------------------------

  if(citySelected2){  

    type LatLngObject = { lat: number; lng: number };
    
    const onMessageReceived = (message: WebviewLeafletMessage) => {
      switch (message.event) {
        case WebViewLeafletEvents.ON_MAP_MARKER_CLICKED:
          Alert.alert(
            `Map Marker Touched, ID: ${message.payload.mapMarkerID || "unknown"}`
          );
  
          break;
        case WebViewLeafletEvents.ON_MAP_TOUCHED:
          const position: LatLngObject = message.payload
            .touchLatLng as LatLngObject;
          Alert.alert(`Map Touched at:`, `${position.lat}, ${position.lng}`);
          break;
        default:
          console.log("App received", message);
      }
    };
    
    // const _markerInPosition:any = (lat:number, lon:number) => {
    //   this.refs['Map_Ref'].injectJavaScript(`
    //   footholdMap.setView([${lat}, ${lon}], 13);`).injectJavaScript(`L.marker([${lat}, ${lon}]).setView(L.marker)`)
    // }

    return (
      <View style={styles.mapContainer}>
        
        <WebViewLeaflet
          ref={(component: any) => (this.webViewLeaflet = component)}
          // The rest of your props, see the list below
          onMessageReceived={onMessageReceived}
          backgroundColor={'#1a75ff'}
                
    

        />
          
        <RectButton style={styles.informationsButton} onPress={ showSelectedMapPosition }>
          <Text style={styles.citySelectButtonText}>
            Cadastrar Informações do PA
          </Text>
        </RectButton>

      </View>

    )

// ---------------------PÁGINA INICIAL -------------------------------

  } else {
    return (
      <ScrollView style={styles.blueContainer}>
        <Text style={styles.citySelectText}>
          Para cadastrar um Ponto de apoio (PA) no AkolheMe, primeiro você tem que definir
          o local dele, sua cidade.         
        </Text>
        <Text style={styles.citySelectText}>
          Quando você digitar a cidade o AkolheMe o levará a um mapa onde você poderá clicar sobre o 
          endereço do PA. Não precisa ser exato, mas sugerimos que seja próximo do verdadeiro local para 
          melhor avaliação dos viajantes.
        </Text>
        <Text style={styles.citySelectText}>
          Após a imagem digite a cidade do PA que você deseja cadastrar.
        </Text>
        <View style={styles.kombiImageContainer}>
          <Image  style={styles.kombiImage} source={kombi} />
        </View>

        <TextInput 
          style={styles.cityInput}
          placeholder="Digite a cidade do PA"
          onChangeText={city => setCity(city)}
        />

        <View style={styles.citySelect}>
          <RectButton style={styles.citySelectButton} onPress={ handleSelectedPosition} >
            <Text style={styles.citySelectButtonText}>
              Criar PA em {city}
            </Text>
          </RectButton>
        </View>

      </ScrollView>
    )
  }
}

// --------------ESTILOS--------------

const styles = StyleSheet.create ({
  blueContainer: {
    flex: 1,
    backgroundColor: '#1a75ff',
  },

  citySelectText: {
    padding: 20,
    paddingBottom: 0,

    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
    color: 'white',
  },

  kombiImageContainer: {
    padding:20,
    paddingBottom: 0,
  },

  kombiImage: {
    maxWidth: '100%',
    height: 250,
    borderRadius: 10,
  },

  cityInput: {
    margin: 20,

    backgroundColor: '#fff',
    borderRadius: 10,
    height: 48,
    paddingLeft: 20,

    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',

    elevation: 6,
  },

  citySelect: {
    marginHorizontal: 20,
    marginBottom: 30,
    
    backgroundColor: '#fab143',
    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
},

citySelectButton: {
    color: 'white',
    height: 48,
    backgroundColor: '#fab143',
    borderRadius: 12,

    justifyContent: 'center',
    alignItems: 'center',
},

citySelectButtonText: {
    color: '#fff',
    fontFamily: 'Nunito_600SemiBold',
    fontSize: 16,
},


mapContainer: {
  flex: 1,  
},

informationsButton: {
  position: 'absolute',
  left: 24,
  right: 24,
  bottom: 24,

  color: 'white',
  height: 48,
  backgroundColor: '#fab143',
  borderRadius: 12,

  justifyContent: 'center',
  alignItems: 'center',
},

iconStyle: {
  elevation: 6,
  zIndex: 1000,
},



})