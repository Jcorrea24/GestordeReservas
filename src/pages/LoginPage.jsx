import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { guardarSesion } from '../utils/auth'
import { TURNOS } from '../utils/constants'

function LoginPage() {
    const navigate = useNavigate()
    const [nombre, setNombre] = useState('')
    const [turno, setTurno] = useState('')
    const [error, setError] = useState('')

    function handleSubmit(e) {
        e.preventDefault()
        setError('')

        if (!nombre.trim()) {
            setError('Por favor ingresa tu nombre completo')
            return
        }
        if (!turno) {
            setError('Selecciona un turno para continuar')
            return
        }

        guardarSesion(nombre.trim(), turno)
        navigate('/panel')
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-brand-900 via-stone-800 to-stone-900 flex items-center justify-center p-4">
            <div className="w-full max-w-md">
                {/* logo / titulo */}
                <div className="text-center mb-8">
                    <div className="text-5xl mb-3">🍽️</div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">Table-Track</h1>
                    <p className="text-stone-400 mt-1 text-sm">Gestor de reservas para anfitriones</p>
                </div>

                {/* formulario de acceso */}
                <div className="bg-white rounded-2xl shadow-2xl p-8">
                    <h2 className="text-lg font-semibold text-stone-800 mb-6">Iniciar turno</h2>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                Nombre completo
                            </label>
                            <input
                                type="text"
                                value={nombre}
                                onChange={e => setNombre(e.target.value)}
                                placeholder="Ej: María Rodríguez"
                                className="input-field"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-stone-700 mb-1">
                                Turno
                            </label>
                            <select
                                value={turno}
                                onChange={e => setTurno(e.target.value)}
                                className="input-field"
                            >
                                <option value="">-- Selecciona un turno --</option>
                                {TURNOS.map(t => (
                                    <option key={t} value={t}>{t}</option>
                                ))}
                            </select>
                        </div>

                        {/* mensaje de error si algo falla */}
                        {error && (
                            <p className="text-red-500 text-sm bg-red-50 border border-red-100 px-3 py-2 rounded-lg">
                                {error}
                            </p>
                        )}

                        <button type="submit" className="btn-primary w-full mt-2">
                            Ingresar al panel
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginPage

