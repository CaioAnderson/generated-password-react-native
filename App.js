import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import Slider from '@react-native-community/slider';
import Clipboard from 'expo-clipboard';

import logo from './src/assets/logo.png';


let charset = 'abcdefghijklmnopqrstuvxywzABCDEFGHIJLKMNOPQRSTUVXWYZ0123456789-+_';

export default function App() {

  const [senha, setSenha] = useState('');
  const [size, setSize] = useState(6);
  const [isCopy, setIsCopy] = useState(false);

  function generatedPassword() {
    let pass = '';
    for (let i = 0, n = charset.length; i < size; i++) {
      pass += charset.charAt(Math.floor(Math.random() * n))
    }
    setSenha(pass);
  }

  function copyPassword(){
      Clipboard.setString(senha);
      setIsCopy(true);
      setTimeout(() => {
        setIsCopy(false);
      }, 3000);
  }


  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo} />
      <Text style={styles.title}>{size} Caracteres</Text>

      <View style={styles.areaSlider}>
        <Slider style={{ height: 50 }}
          minimumValue={6}
          maximumValue={15}
          minimumTrackTintColor='#FF0000'
          maximumTrackTintColor='#000'
          value={size}
          onValueChange={(value) => setSize(value.toFixed(0))}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={generatedPassword}>
        <Text style={styles.textButton} >Gerar senha</Text>
      </TouchableOpacity>

      {senha !== '' &&
        (
          <View style={styles.areaPassword}>
            <Text style={styles.textPassword} onLongPress={copyPassword}>{senha}</Text>
          </View>
        )
      }

      { isCopy && (
        <Text>Copiado!</Text>
      ) }



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f0',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginBottom: 60
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  areaSlider: {
    width: '70%',
    backgroundColor: '#FFF',
    borderRadius: 7,
    padding: 10,
    marginVertical: 30
  },
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffa000',
    width: '70%',
    padding: 20,
    borderRadius: 7,
    marginBottom: 50
  },
  textButton: {
    fontSize: 20,
    color: '#fff',
    fontWeight: 'bold'
  },
  areaPassword: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    width: '70%',
    backgroundColor: '#fff',
    marginBottom: 12
  },
  textPassword: {
    fontSize: 20
  }
});
