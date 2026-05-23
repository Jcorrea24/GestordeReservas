import { SESSION_KEY } from './constants'

// guarda nombre y turno del anfitrion en localStorage
export function guardarSesion(nombre, turno) {
    const datos = { nombre, turno }
    localStorage.setItem(SESSION_KEY, JSON.stringify(datos))
}

export function obtenerSesion() {
    const datos = localStorage.getItem(SESSION_KEY)
    if (!datos) return null
    return JSON.parse(datos)
}

export function cerrarSesion() {
    localStorage.removeItem(SESSION_KEY)
}

export function haySesion() {
    return obtenerSesion() !== null
}