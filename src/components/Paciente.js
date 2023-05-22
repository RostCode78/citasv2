import React from 'react';
import { Text, View, StyleSheet, Pressable } from 'react-native';
  

const Paciente = ({ item, setModalVisible, PacienteEditar, PacienteEliminar }) => {

    const { paciente, fecha, id } = item;

    const FormatearFecha = (fecha) => {
        const NuevaFecha = new Date(fecha);

        return NuevaFecha.toLocaleDateString('es-ES', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    }

    return (
        <View style={ styles.contenedor}>
            <Text style={styles.label}>Paciente:</Text>
            <Text style={styles.texto}>{paciente}</Text>
            <Text style={styles.fecha}>{FormatearFecha(fecha)}</Text>

            <View style={ styles.contenedorBotones }>
                <Pressable
                    style={[ styles.btn, styles.btnEditar ]}
                    onLongPress={ () => {
                        setModalVisible(true);
                        PacienteEditar(id);
                    } }
                >
                    <Text style={ styles.btnTexto }>Editar</Text>
                </Pressable>

                <Pressable
                    style={[ styles.btn, styles.btnEliminar ]}
                    onLongPress={ () => {
                        PacienteEliminar(id);
                    }}
                >
                    <Text style={ styles.btnTexto }>Eliminar</Text>
                </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    contenedor: {
        backgroundColor: '#fff',
        padding: 20,
        borderBottomColor: '#94a3b8',
        borderBottomWidth: 1
    },
    label: {
        color: '#374152',
        textTransform: 'uppercase',
        fontWeight: '700',
        marginBottom: 10
    },
    texto: {
        color: '#6d28d9',
        fontSize: 24,
        fontWeight: '700',
        marginBottom: 10
    },
    fecha: {
        color: '#374152',
    },
    contenedorBotones: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20
    },
    btn: {
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 5
    },
    btnEditar: {
        backgroundColor: '#f59e0b'
    },
    btnEliminar: {
        backgroundColor: '#ef4444'
    },
    btnTexto: {
        textTransform: 'uppercase',
        fontWeight: '700',
        fontSize: 12,
        color: '#FFF'
    }
})

export default Paciente;