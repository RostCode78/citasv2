import React, { useState, useEffect } from 'react';
import {SafeAreaView, Modal, Text, StyleSheet, TextInput, View, ScrollView, Pressable, Alert } from 'react-native';
import DatePicker from 'react-native-date-picker';

const Formulario = ({
    modalVisible, 
    setModalVisible, 
    pacientes, 
    setPacientes, 
    pacienteSeleccionado, 
    setPacienteSeleccionado
}) => {

    const [ paciente, setPaciente ] = useState("");
    const [ id, setId ] = useState("");
    const [ propietario, setPropietario ] = useState("");
    const [ email, setEmail ] = useState("");
    const [ telefono, setTelefono ] = useState("");
    const [ fecha, setFecha ] = useState( new Date() );
    const [ sintomas, setSintomas ] = useState("");

    useEffect( () => {
        if ( Object.keys(pacienteSeleccionado).length > 0 ) {
            setId(pacienteSeleccionado.id);
            setPaciente(pacienteSeleccionado.paciente);
            setPropietario(pacienteSeleccionado.propietario);
            setEmail(pacienteSeleccionado.email);
            setTelefono(pacienteSeleccionado.telefono);
            setFecha(pacienteSeleccionado.fecha);
            setSintomas(pacienteSeleccionado.sintomas);
        }
    }, [pacienteSeleccionado]);

    const handleNuevaCita = () => {
        // Validar
        if([paciente, propietario, email, fecha, sintomas].includes('')) {
            Alert.alert(
                'Error',
                'Todos los campos son obligatorios',
                // [{text: 'Recordarme mas tarde'}, {text: 'Cancelar', style: 'cancel'}, {text: 'Ok'}]
            );
            return
        }

        const NuevoPaciente = {
            id: Date.now(),
            paciente,
            propietario,
            email,
            telefono,
            fecha,
            sintomas
        }

        // Revisar si es un registro nuevo o edicion
        if ( id ) {
            // Editado
            NuevoPaciente.id = id;

            const PacientesActualizados = pacientes.map( PacienteState => PacienteState.id === NuevoPaciente.id ? NuevoPaciente : PacienteState );

            setPacientes(PacientesActualizados);
            setPacienteSeleccionado({});

        } else {
            // Nuevo Registro
            pacienteSeleccionado.id = Date.now();
            setPacientes([ ...pacientes, NuevoPaciente ]);
        }

        setModalVisible(!modalVisible);

        setId("");
        setPaciente("");
        setPropietario("");
        setEmail("");
        setTelefono("");
        setFecha( new Date() );
        setSintomas("");
    }

  return (
    <Modal animationType="slide" visible={modalVisible}>
      <SafeAreaView style={styles.contenido}>

        <ScrollView>

            <Text
                style={styles.titulo}
            >{ pacienteSeleccionado.id ? "Editar" : "Nueva" } {''}
                <Text style={styles.tituloBold}>Cita</Text>
            </Text>

            <Pressable 
                style={ styles.btnCancelar }
                onLongPress={() => {
                    setModalVisible(!modalVisible);
                    setPacienteSeleccionado({});
                    setId("");
                    setPaciente("");
                    setPropietario("");
                    setEmail("");
                    setTelefono("");
                    setFecha( new Date() );
                    setSintomas("");
                }}
            >
                <Text style={ styles.btnCancelarTexto }>Manten para cerrar</Text>
            </Pressable>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Paciente</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre Paciente'
                    placeholderTextColor={'#666'}
                    value={paciente}
                    onChangeText={setPaciente}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Nombre Propietario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Nombre Propietario'
                    placeholderTextColor={'#666'}
                    value={propietario}
                    onChangeText={setPropietario}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Email Propietario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Email Propietario'
                    placeholderTextColor={'#666'}
                    keyboardType='email-address'
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Telefono Propietario</Text>
                <TextInput
                    style={styles.input}
                    placeholder='Telefono Propietario'
                    placeholderTextColor={'#666'}
                    keyboardType='number-pad'
                    value={telefono}
                    onChangeText={setTelefono}
                    maxLength={10}
                />
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Fecha Alta</Text>

                <View style={ styles.fechaContenedor }>
                    <DatePicker
                        date={fecha}
                        locale='es'
                        mode='date'
                        textColor='#666'
                        onDateChange={ (date) => setFecha(date) }
                    />
                </View>
            </View>

            <View style={styles.campo}>
                <Text style={styles.label}>Sintomas</Text>
                <TextInput
                    style={[styles.input, styles.sintomasInput]}
                    placeholder='Sintomas Paciente'
                    placeholderTextColor={'#666'}
                    value={sintomas}
                    onChangeText={setSintomas}
                    multiline={true}
                    numberOfLines={4}
                    textAlignVertical={'top'}
                />
            </View>

            <Pressable
                style={styles.btnNuevaCita}
                onPress={ () => handleNuevaCita() }
            >
                <Text style={styles.btnNuevaCitaTexto}>{ pacienteSeleccionado.id ? "Guardar Cambios" : "Agregar Paciente" }</Text>
            </Pressable>

        </ScrollView>

      </SafeAreaView>
    </Modal>
  )
}

const styles = StyleSheet.create({
    contenido: {
        backgroundColor: '#6F28D9',
        flex: 1
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
    btnCancelar: {
        marginVertical: 30,
        marginHorizontal: 30,
        backgroundColor: '#5827a4',
        padding: 20,
        borderRadius: 10
    },
    btnCancelarTexto: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    },
    campo: {
        marginTop: 10,
        marginHorizontal: 30,
    },
    label: {
        color: '#fff',
        marginBottom: 10,
        marginTop: 15,
        fontSize: 20,
        fontWeight: '600'
    },
    input: {
        backgroundColor: '#fff',
        padding: 15,
        borderRadius: 10,
        marginBottom: 5,
        color: '#303030'
    },
    sintomasInput: {
        height: 100,
    },
    fechaContenedor: {
        backgroundColor: '#fff',
        borderRadius: 10,
        color: '#303030',
        justifyContent: "center"
    },
    btnNuevaCita: {
        marginVertical: 50,
        backgroundColor: '#f59e0b',
        paddingVertical: 15,
        marginHorizontal: 30,
        borderRadius: 10
    },
    btnNuevaCitaTexto: {
        color: '#fff',
        textAlign: 'center',
        fontWeight: '900',
        fontSize: 16,
        textTransform: 'uppercase'
    }
})

export default Formulario;