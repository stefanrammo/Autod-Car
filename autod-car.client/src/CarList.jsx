function CarList({ cars, onDeleteCar, onEditCar, onViewDetails }) {
    return (
        <div className="car-list">
            <h2>Car List</h2>
            <div className="car-cards">
                {cars.map((car) => (
                    <div key={car.id} className="car-card">
                        <h3>{car.brand}</h3>
                        <p>Horsepower: {car.horsepower}</p>
                        <div className="card-actions">
                            <button className="view-details-button" onClick={() => onViewDetails(car)}>Details</button>
                            <button className="edit-car-button" onClick={() => onEditCar(car)}>Edit</button>
                            <button className="delete-car-button" onClick={() => onDeleteCar(car.id)}>Delete</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CarList;
