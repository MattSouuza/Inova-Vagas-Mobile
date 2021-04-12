import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Image, TextInput, Button, TouchableOpacity, Switch, } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Menu from '../../components/menu/index';
import ImgVaga from '../../assets/images/maleta_Vermelha.png';
import { color } from 'react-native-reanimated';
import parseJwt from '../../services/tokenDecoder';

export default function Home({ navigation = useNavigation() }) {

    const [idVaga, setIdVaga] = useState(0);
    const [vaga, setVaga] = useState('');

    const [vagas, setVagas] = useState([]);

    const [idAluno, setIdAluno] = useState(0);

    React.useEffect(() => {
        listar();
        GetTokenId().then(id => {
            setIdAluno(id!);
        })
    }, []);

    const GetTokenId = async () => {
        const response = await AsyncStorage.getItem('token-inova');
        return (parseJwt(response!)?.Id);
    }

    const listar = () => {
        fetch('http://localhost:5000/api/Vaga', {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + AsyncStorage.getItem('token-inova')
            }
        })
            .then(response => response.json())
            .then(dados => {
                setVagas(dados);
                console.log('' + vagas)

            })
            .catch(err => console.error('Ocorreu um erro:', err));
    }

    const visualizarVaga = (id: number) => {

        fetch('http://localhost:5000/api/Vaga/' + id, {
            method: 'GET',
            headers: {
                authorization: 'Bearer ' + AsyncStorage.getItem('token-inova')
            }
        })
            .then(resp => resp.json())
            .then(dados => {
                setIdVaga(dados.idVaga);
                console.log(id);
                // localStorage.setItem( 'IdVaga', String(idVaga))
                navigation.navigate(`/visualizarVaga?id=${id}`)
            })
            .catch(err => console.error(err));
    }

    const candidatar = (idVaga: number, idAluno: number) => {
        const candidatoForm = {
            idAluno: idAluno,
            idVaga: idVaga
        }

        fetch('http://localhost:5000/api/Candidatura', {
            method: 'POST',
            body: JSON.stringify(candidatoForm),
            headers: {
                'content-type': 'application/json',
                authorization: 'Bearer ' + localStorage.getItem('token-inova')
            }
        })
            .then(resp => {
                if (resp.status === 200) {
                    alert('Candidatura efetuada');
                    navigation.navigate('Minhas Candidaturas');
                }
                else {
                    alert('Houve um erro ao candidatar-se');
                }
            })
    }

    return (
        <View style={{ backgroundColor: '#EEEEEE' }}>
            <Menu navigation={navigation} />

            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginVertical: 25 }}>Vagas Disponíveis</Text>
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

                                <TouchableOpacity style={{
                                    borderRadius: 10,
                                    height: 40,
                                    width: 300,
                                    // box-shadow: 0px 4px 10px #0000002a,
                                    marginTop: 30,
                                    marginBottom: 20,
                                    backgroundColor: '#df2f2f',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    position: 'relative',
                                    left: 16
                                }}
                                    onPress={event => {
                                        event.preventDefault();
                                        candidatar(item.idVaga, idAluno);
                                    }}
                                // onPress={ () => navigation.navigate('Home')}
                                >
                                    <Text style={{
                                        color: 'white',
                                        fontSize: 20,
                                    }}>Candidatar-se</Text>
                                </TouchableOpacity>
                            </View>


                        );
                    })
                }
            </Text>

        </View>
    );
}

const styles = StyleSheet.create({
    title: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#df2f2f',
        marginTop: 20,
        marginBottom: 5
    }
})