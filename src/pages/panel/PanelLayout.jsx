import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import SettingsScreen from './SettingsScreen';
import ChatScreen from './ChatScreen';
import TabBar from '../../../components/ui/TabBar';
import { StyleSheet } from 'react-native';
import TodoScreen from './TodoScreen';
import DashboardScreen from './DashboardScreen';

const Tab = createBottomTabNavigator();

const PanelLayout = () => {
  return (
   <Tab.Navigator screenOptions={{
      tabBarStyle: { backgroundColor: 'pink' },
    }} tabBar={(props) => <TabBar {...props} />}>
      <Tab.Screen name="Czat" component={ChatScreen} options={{headerShown: false}} />
      <Tab.Screen name="Todo" component={TodoScreen} options={{headerShown: false}} />
      <Tab.Screen name="Twitch" component={DashboardScreen} options={{headerShown: false}} />
      <Tab.Screen name="Ustawienia" component={SettingsScreen} options={{headerShown: false}} />
   </Tab.Navigator>
  );
};

export default PanelLayout;