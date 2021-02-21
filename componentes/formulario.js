import React, {useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  Alert,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Plattform
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
// import shortid from 'shortid';
const Formulario = ({citas, setCitas, guardarMostrarForm,guardarCitasStorage}) => {
  const [candidato, guardarCandidato] = useState('');
  const [area, guardarArea] = useState('');
  const [edad, guardarEdad] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [nota, guardarNota] = useState('');
  const [reclutador, guardarReclutador] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };
  const confirmarFecha = date => {
    const opcionesFecha = {year: 'numeric', month: 'long', day: '2-digit'};
    guardarFecha(date.toLocaleDateString('es-ES', opcionesFecha));
    hideDatePicker();
  };
  //Muestra u oculta la hora
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };
  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };
  const confirmarHora = hora => {
    const opcionesHora = {hour: 'numeric', minute: '2-digit'};
    guardarHora(hora.toLocaleTimeString('es-ES', opcionesHora));
    hideTimePicker();
  };
  const onPress = () => {};
  //Crear nueva cita
  const crearNuevaCita = () => {
    //Validar formulario
    if (
      candidato.trim() === '' ||
      area.trim() === '' ||
      edad.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      reclutador.trim() === '' ||
      nota.trim() === ''
    ) {
      //Datos Incompletos Falla la validación
      mostrarAlerta();
      return;
    }
    //Crear una nueva cita
    const cita = {candidato,area, edad, telefono, fecha, hora, nota, reclutador};
    cita.id = shortid.generate();

    //Agregar al state
    const nuevaCita = [...citas, cita];
    setCitas(nuevaCita);
    //Pasar las nuevas citas al AsyncStorage
    guardarCitasStorage(JSON.stringify(nuevaCita))
    //Ocultar el formulario
    guardarMostrarForm(false);
    //Limpiar campos del formulario
    guardarCandidato('');
    guardarArea('');
    guardarEdad('');
    guardarTelefono('');
    guardarFecha('');
    guardarHora('');
    guardarNota('');
    guardarReclutador('');

  };
  //Mostrar alerta si falla la validación
  const mostrarAlerta = () => {
    //Error =titulo, cuerpo=mensaje
    Alert.alert(
      'Error',
      'Todos los campos son obligarorios',
      [
        {
          text: 'OK', //Arreglo de botones
        },
      ],
    );
  };
  //Ocultar el taclado 
  const cerrarTeclado= () => {
    Keyboard.dismiss();
  }

  return (
    <>
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()} >
      <ScrollView style={styles.formulario}>
      <Text style={styles.titulito}>Datos generales del candidato</Text>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Nombre del candidato"
            onChangeText={texto => guardarCandidato(texto)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Area de la vacante"
            onChangeText={texto => guardarArea(texto)}
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Edad"
            onChangeText={texto => guardarEdad(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder="Telefono o celular"
            onChangeText={texto => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <TextInput
            multiline
            style={styles.input}
            placeholder="Nota"
            onChangeText={texto => guardarNota(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button
            title="Seleccionar fecha"
            onPress={showDatePicker}
            color="#4267b2"
          />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={confirmarFecha}
            onCancel={hideDatePicker}
            locale="es_Es"
          />
          <Text>{fecha}</Text>
        </View>
        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button
            title="Seleccionar hora"
            onPress={showTimePicker}
            color="#4267b2"
          />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={confirmarHora}
            onCancel={hideTimePicker}
            locale="es_Es"
            headerTextIOS="Elige una hora"
            cancelTextIOS="Cancelar"
            confirmTextIOS="Confirmar"
            color="red"
            //is24Hour
          />
          <Text>{hora}</Text>
        </View>
        <View>
          <TextInput
            style={styles.input}
            placeholder=" Nombre del reclutador"
            onChangeText={texto => guardarReclutador(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            underlayColor={'#d9455f'}
            onPress={onPress}
            onPress={() => crearNuevaCita()}
            style={styles.btnGuardar}>
            <Text style={styles.textGuardar}>Guardar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
      </TouchableWithoutFeedback>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: 'white',
    borderRadius: 5,
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 12,
    marginTop: 20,
    color: '#4267b2',
  },
  titulito:{
    textAlign: 'center',
    color: '#4267b2',
    fontWeight: 'bold',
    fontSize: 15,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 25,
    borderColor: '#eeeded',
    marginVertical: 15,
  },
  btnGuardar: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#ff5a66',
    marginVertical: 35,
    borderRadius: 25,
  },
  textGuardar: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Formulario;
