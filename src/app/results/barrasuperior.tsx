
const TopBar: React.FC = () => {
    return (
            <div className="flex justify-center mb-8 ml-28">
                <div className="flex border-2 border-light-blue rounded-lg overflow-hidden">
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">O que fazer</button>
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">Os mais visitados</button>
                    <button className="px-8 py-2 text-xl hover:bg-blue-200 transition">Buscar por cidade</button>
                </div>
        </div>
        )
    }

export default TopBar