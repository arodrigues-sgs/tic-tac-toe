export default function Cell({ player, isFrozen, onCellClick }) {
    const isActive = !player && !isFrozen;
    return (
        <div 
            className={`cell ${isActive ? "active" : ""} ${player?.toLowerCase() ?? ""}`}
            onClick={onCellClick} >
            {player ?? ""}
        </div>
    );
}
