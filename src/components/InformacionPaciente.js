import React from 'react';
import { Text, SafeAreaView, Pressable, View, StyleSheet } from 'react-native';
import { FormatearFecha } from './../helpers/index';

const InformacionPaciente = ({ PacienteSeleccionado, setModalPaciente, setPacienteSeleccionado }) => {

  console.log(PacienteSeleccionado);

  return (
    <SafeAreaView
      style={ styles.contenedor }
    >
    
        <Text style={ styles.titulo }>Informacion {''}
          <Text style={ styles.tituloBold }>Paciente</Text>
        </Text>

        <View>
          <Pressable
          style={ styles.btnCerrar }
            onLongPress={ () => {
              setModalPaciente(false);
              setPacienteSeleccionado({});
            } }
          >
            <Text style={ styles.btnCerrarTexto  }>Manten para salir</Text>
          </Pressable>
        </View>

        <View style={ styles.contenido }>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Nombre:</Text>
            <Text style={ styles.valor }>{ PacienteSeleccionado.paciente }</Text>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Propietario:</Text>
            <Text style={ styles.valor }>{ PacienteSeleccionado.propietario }</Text>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Email:</Text>
            <Text style={ styles.valor }>{ PacienteSeleccionado.email }</Text>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Telefono:</Text>
            <Text style={ styles.valor }>{ PacienteSeleccionado.telefono }</Text>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Fecha Alta:</Text>
            <Text style={ styles.valor }>{ FormatearFecha(PacienteSeleccionado.fecha) }</Text>
          </View>

          <View style={ styles.campo }>
            <Text style={ styles.label }>Sintomas:</Text>
            <Text style={ styles.valor }>{ PacienteSeleccionado.sintomas }</Text>
          </View>

        </View>

    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  contenedor: {
    backgroundColor: '#f5930d',
    flex: 1,
  },
  titulo: {
      fontSize: 30,
      fontWeight: '600',
      textAlign: 'center',
      marginTop: 30,
      color: '#fff'
  },
  tituloBold: {
      fontWeight: '900'
  },
  btnCerrar: {
      marginVertical: 30,
      marginHorizontal: 30,
      backgroundColor: '#e06900',
      padding: 20,
      borderRadius: 10
  },
  btnCerrarTexto: {
      color: '#fff',
      textAlign: 'center',
      fontWeight: '900',
      fontSize: 16,
      textTransform: 'uppercase'
  },
  contenido: {
    backgroundColor: '#fff',
    marginHorizontal: 30,
    borderRadius: 10,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
   campo: {
    marginBottom: 10
   },
   label: {
    textTransform: 'uppercase',
    color: '#374151',
    fontWeight: '600',
    fontSize: 12
   },
   valor: {
    fontWeight: '700',
    fontSize: 20,
    color: '#334155'
   }
})

export default InformacionPaciente;