//Definiimos nuestro primer state
import React, {useState} from 'react';
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
} from 'react-native';

import Cita from './componentes/citas';
import Formulario from './componentes/formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(false);
  //Definir el state de citas
  const [citas, setCitas] = useState([
    {id: '1', paciente: 'Sancho', propietario: 'Mejia', sintomas: 'No come'},
    {id: '2', paciente: 'Ramiro', propietario: 'Eduardo', sintomas: 'No '},
    {
      id: '3',
      paciente: 'Juan',
      propietario: 'Luis',
      sintomas: 'No come el perro',
    },
  ]);
  //Elimina los pacientes del state
  const eliminarPaciente = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };
  //Muestra u oculta Formulario
  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };
  //Ocultar teclado
  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };
  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <View style={styles.contenedor}>
        <Text style={styles.titulo}>Consultorio Citas</Text>
        <View style={styles.container}>
          <TouchableHighlight
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
              />
            </>
          ) : (
            <>
              {citas.length > 0 ? (
                <Text style={styles.subtitulo}>Citas pendientes</Text>
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
                  <Cita item={item} eliminarPaciente={eliminarPaciente} />
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
    backgroundColor: '#f5f5f5',
    flex: 1,
  },
  container: {
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 1,
  },
  titulo: {
    color: '#e7305b',
    textAlign: 'center',
    marginTop: Platform.OS === 'android' ? 10 : 20,
    marginBottom: 5,
    fontSize: 28,
    fontWeight: 'bold',
  },
  subtitulo: {
    color: '#ff9a76',
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
    backgroundColor: '#e7305b',
    marginVertical: 5,
    borderRadius: 10,
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
