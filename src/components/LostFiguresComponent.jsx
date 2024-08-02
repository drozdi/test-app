function LostFiguresComponent({ title, figures = [] }) {
    return (<>
        <h6>{title}</h6>
        <div className="lost-list">
            {figures.map(figure =>
                <div className="lost" key={figure.key}>
                    <img src={figure.img} alt={figure.label} />
                </div>
            )}
        </div>
    </>);

}

export default LostFiguresComponent;