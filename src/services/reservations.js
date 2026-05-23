import axios from 'axios'
import { API_URL } from '../utils/constants'

// GET - trae todas las reservas
export async function getReservas() {
    const res = await axios.get(API_URL)
    return res.data
}

// POST - crea una reserva nueva
export async function crearReserva(datos) {
    const res = await axios.post(API_URL, datos)
    return res.data
}

// PUT - actualiza una reserva existente
export async function actualizarReserva(id, datos) {
    const res = await axios.put(`${API_URL}/${id}`, datos)
    return res.data
}

// DELETE - elimina una reserva
export async function eliminarReserva(id) {
    const res = await axios.delete(`${API_URL}/${id}`)
    return res.data
}
