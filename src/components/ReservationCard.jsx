import { formatearFecha } from '../utils/formatDate'

// colores y estilos segun el estado de la reserva
const badgeEstado = {
    Confirmada: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
    'En Espera': 'bg-amber-100 text-amber-700 border border-amber-200',
    Finalizada: 'bg-stone-100 text-stone-500 border border-stone-200',
}

function ReservationCard({ reserva, onEditar, onEliminar, onFinalizar, cargandoId }) {
    const estaCargando = cargandoId === reserva.id

    return (
        <div className={`card transition-opacity duration-200 ${estaCargando ? 'opacity-60' : ''}`}>
            {/* encabezado con nombre y estado */}
            <div className="flex items-start justify-between gap-2 mb-3">
                <h3 className="font-semibold text-stone-800 text-base leading-tight">
                    {reserva.nombreCliente}
                </h3>
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full whitespace-nowrap ${badgeEstado[reserva.estado] || badgeEstado['En Espera']}`}>
                    {reserva.estado}
                </span>
            </div>

            {/* datos de la reserva */}
            <div className="space-y-1.5 mb-4">
                <div className="flex items-center gap-2 text-sm text-stone-600">
                    <span>📅</span>
                    <span>{formatearFecha(reserva.fechaHora)}</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-stone-600">
                    <span>👥</span>
                    <span>
                        {reserva.cantidadPersonas}{' '}
                        {reserva.cantidadPersonas === 1 ? 'persona' : 'personas'}
                    </span>
                </div>
            </div>

            {/* acciones */}
            <div className="flex flex-wrap gap-2 pt-3 border-t border-stone-100">
                {/* solo muestro finalizar si no esta ya finalizada */}
                {reserva.estado !== 'Finalizada' && (
                    <button
                        onClick={() => onFinalizar(reserva)}
                        disabled={estaCargando}
                        className="btn-success"
                    >
                        ✓ Finalizar
                    </button>
                )}

                <button
                    onClick={() => onEditar(reserva)}
                    disabled={estaCargando}
                    className="btn-secondary text-sm py-1.5"
                >
                    Editar
                </button>

                <button
                    onClick={() => onEliminar(reserva)}
                    disabled={estaCargando}
                    className="btn-danger ml-auto"
                >
                    Eliminar
                </button>
            </div>
        </div>
    )
}

export default ReservationCard
