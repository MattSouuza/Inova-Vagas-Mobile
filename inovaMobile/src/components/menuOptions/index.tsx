import * as React from 'react';
import { Image, Text, View } from 'react-native';
import { createDrawerNavigator, DrawerContent, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Icon } from 'expo';
import { Entypo } from '@expo/vector-icons';
import Home from '../../pages/home/index';
import Cadastro from '../../pages/cadastro/index';
import Login from '../../pages/login/index';
import CustomMenu from './CustomMenu';
import Logout from '../logout';
import AsyncStorage from '@react-native-async-storage/async-storage';
import parseJwt from '../../services/tokenDecoder';

const Drawer = createDrawerNavigator();

export default function ScreensMenu() {

    // const token = AsyncStorage.getItem('token-inova');

    // if (token == undefined || token == null) {
    //     return (
    //         <Drawer.Navigator initialRouteName='Login'>
    //             <Drawer.Screen
    //                 name="Login"
    //                 component={Login}/>
    //             <Drawer.Screen
    //                 name="Cadastro"
    //                 component={Cadastro}/>
    //         </Drawer.Navigator >
    //     );
    // }

    // if (token !== undefined || token !== null) {
    //     return (
    //         <Drawer.Navigator
    //             initialRouteName="Login"

    //             drawerStyle={{
    //                 backgroundColor: '#F1F1F1',
    //                 paddingVertical: 15,

    //             }}
    //             drawerContentOptions={{
    //                 activeTintColor: '#FFFFFFF',
    //                 activeBackgroundColor: '#ef1313',
    //             }}
    //         // drawerContent={(props) => <CustomMenu {...props} />}
    //         >
    //             <Drawer.Screen
    //                 name="Home"
    //                 component={Home}
    //                 options={
    //                     {
    //                         //focused é una prop em boleano para indicar ser o menu é selecionado ou não
    //                         drawerLabel: (({ focused }) => <Text style={
    //                             {
    //                                 color: focused ? 'white' : '#df2f2f',
    //                                 fontSize: 18,
    //                             }}>Home</Text>),

    //                         drawerIcon: (({ focused }) => <Entypo name='home' size={24} color={focused ? 'white' : '#df2f2f'} />)
    //                     }
    //                 }
    //             />
    //             {/* <Drawer.Screen
    //             name="Empresa"
    //             component={Empresa}
    //             options={
    //                 {
    //                     //focused é una prop em boleano para indicar ser o menu é selecionado ou não
    //                     drawerLabel: (({ focused }) => <Text style={
    //                         {
    //                             color: focused ? '#FFF' : '#000000',
    //                             fontSize: 18,
    //                         }}>Empresa</Text>),

    //                     drawerIcon: (({ focused }) => <Entypo name='clipboard' size={24} color={focused ? '#FFFFFF' : '#000000'} />)
    //                 }
    //             }
    //         /> */}

    //         <DrawerItems {...props} />
    //         <TouchableOpacity onPress={()=>
    //           Alert.alert(
    //             'Log out',
    //             'Do you want to logout?',
    //             [
    //               {text: 'Cancel', onPress: () => {return null}},
    //               {text: 'Confirm', onPress: () => {
    //                 AsyncStorage.clear();
    //                 props.navigation.navigate('Login')
    //               }},
    //             ],
    //             { cancelable: false }
    //           )  
    //         }>
    //           <Text style={{margin: 16,fontWeight: 'bold',color: colors.textColor}}>Logout</Text>
    //         </TouchableOpacity>

    //             <Drawer.Screen
    //                 name="Cadastro"
    //                 component={Cadastro}
    //                 options={
    //                     {
    //                         //focused é una prop em boleano para indicar ser o menu é selecionado ou não
    //                         drawerLabel: (({ focused }) => <Text style={
    //                             {
    //                                 color: focused ? 'white' : '#df2f2f',
    //                                 fontSize: 18,
    //                             }}>Aluno</Text>),

    //                         drawerIcon: (({ focused }) => <Entypo name='user' size={24} color={focused ? 'white' : '#df2f2f'} />)

    //                     }
    //                 }
    //             />

    //             {/* <Drawer.Screen
    //                 name="Sair"
    //                 component={ }
    //                 options={
    //                     {
    //                         //focused é una prop em boleano para indicar ser o menu é selecionado ou não
    //                         drawerLabel: (({ focused }) => <Text style={
    //                             {
    //                                 color: focused ? 'white' : '#df2f2f',
    //                                 fontSize: 18,
    //                             }}>Login</Text>),
    //                         drawerIcon: (({ focused }) => <Entypo name='login' size={24} color={focused ? 'white' : '#df2f2f'} />)

    //                     }
    //                 }
    //             />*/}
    //         </Drawer.Navigator>
    //     );
    // }
}
