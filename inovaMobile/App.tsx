import React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Login from './src/pages/login/index';
import Cadastro from './src/pages/cadastro/index';
import Home from './src/pages/home/index';
import { Entypo } from '@expo/vector-icons';
import Menu from './src/components/menu/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parseJwt from './src/services/tokenDecoder';
import MenuOptions from './src/components/menuOptions/index';
import Routes from './src/services/routes';
import { AuthProvider } from './src/context/auth';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

// const NavigationDrawerStructure = (navigation : any) => {
//   return(
//     <View style={styles.menu}>
//       <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Entypo name='menu' size={46} color='white'/>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const Tab = createBottomTabNavigator();

// function Tabs(){
//   return(
//     <Tab.Navigator initialRouteName='Login'>
//       <Tab.Screen name='Login' component={Login}/>
//       <Tab.Screen name='Cadastro' component={Cadastro}/>
//     </Tab.Navigator>
//   );
// }
// const token = AsyncStorage.getItem('token-inova');

// function logout() {

// }

// function CustomSidebarMenu() {
//   return (
//     <DrawerContentScrollView>
//       <DrawerItem label='Sair' onPress={() => logout()} />
//     </DrawerContentScrollView>
//   );
// }

// function DrawerMenu() {
//   return (
//     <Drawer.Navigator initialRouteName='Home'
//     drawerContent={(props) => <CustomSidebarMenu {...props} />}>
//       <Drawer.Screen name='Home' component={Home} />
//     </Drawer.Navigator>
//   );
// }

export default function App() {
  return (
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name='Login' component={Login} options={{
          title: '',
          headerStyle: {
            backgroundColor: 'none',
            height: 0,
          },
          headerShown: false
        }} />
        <Stack.Screen name='Cadastro' component={Cadastro} options={{
          title: '', headerTintColor: '#fff',
          headerShown: false
        }} />
        <Stack.Screen name='Home' component={DrawerMenu} options={{
          title: '', headerShown: false
        }} />
      </Stack.Navigator> */}

      <AuthProvider>
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}