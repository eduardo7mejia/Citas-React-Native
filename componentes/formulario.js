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
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';
// import shortid from 'shortid';
const Formulario = ({citas, setCitas, guardarMostrarForm}) => {
  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');
  const [sintomas, guardarSintomas] = useState('');

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
    hideDatePicker();
    guardarFecha(date.toLocaleDateString('es-ES', opcionesFecha));
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
    hideTimePicker();
    guardarHora(hora.toLocaleTimeString('en-US', opcionesHora));
  };
  //Crear nueva cita
  const crearNuevaCita = () => {
    //Validar formulario
    if (
      paciente.trim() === '' ||
      propietario.trim() === '' ||
      telefono.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === '' ||
      sintomas.trim() === ''
    ) {
      //Datos Incompletos Falla la validación
      mostrarAlerta();
      return;
    }
    //Crear una nueva cita
    const cita = {paciente, propietario, telefono, fecha, hora, sintomas};
    cita.id = shortid.generate();
    //console.log(cita);
    //Agregar al state
    console.log('Creando nueva cita');
    //Agregar al state
    const nuevaCita = [...citas, cita];
    setCitas(nuevaCita);
    //Ocultar el formulario
    guardarMostrarForm(false);
    //Limpiar campos del formulario
  };
  //Mostrar alerta si faalla la validación
  const mostrarAlerta = () => {
    //Error =titulo, cuerpo=mensaje
    Alert.alert(
      'Error',
      'No seas tonto,faltan campos por llenar hijo de la verdura',
      [
        {
          text: 'OK', //Arreglo de botones
        },
      ],
    );
  };

  return (
    <>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Doctor:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
          />
        </View>
        <View>
          <Text style={styles.label}>Telefono:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
            keyboardType="numeric"
          />
        </View>
        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button
            title="Seleccionar fecha"
            onPress={showDatePicker}
            color="#9bdeac"
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
            color="#9bdeac"
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
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
          />
        </View>
        <View>
          <TouchableHighlight
            onPress={() => crearNuevaCita()}
            style={styles.btnGuardar}>
            <Text style={styles.textGuardar}>Guardar</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </>
  );
};
const styles = StyleSheet.create({
  formulario: {
    backgroundColor: 'white',
    borderRadius: 10,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
    color: '#535c68',
  },
  input: {
    marginTop: 10,
    height: 50,
    borderWidth: 1,
    borderStyle: 'solid',
    borderRadius: 9,
    borderColor: '#9bdeac',
  },
  btnGuardar: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#e7305b',
    marginVertical: 5,
    borderRadius: 5,
  },
  textGuardar: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
export default Formulario;
