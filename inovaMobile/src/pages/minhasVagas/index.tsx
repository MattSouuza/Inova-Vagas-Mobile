import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import ImgVaga from '../../assets/images/maleta_Vermelha.png';
import Menu from '../../components/menu';
import parseJwt from '../../services/tokenDecoder';

export default function MinhasVagas({ navigation = useNavigation() }) {

    const [idVaga, setIdVaga] = useState(0);
    const [vaga, setVaga] = useState('');
    
    const [idAluno, setIdAluno] = useState(0); 

    const [vagas, setVagas] = useState([]);



    React.useEffect(() => {
        GetTokenId().then(id => {
            listar(id!);
            setIdAluno(id!);
        })
    }, []);


    const GetTokenId = async () => {
        const response = await AsyncStorage.getItem('token-inova');
        return (parseJwt(response!)?.Id);
    }

    const listar = (id: number) => {
        fetch('http://localhost:5000/api/Candidatura/aluno/' + id, {
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

    
    

    return (
        <View style={{ backgroundColor: '#EEEEEE' }}>
            <Menu navigation={navigation} />

            <Text style={{ textAlign: 'center', fontSize: 30, fontWeight: 'bold', marginVertical: 25 }}>Minhas Candidaturas</Text>
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
                                    <View style={{ display: 'flex', flexDirection: 'row', alignContent: 'center' }}>
                                        <Text style={{ marginVertical: 10, fontWeight: 'bold', color: '#df2f2f', fontSize: 16 }}>{item.idVagaNavigation.nomeVaga}</Text>
                                        <Image source={ImgVaga} style={{ resizeMode: 'contain', position: 'relative', top: 10, left: 10, width: 20, height: 20 }} />
                                    </View>

                                    <View>
                                        <Text style={{ fontSize: 16 }}>{item.idVagaNavigation.numeroCandidatos}</Text>
                                    </View>

                                </View>
                                <Text style={{ marginTop: 10, marginBottom: 25, fontSize: 25 }}>{item.idVagaNavigation.idEmpresaNavigation.nomeFantasia}</Text>
                                <Text style={{ fontSize: 16 }}>{item.idVagaNavigation.salario}</Text>



                                <Text style={styles.title}>Descrição</Text>
                                <Text>{item.idVagaNavigation.descricao}</Text>

                                <Text style={styles.title}>Requisitos</Text>
                                <Text>{item.idVagaNavigation.requisitos}</Text>

                                <Text style={styles.title}>Endereço</Text>
                                <Text style={{ marginBottom: 20 }}>{item.idVagaNavigation.endereco}</Text>

                                
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
        color: '#df2f2f',
        marginTop: 20,
        marginBottom: 5
    }
})