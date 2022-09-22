export const TabsItem = ({ title, index, active, setActive}) => {
    const className = active? 'absolute top-0 z-10 bg-white w-[40px] h-[40px] rounded-full flex items-center justify-center shadow-md' : 'border-none';

    return (
        <div className="nav-item px-2">
            <button onClick={() => setActive(title)} className="flex justify-between items-center">
                <span className={`hover:text-gold transition-colors border-b-2 ${className}`}>
                    <div key={index}>{title}</div>
                </span>
            </button>
        </div> 
    )
}