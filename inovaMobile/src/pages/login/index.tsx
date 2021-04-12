import React, { useState, useContext } from 'react';
import { KeyboardAvoidingView, StyleSheet, Text, View, Alert, Image, TextInput, Button, TouchableOpacity, Switch} from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ImgInova from '../../assets/images/inovaBranco.png';
import { Input } from 'react-native-elements';
import Cadastro from '../cadastro/index';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../context/auth';
import LoginProps from '../../interfaces/login';

export default function Login() {
   
    // let history = useHistory();

    // const [email, setEmail] = useState('');
    // const [senha, setSenha] = useState('');

    // const login = () => {
    //     const form = {
    //         email: email,
    //         senha: senha,
    //     };

    //     if (form.email.length === 0 || form.senha.length === 0) {
    //         Alert.alert('Preencha os campos de email e senha corretamente.');
    //     }

    //     const init = {
    //         method: 'POST',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         body: JSON.stringify(form),
    //     };

    //     // Se você estiver executando o servidor e o emulador em seu computador, 127.0.0.1:(port) fará referência ao emulador em si e não ao servidor.
    //     // O 10.0.2.2 é a solução para esse problema
    //     fetch('http://localhost:5000/api/Login', init)
    //         .then(resp => resp.json())
    //         .then(data => {

    //             // Verifica se a propriedade token é diferente de indefinida (se a propriedade existe no retorno do json)
    //             if (data.value.token !== undefined) {
    //                 AsyncStorage.setItem('token-inova', data.value.token);
    //                 // Envia (empurra) pra uma página específica
    //                 navigation.navigate('Home')
    //                 console.log(data.value.token)
    //             }
    //             else {
    //                 // Erro caso email ou senha sejam inválidos
    //                 Alert.alert('Email ou senha inválidos', data);
    //             }
    //         })
    //         .catch(erro => console.log('deu erro', erro));
    // };

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const { SignIn } = useContext(AuthContext);

    const login = async () => {
        const form: LoginProps = {
            email: email,
            senha: senha,
        };

        if (form.email.length === 0 || form.senha.length === 0) {
            return Alert.alert('Preencha os campos de email e senha corretamente.');
        }

        // Função do context que irá fazer a autenticação e retornar erro (na própria função) caso precise
        SignIn(form);
    };


    return (

        <View style={styles.containerAlign}>
            <View style={styles.backgroundImage}>
                <Image style={styles.img} source={ImgInova}></Image>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.titleText}>Login</Text>
                <TextInput style={styles.inputElement} placeholder='Email' onChangeText={(e: any) => setEmail(e)}/>
                <TextInput style={styles.inputElement} placeholder='Senha' secureTextEntry={true} onChangeText={(e: any) => setSenha(e)}/>
                <TouchableOpacity style={{
                        borderRadius: 10,
                        height: 40,
                        width: 300,
                        // box-shadow: 0px 4px 10px #0000002a,
                        marginTop: 30,
                        marginBottom: 20,  
                        backgroundColor: 'white',
                        alignItems: 'center',
                        justifyContent: 'center',
                }}
                 onPress={event => {
                     event.preventDefault();
                     login();
                }}
                // onPress={ () => navigation.navigate('Home')}
                >
                    <Text style={{
                        color: '#df2f2f',
                        fontSize: 20,
                    }}>Entrar</Text>
                </TouchableOpacity>

                {/* <TouchableOpacity>
                   <Text style={{color: 'white'}} onPress={ () => navigation.navigate('Cadastro')}>Não Possui Cadastro?</Text>
                </TouchableOpacity> */}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    containerAlign: {
        flex: 1,
        backgroundColor: '#df2f2f',
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        backgroundColor: '#df2f2f',
        width: 1242,
        flex: 1,
        alignItems: 'center',
        position: 'relative',
        bottom: 100,
    },
    img: {
        resizeMode:'contain',
        top: 200,
        width: 300,
        height: 100,
        position: 'relative',
    },
    inputContainer: {
        height: 300,
        width: '90%',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        bottom: 100,
    },
    inputElement: {
        backgroundColor: 'white',
        borderRadius: 15,
        height: 45,
        width: 300,
        shadowColor: 'black',
        paddingLeft: 15,
        marginTop: 15,
        borderBottomWidth : 0,
    },
    titleText: {
        fontSize: 30,
        fontWeight: 'normal',
        color: 'white',
        marginTop: 30,
    }
});