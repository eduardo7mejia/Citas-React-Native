/* eslint-disable prettier/prettier */
import React from 'react';
import {Text, View, StyleSheet, TouchableHighlight} from 'react-native';

const Cita = ({item, eliminarCandidato}) => {
  const dialogoEliminar = id => {
    console.log('Eliminado...', id);
    eliminarCandidato(id);
  };
  return (
    <View style={styles.cita}>
      <View>
        <Text style={styles.label}>Candidato:</Text>
        <Text style={styles.texto}>{item.candidato}</Text>
      </View>
      <View>
        <Text style={styles.label}>Area:</Text>
        <Text style={styles.texto}>{item.area}</Text>
      </View>
      <View>
        <Text style={styles.label}>Edad:</Text>
        <Text style={styles.texto}>{item.edad}</Text>
      </View>
      <View>
        <Text style={styles.label}>Telefono:</Text>
        <Text style={styles.texto}>{item.telefono}</Text>
      </View>
      <View>
        <Text style={styles.label}>Fecha:</Text>
        <Text style={styles.texto}>{item.fecha}</Text>
      </View>
      <View>
        <Text style={styles.label}>Hora:</Text>
        <Text style={styles.texto}>{item.hora}</Text>
      </View>
      <View>
        <Text style={styles.label}>Nota:</Text>
        <Text style={styles.texto}>{item.nota}</Text>
      </View>
      <View>
        <Text style={styles.label}>Reclutador:</Text>
        <Text style={styles.texto}>{item.reclutador}</Text>
      </View>
      <View>
        <TouchableHighlight
        activeOpacity={0.6}
          underlayColor={'#4267b2'}
          // onPress={onPress}
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
    color: '#4267b2',
  },
  texto: {
    fontSize: 18,
    color: '#535c68',
  },
  btnEliminar: {
    padding: 10,
    marginVertical: 5,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#4267b2',
    backgroundColor: 'transparent',
  },
  textEliminar: {
    fontSize: 16,
    color: '#4267b2',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Cita;
