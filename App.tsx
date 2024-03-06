import { useState, useEffect } from 'react'
import { RootSiblingParent } from 'react-native-root-siblings';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './src/pages/HomeScreen';
import Auth from './src/pages/AuthScreen';
import PanelLayout from './src/pages/panel/PanelLayout';
import {
  useFonts,
  DMSans_400Regular,
  DMSans_400Regular_Italic,
  DMSans_500Medium,
  DMSans_500Medium_Italic,
  DMSans_700Bold,
  DMSans_700Bold_Italic,
} from '@expo-google-fonts/dm-sans';
import { Session } from '@supabase/supabase-js'
import { supabase } from './lib/supbase'

const Stack = createStackNavigator();

const App = () => {

  const [session, setSession] = useState<Session | null>(null)

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const [fontsLoaded, fontError] = useFonts({
    DMSans_400Regular,
    DMSans_400Regular_Italic,
    DMSans_500Medium,
    DMSans_500Medium_Italic,
    DMSans_700Bold,
    DMSans_700Bold_Italic,
  });

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return (
    <RootSiblingParent>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Home">
          {session ? (
            <>
            <Stack.Screen name="Panel" component={PanelLayout} options={{
              headerShown: false,
              gestureEnabled: false,
              headerLeft: () => <></>,
              cardStyle: { backgroundColor: '#0D0D0D' }
            }} />
            </>
          ) : (
            <>
            <Stack.Screen name="Home" component={HomeScreen} options={{headerShown: false}} />
            <Stack.Screen name="Auth" component={Auth} options={{
              headerStyle: {
                backgroundColor: '#0D0D0D'
              },
              headerTintColor: '#fff',
              headerTitleStyle: {
                fontWeight: 'bold',
                fontFamily: 'DMSans_500Medium'
              },
              headerShadowVisible: false
            }} />
            </>
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </RootSiblingParent>
  );
};

export default App;