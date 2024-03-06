import React, { useState } from 'react'
import { Alert, StyleSheet, View, TextInput } from 'react-native'
import { supabase } from '../lib/supbase'
import Button from './ui/Button'
import Toast from 'react-native-root-toast'

export default function Auth() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  async function signInWithEmail() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    })
    if (error) {
      // Alert.alert(error.message)
      let toast = Toast.show('Złe dane logowania mordo!', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    }
    setLoading(false)
  }

  async function signUpWithEmail() {
    setLoading(true)
    const {
      data: { session },
      error,
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    })

    if (email.length < 4) {
      let toast = Toast.show('Email musi mieć conajmniej 4 znaki kochaniutki.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    } else if (password.length < 4) {
      let toast = Toast.show('Hasło musi mieć conajmniej 4 znaki kochaniutki.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.TOP,
      });
    } else if (error) { 
      Alert.alert(error.message)
    } else {
      Alert.alert('Sprawdź i potwierdź emailik mordziaty!')
    }

    setLoading(false)
  }

  return (
    <View style={styles.container}>
      <View style={styles.widthContainer}>

        <View style={styles.verticallySpaced}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => setEmail(text)}
            value={email}
            placeholder="adres@email.com"
            placeholderTextColor="#fff"
            autoCapitalize={'none'}
          />
        </View>
        <View style={styles.verticallySpaced}>
          <TextInput
            style={styles.inputStyle}
            onChangeText={(text) => setPassword(text)}
            value={password}
            secureTextEntry={true}
            placeholder="Hasełko"
            placeholderTextColor="#fff"
            autoCapitalize={'none'}
          />
        </View>
      
      </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button disabled={loading} text="Zaloguj się" onPress={() => signInWithEmail()} />
        </View>
        <View style={styles.verticallySpaced}>
          <Button disabled={loading} text="Stwórz konto" type="grey" onPress={() => signUpWithEmail()} />
        </View>
    
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    height: '100%'
  },
  widthContainer: {
    width: '80%'
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: 'stretch',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6
  },
  inputStyle: {
    flex: 1,
    padding: 20,
    borderColor: '#2D2D2D',
    borderWidth: 2,
    borderRadius: 8,
    color: 'white',
    backgroundColor: '#0D0D0D',
    fontSize: 16,
    fontFamily: 'DMSans_500Medium',
  },
  mt20: {
    marginTop: 20,
  },
  button: {
    paddingVertical: 20,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00F077', 
    backgroundColor: '#0C1F15',
    shadowColor: "#00F077",
    shadowOffset: {
       width: 0,
       height: 5,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1
   },
   buttonHover: {
    paddingVertical: 20,
    width: '80%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#00F077', 
    shadowColor: "#00F077",
    shadowOffset: {
       width: 0,
       height: 7,
    },
    shadowOpacity: 1,
    shadowRadius: 0,
    elevation: 1,
    position: 'relative',
    top: 7
   },
})