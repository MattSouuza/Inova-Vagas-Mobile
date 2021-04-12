import React, { useContext } from 'react';
import { StyleSheet } from 'react-native';

// Menu lateral e navegação por pilha
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';

// Auth Context
import AuthContext from '../context/auth';

// Pages
import Login from '../pages/login';
import Home from '../pages/home';
import HomeEmpresa from '../pages/homeEmpresa/index';
//import VagasEmpresa from '../pages/VagasEmpresa';
import Cadastro from '../pages/cadastro';
import { ActivityIndicator, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Route } from 'react-router-native';
import MinhasVagas from '../pages/minhasVagas';
import CustomMenu from '../components/menuOptions/customMenu';


function Routes() {
  const Stack = createStackNavigator();
  const Drawer = createDrawerNavigator();

  // Adquirindo propriedades do authContext
  const { logged, IsAdmin, isLoading, tokenDecoded, IsComum } = useContext(AuthContext);

  // Para adquirir o tokenDecoded, apenas use o contexto como neste exemplo
  console.log(tokenDecoded)

  const logout = () => {
    AsyncStorage.removeItem('token-inova');
  }

  // Caso estiver carregando irá mostrar um ícone de carregamento
  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size='large' />
      </View>
    );
  }

  // Stack de Guest (telas de usuário que não está autenticado)
  const Guest = () => {
    return (
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          options={{
            headerShown: false
          }}
          name="Login"
          component={Login}
        />

        {/* <Tab.Screen
          name="Cadastro"
          component={Cadastro}
        /> */}
      </Stack.Navigator>
    );
  }

  // Stack de Candidato (telas de candidato)
  const Candidato = () => {
    return (
      <Drawer.Navigator initialRouteName="Home">
        <Drawer.Screen
          options={{
            headerShown: false
          }}
          name="Home"
          component={Home}
        />

        <Drawer.Screen
          component={MinhasVagas}
          name='Minhas Candidaturas'
          options={{
            headerShown: false
          }} />

        <Drawer.Screen
          name="Sair"
          component={Login}
        />
      </Drawer.Navigator>
    );
  }

  // Stack de empresa (telas de empresa)
  const Empresa = () => {
    return (
      <Drawer.Navigator initialRouteName="HomeEmpresa">
        <Drawer.Screen
          options={{
            headerShown: false
          }}
          name="Home"
          component={HomeEmpresa}
        />
        <Drawer.Screen
          name="Sair"
          component={Login}
        />
      </Drawer.Navigator>
    );
  }

  return (
    <Stack.Navigator>
      {logged ? IsAdmin ?
        (<Stack.Screen
          options={{
            headerShown: false
          }}
          name="Candidato"
          component={Candidato}
        />) :

        (<Stack.Screen
          options={{
            headerShown: false
          }}
          name="Empresa"
          component={Empresa}
        />) :

        (< Stack.Screen
          options={{
            headerShown: false
          }}
          name="Guest"
          component={Guest}
        />)
      }
    </Stack.Navigator>
  );
}


export default Routes;