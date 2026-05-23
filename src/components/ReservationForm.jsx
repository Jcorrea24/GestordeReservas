import { useState, useEffect } from 'react'
import { ESTADOS } from '../utils/constants'
import { fechaParaInput } from '../utils/formatDate'

// este formulario sirve tanto para crear como para editar
// cuando recibe reservaEditar es que estamos editando
function ReservationForm({ onSubmit, onCancel, reservaEditar, cargando }) {
    const [form, setForm] = useState({
        nombreCliente: '',
        fechaHora: '',
        cantidadPersonas: '',
        estado: 'En Espera',
    })

    // si me pasan una reserva para editar, cargo sus datos en el form
    useEffect(() => {
        if (reservaEditar) {
            setForm({
                nombreCliente: reservaEditar.nombreCliente || '',
                fechaHora: fechaParaInput(reservaEditar.fechaHora),
                cantidadPersonas: reservaEditar.cantidadPersonas || '',
                estado: reservaEditar.estado || 'En Espera',
            })
        }
    }, [reservaEditar])

    function handleChange(e) {
        const { name, value } = e.target
        setForm(prev => ({ ...prev, [name]: value }))
    }

    function handleSubmit(e) {
        e.preventDefault()
        onSubmit(form)
    }

    const esEdicion = Boolean(reservaEditar)

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                    Nombre del cliente *
                </label>
                <input
                    type="text"
                    name="nombreCliente"
                    value={form.nombreCliente}
                    onChange={handleChange}
                    placeholder="Ej: Juan García"
                    className="input-field"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                    Fecha y hora *
                </label>
                <input
                    type="datetime-local"
                    name="fechaHora"
                    value={form.fechaHora}
                    onChange={handleChange}
                    className="input-field"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                    Cantidad de personas *
                </label>
                <input
                    type="number"
                    name="cantidadPersonas"
                    value={form.cantidadPersonas}
                    onChange={handleChange}
                    placeholder="Ej: 4"
                    min="1"
                    max="50"
                    className="input-field"
                    required
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-stone-700 mb-1">
                    Estado
                </label>
                <select
                    name="estado"
                    value={form.estado}
                    onChange={handleChange}
                    className="input-field"
                >
                    {ESTADOS.map(e => (
                        <option key={e} value={e}>{e}</option>
                    ))}
                </select>
            </div>

            <div className="flex gap-3 pt-2">
                <button
                    type="submit"
                    disabled={cargando}
                    className="btn-primary flex-1"
                >
                    {cargando ? 'Guardando...' : esEdicion ? 'Guardar cambios' : 'Crear reserva'}
                </button>
                <button
                    type="button"
                    onClick={onCancel}
                    className="btn-secondary"
                >
                    Cancelar
                </button>
            </div>
        </form>
    )
}

export default ReservationForm