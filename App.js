import React, {useEffect, useState} from 'react';
import {SafeAreaView, Text, StyleSheet, Pressable, FlatList, Alert, Modal} from 'react-native';
import Formulario from './src/components/Formulario';
import Paciente from './src/components/Paciente';
import InformacionPaciente from './src/components/InformacionPaciente';

const App = () => {
  // Los hooks se colocan en la parte superior
  const [modal_visible, setModalVisible] = useState(false);
  const [ pacientes, setPacientes ] = useState([]);
  const [ paciente_seleccionado, setPacienteSeleccionado ] = useState({});
  const [ modalPaciente, setModalPaciente ] = useState(false);

  const PacienteEditar = (id) => {
    const PacienteSeleccionado = pacientes.filter(paciente => paciente.id === id );
    setPacienteSeleccionado(PacienteSeleccionado[0]);
  }

  /*=========================
  =    ELIMINAR PACIENTE    =
  =========================*/

  const PacienteEliminar = id => {
    Alert.alert(
      'Deseas eliminar este paciente?',
      'Un paciente eliminado no se puede recuperar',
      [
        { 
          text: 'Cancelar'
        },
        {
          text: 'Si, Eliminar', 
          onPress: () => {
            const PacientesActualizados = pacientes.filter( pacienteState => pacienteState.id !== id );

            setPacientes(PacientesActualizados);
          }
        }
      ]
    )
  }

  /*====================
  =    CERRAR MODAL    =
  ====================*/

  const CerrarModal = () => {
    setModalVisible(false);
  }

  return (
    <SafeAreaView style={styles.container}>

      <Text style={styles.titulo}>
        Administrador de citas {''}
        <Text style={styles.tituloBold}>Veterinaria</Text>
      </Text>

      <Pressable onPress={() => {
        setModalVisible(!modal_visible);
        setPacienteSeleccionado({});
      }} style={styles.btnNuevaCita}>
        <Text style={styles.btnTextoNuevaCita}>Nueva Cita</Text>
      </Pressable>

      { pacientes.length === 0 
      ? 
        <Text style={ styles.noPacientes }>No hay pacientes</Text> 
      : 
        <FlatList
          style={ styles.listado }
          data={ pacientes }
          keyExtractor={ (item) => item.id }
          renderItem={({item}) => {
            return(
              <Paciente
                item={item}
                setModalVisible={setModalVisible}
                PacienteEditar={PacienteEditar}
                PacienteEliminar={PacienteEliminar}
                setModalPaciente={setModalPaciente}
                setPacienteSeleccionado={setPacienteSeleccionado}
              />
            )
          }}
        />
      }

      { modal_visible && (
        <Formulario
          modalVisible={modal_visible}
          CerrarModal={CerrarModal}
          pacientes={pacientes}
          setPacientes={setPacientes}
          pacienteSeleccionado={paciente_seleccionado}
          setPacienteSeleccionado={setPacienteSeleccionado}
        />
      )}

      <Modal
        visible={ modalPaciente }
        animationType='fade'
      >
        <InformacionPaciente
          setPacienteSeleccionado={setPacienteSeleccionado}
          PacienteSeleccionado={paciente_seleccionado}
          setModalPaciente={setModalPaciente}
        />
      </Modal>
      
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#f3f4f6',
    flex: 1,
  },
  titulo: {
    textAlign: 'center',
    fontSize: 30,
    color: '#374151',
    fontWeight: '600',
  },
  tituloBold: {
    fontWeight: '900',
    color: '#6d28d9',
  },
  btnNuevaCita: {
    backgroundColor: '#6d28d9',
    padding: 15,
    marginTop: 30,
    marginHorizontal: 20,
    borderRadius: 10,
  },
  btnTextoNuevaCita: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 20,
    fontWeight: '900',
    textTransform: 'uppercase',
  },
  noPacientes: {
    marginTop: 40,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 600,
    color: '#374151'
  },
  listado: {
    marginTop: 50,
    marginHorizontal: 30
  }
});

export default App;
