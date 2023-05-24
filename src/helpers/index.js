export const FormatearFecha = (fecha) => {
    const NuevaFecha = new Date(fecha);

    return NuevaFecha.toLocaleDateString('es-ES', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}