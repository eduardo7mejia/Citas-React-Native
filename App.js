//Definiimos nuestro primer state
import React, {useState,useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Image,
  Platform,
  StatusBar,
} from 'react-native';
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faPaw } from "@fortawesome/free-solid-svg-icons";

import Cita from './componentes/citas';
import Formulario from './componentes/formulario';
import AsyncStorage from '@react-native-community/async-storage';

const App = () => {
    //Definir el state de citas
    const [citas, setCitas] = useState([]);

  const onPress = () => {};
  const [mostrarForm, guardarMostrarForm] = useState(false);

  // Uso de useEffect
  useEffect(() => {
    const obtenerCitasStorage = async () => {
      try {
        const citasStorage = await AsyncStorage.getItem('citas');
        if (citasStorage) {
          setCitas(JSON.parse(citasStorage))
        } else {
          
        }
      } catch(error){
        console.log(error);
      }
    }
    obtenerCitasStorage();
  }, []);



  //Elimina los candidatos del state
  const eliminarCandidato = id => {
    const citasFiltradas = citas.filter(cita => cita.id !== id);
    setCitas(citasFiltradas);
    guardarCitasStorage(JSON.stringify(citasFiltradas));
  };
  //Muestra u oculta Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };
  //Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  // Almacenar las citas en el storage 
  const guardarCitasStorage = async (citasJSON) => {
    try {
      await AsyncStorage.setItem('item', citasJSON);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <StatusBar
          barStyle="light-content"
          hidden={false}
          backgroundColor="#ff5a66"
        />
        <Text style={styles.titulo}> V E N G A L A </Text>
        <View style={styles.container}>
          <TouchableHighlight
            underlayColor={'#d9455f'}
            onPress={onPress}
            onPress={() => mostrarFormulario()}
            style={styles.btnMostrarForm}>
            <Text style={styles.textoMostrarForm}>
              {mostrarForm ? 'Cancelar cita' : 'Crear cita'}
            </Text>
          </TouchableHighlight>
        </View>
        <View style={styles.contenido}>
          {mostrarForm ? (
            <>
              <Formulario
                citas={citas}
                setCitas={setCitas}
                guardarMostrarForm={guardarMostrarForm}
                guardarCitasStorage={guardarCitasStorage}
              />
            </>
          ) : (
            <>
              {citas.length > 0 ? (
                <Text style={styles.subtitulo}>Agenda</Text>
              ) : (
                <>
                  <Text style={styles.subtitulo}>Crea tu primera cita</Text>
                  <Image
                    style={styles.imagen}
                    source={require('./componentes/images/Schedule-rafiki.png')}
                  />
                </>
              )
              // 'Citas Pendientes'
              // : 'No hay citas, Agrega una'
              }
              <FlatList
                style={styles.listado}
                data={citas}
                renderItem={({item}) => (
                  <Cita item={item} eliminarCandidato={eliminarCandidato} />
                )}
                keyExtractor={cita => cita.id}
              />
            </>
          )}
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#ffffff',
    flex: 1,
  },
  container: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 1,
  },
  titulo: {
    color: '#ff5a66',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 20,
    marginBottom: 5,
    fontSize: 40,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#4267b2',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 20,
    marginBottom: 5,
    fontSize: 18,
    fontWeight: 'bold',
  },
  contenido: {
    flex: 1,
    marginHorizontal: '2.5%',
  },
  listado: {
    flex: 1,
  },
  btnMostrarForm: {
    marginTop: 10,
    padding: 10,
    backgroundColor: '#ff5a66',
    marginVertical: 10,
    borderRadius: 25,
    alignItems: 'center',
  },
  textoMostrarForm: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  imagen: {
    marginTop: 100,
    flexGrow: 1,
    height: null,
    width: null,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
