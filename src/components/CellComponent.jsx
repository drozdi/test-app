function CellComponent({ cell, selected = false, onClick = (cell) => {} }) {
    return (<div onClick={() => onClick(cell)} className={[
        'cell', cell.color, 
        selected? 'selected':'', 
        cell.available && !cell.figure? 'available': '',
        cell.available && cell.figure? 'attack': ''
    ].join(' ')}>
        {cell.figure && <img src={cell.figure.img} />}
    </div>);
}
export default CellComponent;