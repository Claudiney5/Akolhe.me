import React from 'react'
import { StyleSheet, Text, View, Image, TextInput, ScrollView, TouchableOpacity, Switch } from 'react-native';
import { WebView } from 'react-native-webview'
import { useNavigation } from '@react-navigation/native';
import { Feather } from '@expo/vector-icons';
import { RectButton } from 'react-native-gesture-handler';



export default function NewFootholdData (){
  return ( 
    <ScrollView style={styles.container} contentContainerStyle={{ padding: 24 }}>
      <Text style={styles.title}>Dados</Text>

      <Text style={styles.label}>Nome do Espaço</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Nome do Proprietário</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Whatsapp</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Cidade</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Máximo dias de hospedagem</Text>
      <TextInput
        style={styles.input}
      />

      <Text style={styles.label}>Valor da diária sugerida</Text>
      <TextInput
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Energia elétrica disponível?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Água disponível?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Tem banheiro disponível?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Chuveiro disponível?</Text>
        <Switch 
          thumbColor="#fff" 
          trackColor={{ false: '#ccc', true: '#39CC83' }}
        />
      </View>

      <Text style={[styles.label, { marginTop: 16 }]}>Regras da casa</Text>
      <TextInput
        style={[styles.input, { height: 110 }]}
        multiline
      />

      <Text style={styles.label}>Fotos</Text>
      <TouchableOpacity style={styles.imagesInput} onPress={() => {}}>
        <Feather name="plus" size={24} color="#15B6D6" />
      </TouchableOpacity>

      

      <RectButton style={styles.nextButton} onPress={() => {}}>
        <Text style={styles.nextButtonText}>Cadastrar PA</Text>
      </RectButton>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  title: {
    color: '#5c8599',
    fontSize: 24,
    fontFamily: 'Nunito_700Bold',
    marginBottom: 2,
    paddingBottom: 12,
    borderBottomWidth: 0.8,
    borderBottomColor: '#D3E2E6'
  },

  label: {
    color: '#508090',
    fontFamily: 'Nunito_600SemiBold',
    marginBottom: 8,
  },

  comment: {
    fontSize: 11,
    color: '#8fa7b3',
  },

  input: {
    backgroundColor: '#fff',
    borderWidth: 1.4,
    borderColor: '#d3e2e6',
    borderRadius: 8,
    height: 48,
    paddingVertical: 18,
    paddingHorizontal: 24,
    marginBottom: 16,
    textAlignVertical: 'top',
  },

  imagesInput: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderStyle: 'dashed',
    borderColor: '#96D2F0',
    borderWidth: 1.4,
    borderRadius: 8,
    height: 56,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 2,
  },

  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 10,
  },

  nextButton: {
    backgroundColor: '#fab143',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 48,
    marginTop: 24,
  },

  nextButtonText: {
    fontFamily: 'Nunito_800ExtraBold',
    fontSize: 16,
    color: '#FFF',
  }
})