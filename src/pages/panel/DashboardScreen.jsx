import 'react-native-url-polyfill/auto'
import { View, Text, StyleSheet } from 'react-native';

const DashboardScreen = () => {
  return (
   <View style={styles.container}>
      <View style={styles.inner}>
         <Text style={styles.headerTitle}>Panel knura</Text>
         <Text style={styles.ptitle}>Tutaj miałbyć taki fajny panel knura do zarządzania strimem ale niestety zabrakło mi czasu</Text>
      </View>
   </View>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
   ptitle: {
      fontSize: 14,
      color: 'white',
      padding: 30,
      marginTop: 40,
      fontFamily: 'DMSans_500Medium',
      color: '#a5a5a5'
   },
   container: {
      padding: 0,
      alignItems: 'center',
      backgroundColor: '#0D0D0D',
      height: '100%',
      flex: 1
    },
   inline: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      gap: 6,
      alignContent: 'center',
      justifyContent: 'center'
   },
   headerTitle: {
      marginTop: 54,
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
 })