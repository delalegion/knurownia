import { useState, useEffect } from 'react'
import { supabase } from '../lib/supbase'
import { TextInput, StyleSheet, View, Alert, Text, Keyboard } from 'react-native'
import { Session } from '@supabase/supabase-js'
import Button from './ui/Button'
import Toast from 'react-native-root-toast'

export default function Account({ session }: { session: Session }) {
  const [loading, setLoading] = useState(true)
  const [username, setUsername] = useState('')
  const [website, setWebsite] = useState('')
  const [avatarUrl, setAvatarUrl] = useState('')

  useEffect(() => {
    if (session) getProfile()
  }, [session])

  async function getProfile() {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('Brak usera w sesji!')

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`username, website, avatar_url`)
        .eq('id', session?.user.id)
        .single()
      if (error && status !== 406) {
        throw error
      }

      if (data) {
        setUsername(data.username)
        setWebsite(data.website)
        setAvatarUrl(data.avatar_url)
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  async function signOut() {
    const { error } = await supabase.auth.signOut()
    if (!error) {

    }
  }

  async function updateProfile({
    username,
    website,
    avatar_url,
  }: {
    username: string
    website: string
    avatar_url: string
  }) {
    try {
      setLoading(true)
      if (!session?.user) throw new Error('Brak usera w sesji!')

      const updates = {
        id: session?.user.id,
        username,
        website,
        avatar_url,
        updated_at: new Date(),
      }

      const { error } = await supabase.from('profiles').upsert(updates)

      if (error) {
        throw error
      }
    } catch (error) {
      if (error instanceof Error) {
        // Alert.alert(error.message)
        let toast = Toast.show(error.message, {
          duration: Toast.durations.LONG,
          position: Toast.positions.BOTTOM,
        });
      }
    } finally {
      Keyboard.dismiss();
      let toast = Toast.show('Udało się, zupdejtowałeś profil.', {
        duration: Toast.durations.LONG,
        position: Toast.positions.BOTTOM,
      });
      setLoading(false)
    }
  }

  return (
    <View style={styles.container}>

        <Text style={styles.headerTitle}>Ustawienia konta knura</Text>

        <View style={styles.widthContainer}>

          <View style={[styles.verticallySpaced, styles.mt20]}>
            <TextInput  style={styles.inputStyleDisabled} editable={false} placeholderTextColor="#9c9c9c" value={session?.user?.email} />
          </View>
          <View style={styles.verticallySpaced}>
            <TextInput style={styles.inputStyle} placeholderTextColor="#fff" placeholder="Nazwa" value={username || ''} onChangeText={(text) => setUsername(text)} />
          </View>
          <View style={styles.verticallySpaced}>
            <TextInput style={styles.inputStyle} placeholderTextColor="#fff" placeholder="Stronka www (np. twitch)" value={website || ''} onChangeText={(text) => setWebsite(text)} />
          </View>

        </View>

        <View style={[styles.verticallySpaced, styles.mt20]}>
          <Button
            text={loading ? 'Ładowanie ...' : 'Updejt profilu'}
            onPress={() => updateProfile({ username, website, avatar_url: avatarUrl })}
            disabled={loading}
          />
        </View>

        <View style={styles.verticallySpaced}>
          <Button text="Wyloguj się *papa*" type="grey" onPress={() => supabase.auth.signOut()} />
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 36,
    paddingHorizontal: 20,
    borderBottomColor: '#1C1C1C',
    borderBottomWidth: 2,
    width: '100%'
  },
  headerTitle: {
    marginTop: 30,
    padding: 24,
    color: 'white',
    fontSize: 20,
    fontFamily: 'DMSans_500Medium',
    letterSpacing: -1,
    textAlign: 'center',
    width: '80%',
    display: 'flex',
    alignContent: 'center',
    alignSelf: 'center'
  },
  container: {
    padding: 0,
    alignItems: 'center',
    backgroundColor: '#0D0D0D',
    height: '100%'
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
  inputStyleDisabled: {
    flex: 1,
    padding: 20,
    borderColor: '#2D2D2D',
    borderWidth: 2,
    borderRadius: 8,
    color: '#7c7c7c',
    backgroundColor: '#0D0D0D',
    fontSize: 16
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
  mt20: {
    marginTop: 20,
  },
})