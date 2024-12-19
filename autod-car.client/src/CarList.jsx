function CarList({ cars, onDeleteCar, onEditCar, onViewDetails }) {
    return (
        <div>
            <h2>Car List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Horsepower</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.horsepower}</td>
                            <td>
                                <button onClick={() => onViewDetails(car)}>Details</button>
                                <button onClick={() => onEditCar(car)}>Edit</button>
                                <button onClick={() => onDeleteCar(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;
