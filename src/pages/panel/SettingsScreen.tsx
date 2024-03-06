import { useState, useEffect } from 'react'
import 'react-native-url-polyfill/auto'
import { View, Text, StyleSheet } from 'react-native';
import Account from '../../../components/Account';
import { Session } from '@supabase/supabase-js'
import { supabase } from '../../../lib/supbase'

const SettingsScreen = () => {
  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  return (
    <View>
      <Account session={session} />
    </View>
  );
};

export default SettingsScreen;
