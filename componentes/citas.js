/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarPaciente}) => {
  const dialogoEliminar = id => {
    console.log('Eliminado...', id);
    eliminarPaciente(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Paciente:</Text>
        <Text style={styles.texto}>{item.paciente}</Text>
      </View>
      <View>
        <Text style={styles.label}>Propietario:</Text>
        <Text style={styles.texto}>{item.propietario}</Text>
      </View>
      <View>
        <Text style={styles.label}>Sintomas:</Text>
        <Text style={styles.texto}>{item.sintomas}</Text>
      </View>
      <View>
        <TouchableHighlight
          onPress={() => dialogoEliminar(item.id)}
          style={styles.btnEliminar}>
          <Text style={styles.textEliminar}> Eliminar &times; </Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  cita: {
    backgroundColor: 'white',
    borderBottomColor: '#e2979c',
    borderStyle: 'solid',
    borderBottomWidth: 1,
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    color: '#9bdeac',
  },
  texto: {
    fontSize: 18,
    color: '#535c68',
  },
  btnEliminar: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ff847c',
    backgroundColor: 'transparent',
  },
  textEliminar: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Cita;
