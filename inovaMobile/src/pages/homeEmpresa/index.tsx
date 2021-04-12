import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Switch, Alert } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../../components/menu';
import parseJwt from '../../services/tokenDecoder'
import ImgVaga from '../../assets/images/maleta_Vermelha.png';

import jwtDecode from 'jwt-decode';

export default function Home({ navigation = useNavigation() }) {

    const [idVaga, setIdVaga] = useState(0);
    const [vaga, setVaga] = useState('');
    const [idEmpresa, setIdEmpresa] = useState(0);

    const [vagas, setVagas] = useState([]);



    React.useEffect(() => {
        // // parseJwt().then(token => {
        // listar(GetTokenUser().then());
        GetTokenUser().then(id => {
            listarVagaPorEmpresa(id!);
        })
    }, []);


    const GetTokenUser = async () => {
        const response = await AsyncStorage.getItem('token-inova');

        return (parseJwt(response!)?.jti);

        // checkUserLogged(response);
    }

    const listarVagaPorEmpresa = (id: number) => {
        fetch('http://localhost:5000/api/Vaga/empresa/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + AsyncStorage.getItem('token-inova')
            }
        })
            .then(resp => resp.json())
            .then(dados => {
                setVagas(dados);
                console.log(vagas);
            })
            .catch(err => console.error(err));
    }

    // const visualizarVaga = (id: number) => {

    //     fetch('http://localhost:5000/api/Vaga/' + id, {
    //         method: 'GET',
    //         headers: {
    //             authorization: 'Bearer ' + AsyncStorage.getItem('token-maisVagas')
    //         }
    //     })
    //         .then(resp => resp.json())
    //         .then(dados => {
    //             setIdVaga(dados.idVaga);
    //             console.log(id);
    //             // localStorage.setItem( 'IdVaga', String(idVaga))
    //             navigation.navigate(`/visualizarVaga?id=${id}`)
    //         })
    //         .catch(err => console.error(err));
    // }

    return (
        <View style={{ backgroundColor: '#EEEEEE' }}>
            <Menu navigation={navigation} />

            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginVertical: 25 }}>Minhas Vagas Postadas</Text>
            <Text style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                {
                    vagas.map((item: any) => {
                        return (
                            <View style={{
                                marginVertical: 25,
                                backgroundColor: 'white',
                                borderRadius: 20,
                                padding: 20,
                                width: 380
                            }}>
                                <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                                    <Text style={{ marginVertical: 10, fontWeight: 'bold', color: '#df2f2f', fontSize: 16 }}>{item.nomeVaga}</Text>
                                    <Image source={ImgVaga} style={{ resizeMode: 'contain', position: 'relative', top: 10, left: 10, width: 20, height: 20 }} />
                                </View>
                                <Text style={{ marginTop: 10, marginBottom: 25, fontSize: 25 }}>{item.idEmpresaNavigation.nomeFantasia}</Text>
                                <Text style={{ fontSize: 16 }}>{item.salario}</Text>



                                <Text style={styles.title}>Descrição</Text>
                                <Text>{item.descricao}</Text>

                                <Text style={styles.title}>Requisitos</Text>
                                <Text>{item.requisitos}</Text>

                                <Text style={styles.title}>Endereço</Text>
                                <Text style={{ marginBottom: 20 }}>{item.endereco}</Text>

                                
                            </View>
                        );
                    })}
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#DA251C',
        marginTop: 20,
        marginBottom: 5
    }
})