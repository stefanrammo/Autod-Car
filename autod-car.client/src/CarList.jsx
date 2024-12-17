import { useEffect, useState } from 'react';

function CarList() {
    const [cars, setCars] = useState([]);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        const response = await fetch('https://localhost:7239/api/cars');
        const data = await response.json();
        setCars(data);
    };

    const handleDelete = async (id) => {
        await fetch(`https://localhost:7239/api/cars/${id}`, {
            method: 'DELETE',
        });
        setCars(cars.filter(car => car.id !== id));
    };

    return (
        <div>
            <h2>Car List</h2>
            <table>
                <thead>
                    <tr>
                        <th>Brand</th>
                        <th>Color</th>
                        <th>Engine</th>
                        <th>Horsepower</th>
                        <th>Body Type</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cars.map((car) => (
                        <tr key={car.id}>
                            <td>{car.brand}</td>
                            <td>{car.color}</td>
                            <td>{car.engine}</td>
                            <td>{car.horsepower}</td>
                            <td>{car.bodyType}</td>
                            <td>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;
