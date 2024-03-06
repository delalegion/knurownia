import { View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import FeatherIcons from '@expo/vector-icons/Feather';

export default function TabBar({ state, descriptors, navigation }) {
  return (
    <View style={styles.tabs}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            key={route.name}
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tab}
          >
            <View style={styles.iconStyleContainer}>
               {(() => {
                  switch (route.name) {
                    case "Twitch":   return <FeatherIcons name="cast" size={24} color={isFocused ? '#00F077' : '#fff'} style={styles.iconStyle} />;
                    case "Czat": return <FeatherIcons name="message-circle" size={24} color={isFocused ? '#00F077' : '#fff'} style={styles.iconStyle} />;
                    case "Todo": return <FeatherIcons name="list" size={24} color={isFocused ? '#00F077' : '#fff'} style={styles.iconStyle} />;
                    case "Ustawienia":  return <FeatherIcons name="settings" size={24} color={isFocused ? '#00F077' : '#fff'} style={styles.iconStyle} />;
                    default: return <FeatherIcons name="list" size={24} color={isFocused ? '#00F077' : '#fff'} style={styles.iconStyle} />;
                  }
                })()}
            </View>
            <Text style={{color: isFocused ? '#00F077' : '#fff', fontFamily: 'DMSans_700Bold', textAlign: 'center', fontSize: 11 }}>
               {label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}


const styles = StyleSheet.create({
   tabs: {
      flexDirection: 'row',
      marginVertical: 12,
      marginHorizontal: 30,
      backgroundColor: '#2D2D2D',
      borderRadius: 100
   },
   iconStyleContainer: {
      display: 'flex',
      justifyContent: 'center'
   },
   iconStyle: {
      display: 'flex',
      justifyContent: 'center',
      width: '100%',
      textAlign: 'center'
   },
   tab: {
     height: 70,
     flex: 1,
     padding: 12,
     gap: 4,
     display: 'flex',
     justifyContent: 'center',
     alignContent: 'center',
     textAlign: 'center',
     flexDirection: 'column',
   }
 })