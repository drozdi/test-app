function LostFiguresComponent({ title, figures = [] }) {
    return (<div className="lost__continer">
        <h6>{title}</h6>
        <div className="lost__list">
            {figures.map(figure =>
                <div className="lost" key={figure.key}>
                    <img src={figure.img} alt={figure.label} />
                </div>
            )}
        </div>
    </div>);

}

export default LostFiguresComponent;