function CellComponent({ cell }) {
    return (<div className={['cell', cell.color].join(' ')}>

    </div>);
}
export default CellComponent;