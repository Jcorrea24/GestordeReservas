const FILTROS = ['Todos', 'Confirmada', 'En Espera', 'Finalizada']

const coloresFiltro = {
    Todos: 'bg-stone-700 text-white',
    Confirmada: 'bg-emerald-500 text-white',
    'En Espera': 'bg-amber-400 text-amber-900',
    Finalizada: 'bg-stone-400 text-white',
}

const coloresInactivo = {
    Todos: 'bg-stone-100 text-stone-600 hover:bg-stone-200',
    Confirmada: 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100',
    'En Espera': 'bg-amber-50 text-amber-700 hover:bg-amber-100',
    Finalizada: 'bg-stone-100 text-stone-500 hover:bg-stone-200',
}

function FilterBar({ filtroActivo, onFiltroChange, conteos }) {
    return (
        <div className="flex flex-wrap gap-2">
            {FILTROS.map((filtro) => {
                const activo = filtroActivo === filtro
                const cantidad = filtro === 'Todos'
                    ? Object.values(conteos).reduce((a, b) => a + b, 0)
                    : (conteos[filtro] ?? 0)

                return (
                    <button
                        key={filtro}
                        onClick={() => onFiltroChange(filtro)}
                        className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-150 flex items-center gap-1.5 ${activo ? coloresFiltro[filtro] : coloresInactivo[filtro]
                            }`}
                    >
                        {filtro}
                        <span className={`text-xs px-1.5 py-0.5 rounded-full ${activo ? 'bg-white/25' : 'bg-black/10'
                            }`}>
                            {cantidad}
                        </span>
                    </button>
                )
            })}
        </div>
    )
}

export default FilterBar