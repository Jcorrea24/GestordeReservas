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

// para el input datetime-local necesito el formato correcto sin desvíos de zona horaria
export function fechaParaInput(fechaString) {
    if (!fechaString) return ''
    const fecha = new Date(fechaString)
    if (isNaN(fecha.getTime())) return ''
    
    const year = fecha.getFullYear()
    const month = String(fecha.getMonth() + 1).padStart(2, '0')
    const day = String(fecha.getDate()).padStart(2, '0')
    const hours = String(fecha.getHours()).padStart(2, '0')
    const minutes = String(fecha.getMinutes()).padStart(2, '0')
    
    return `${year}-${month}-${day}T${hours}:${minutes}`
}