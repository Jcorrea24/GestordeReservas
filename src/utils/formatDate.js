// formatea una fecha para mostrarla bonito en las tarjetas
export function formatearFecha(fechaString) {
    if (!fechaString) return 'Sin fecha'

    const fecha = new Date(fechaString)

    // si la fecha no es valida retorno el string tal cual
    if (isNaN(fecha.getTime())) return fechaString

    return fecha.toLocaleString('es-CO', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
    })
}

// para el input datetime-local necesito el formato correcto
export function fechaParaInput(fechaString) {
    if (!fechaString) return ''
    const fecha = new Date(fechaString)
    if (isNaN(fecha.getTime())) return ''
    // slice(0,16) quita los segundos que no necesita el input
    return fecha.toISOString().slice(0, 16)
}