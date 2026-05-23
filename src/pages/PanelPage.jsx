import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'

import { obtenerSesion, cerrarSesion } from '../utils/auth'
import {
    getReservas,
    crearReserva,
    actualizarReserva,
    eliminarReserva,
} from '../services/reservations'

import ReservationCard from '../components/ReservationCard'
import ReservationForm from '../components/ReservationForm'
import FilterBar from '../components/FilterBar'
import Spinner from '../components/Spinner'

function PanelPage() {
    const navigate = useNavigate()
    const sesion = obtenerSesion()

    const [reservas, setReservas] = useState([])
    const [cargando, setCargando] = useState(true)
    const [errorApi, setErrorApi] = useState(null)

    // para el modal de crear/editar
    const [mostrarForm, setMostrarForm] = useState(false)
    const [reservaEditar, setReservaEditar] = useState(null)
    const [guardando, setGuardando] = useState(false)

    // para saber cual tarjeta esta en proceso (para deshabilitar botones)
    const [cargandoId, setCargandoId] = useState(null)

    // filtro activo
    const [filtro, setFiltro] = useState('Todos')

    // cargo las reservas al montar el componente
    useEffect(() => {
        cargarReservas()
    }, [])

    async function cargarReservas() {
        try {
            setCargando(true)
            setErrorApi(null)
            const data = await getReservas()
            setReservas(data)
        } catch (err) {
            console.error('Error cargando reservas:', err)
            setErrorApi('No se pudieron cargar las reservas. Verifica tu conexión.')
        } finally {
            setCargando(false)
        }
    }

    function handleCerrarSesion() {
        cerrarSesion()
        navigate('/login')
    }

    function handleNuevaReserva() {
        setReservaEditar(null)
        setMostrarForm(true)
    }

    function handleEditar(reserva) {
        setReservaEditar(reserva)
        setMostrarForm(true)
    }

    function handleCancelarForm() {
        setMostrarForm(false)
        setReservaEditar(null)
    }

    async function handleSubmitForm(datosForm) {
        try {
            setGuardando(true)

            const payload = {
                ...datosForm,
                cantidadPersonas: Number(datosForm.cantidadPersonas),
            }

            if (reservaEditar) {
                const actualizada = await actualizarReserva(reservaEditar.id, payload)
                setReservas(prev =>
                    prev.map(r => (r.id === reservaEditar.id ? actualizada : r))
                )
                Swal.fire({
                    icon: 'success',
                    title: '¡Reserva actualizada!',
                    text: 'Los cambios se guardaron correctamente.',
                    timer: 2000,
                    showConfirmButton: false,
                })
            } else {
                const nueva = await crearReserva(payload)
                setReservas(prev => [nueva, ...prev])
                Swal.fire({
                    icon: 'success',
                    title: '¡Reserva creada!',
                    text: `La reserva de ${payload.nombreCliente} fue registrada.`,
                    timer: 2000,
                    showConfirmButton: false,
                })
            }

            setMostrarForm(false)
            setReservaEditar(null)
        } catch (err) {
            console.error('Error guardando reserva:', err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo guardar la reserva. Intenta de nuevo.',
            })
        } finally {
            setGuardando(false)
        }
    }

    async function handleFinalizar(reserva) {
        try {
            setCargandoId(reserva.id)
            const actualizada = await actualizarReserva(reserva.id, {
                ...reserva,
                estado: 'Finalizada',
            })
            setReservas(prev =>
                prev.map(r => (r.id === reserva.id ? actualizada : r))
            )
        } catch (err) {
            console.error('Error finalizando reserva:', err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo finalizar la reserva.',
            })
        } finally {
            setCargandoId(null)
        }
    }

    async function handleEliminar(reserva) {
        const resultado = await Swal.fire({
            icon: 'warning',
            title: '¿Estás seguro?',
            text: `¿Deseas cancelar la reserva de ${reserva.nombreCliente}?`,
            showCancelButton: true,
            confirmButtonText: 'Sí, cancelar reserva',
            cancelButtonText: 'No, volver',
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#78716c',
        })

        if (!resultado.isConfirmed) return

        try {
            setCargandoId(reserva.id)
            await eliminarReserva(reserva.id)
            setReservas(prev => prev.filter(r => r.id !== reserva.id))
            Swal.fire({
                icon: 'success',
                title: 'Reserva cancelada',
                text: 'La reserva fue eliminada del sistema.',
                timer: 2000,
                showConfirmButton: false,
            })
        } catch (err) {
            console.error('Error eliminando reserva:', err)
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo eliminar la reserva.',
            })
        } finally {
            setCargandoId(null)
        }
    }

    const reservasFiltradas = filtro === 'Todos'
        ? reservas
        : reservas.filter(r => r.estado === filtro)

    const conteos = reservas.reduce((acc, r) => {
        acc[r.estado] = (acc[r.estado] || 0) + 1
        return acc
    }, {})

    return (
        <div className="min-h-screen bg-stone-100">
            {/* navbar */}
            <header className="bg-brand-900 text-white shadow-lg">
                <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                        <span className="text-2xl">🍽️</span>
                        <div>
                            <h1 className="font-bold text-lg leading-tight">Table-Track</h1>
                            <p className="text-brand-100 text-xs">
                                {sesion?.nombre} · Turno {sesion?.turno}
                            </p>
                        </div>
                    </div>
                    <button
                        onClick={handleCerrarSesion}
                        className="text-sm bg-white/10 hover:bg-white/20 px-3 py-1.5 rounded-lg transition-colors"
                    >
                        Cerrar sesión
                    </button>
                </div>
            </header>

            <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl font-bold text-stone-800">Reservas</h2>
                        <p className="text-stone-500 text-sm">
                            {reservas.length} reservas en el sistema
                        </p>
                    </div>
                    <button onClick={handleNuevaReserva} className="btn-primary">
                        + Nueva reserva
                    </button>
                </div>

                {!cargando && !errorApi && (
                    <FilterBar
                        filtroActivo={filtro}
                        onFiltroChange={setFiltro}
                        conteos={conteos}
                    />
                )}

                {mostrarForm && (
                    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
                            <h3 className="text-lg font-semibold text-stone-800 mb-5">
                                {reservaEditar ? 'Editar reserva' : 'Nueva reserva'}
                            </h3>
                            <ReservationForm
                                onSubmit={handleSubmitForm}
                                onCancel={handleCancelarForm}
                                reservaEditar={reservaEditar}
                                cargando={guardando}
                            />
                        </div>
                    </div>
                )}

                {cargando && <Spinner texto="Cargando reservas..." />}

                {errorApi && (
                    <div className="card text-center py-10">
                        <p className="text-red-500 font-medium mb-3">{errorApi}</p>
                        <button onClick={cargarReservas} className="btn-secondary">
                            Reintentar
                        </button>
                    </div>
                )}

                {!cargando && !errorApi && reservasFiltradas.length === 0 && (
                    <div className="card text-center py-12">
                        <p className="text-4xl mb-3">📋</p>
                        <p className="text-stone-500 font-medium">
                            {filtro === 'Todos'
                                ? 'No hay reservas registradas todavía.'
                                : `No hay reservas con estado "${filtro}".`}
                        </p>
                        {filtro === 'Todos' && (
                            <button onClick={handleNuevaReserva} className="btn-primary mt-4">
                                Crear la primera reserva
                            </button>
                        )}
                    </div>
                )}

                {!cargando && !errorApi && reservasFiltradas.length > 0 && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                        {reservasFiltradas.map(reserva => (
                            <ReservationCard
                                key={reserva.id}
                                reserva={reserva}
                                onEditar={handleEditar}
                                onEliminar={handleEliminar}
                                onFinalizar={handleFinalizar}
                                cargandoId={cargandoId}
                            />
                        ))}
                    </div>
                )}
            </main>
        </div>
    )
}

export default PanelPage