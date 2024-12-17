import { useEffect, useState } from "react";

function CarList() {
    const [cars, setCars] = useState([]);
    const [selectedCar, setSelectedCar] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("https://localhost:7239/api/Cars");
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await fetch(`https://localhost:7239/api/Cars/${id}`, {
                method: "DELETE",
            });
            setCars(cars.filter((car) => car.id !== id));
            if (selectedCar?.id === id) {
                setSelectedCar(null); // Clear details if the selected car is deleted
            }
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleViewDetails = async (id) => {
        try {
            const response = await fetch(`https://localhost:7239/api/Cars/${id}`);
            const data = await response.json();
            setSelectedCar(data);
        } catch (error) {
            console.error("Error fetching car details:", error);
        }
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
                                <button onClick={() => handleViewDetails(car.id)}>Details</button>
                                <button onClick={() => handleDelete(car.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Details Section */}
            {selectedCar && (
                <div>
                    <h3>Car Details</h3>
                    <p><strong>Brand:</strong> {selectedCar.brand}</p>
                    <p><strong>Color:</strong> {selectedCar.color}</p>
                    <p><strong>Engine:</strong> {selectedCar.engine}</p>
                    <p><strong>Horsepower:</strong> {selectedCar.horsepower}</p>
                    <p><strong>Body Type:</strong> {selectedCar.bodyType}</p>
                    <p><strong>Created At:</strong> {new Date(selectedCar.createdAt).toLocaleString()}</p>
                    <p><strong>Modified At:</strong> {new Date(selectedCar.modifiedAt).toLocaleString()}</p>
                    <button onClick={() => setSelectedCar(null)}>Close Details</button>
                </div>
            )}
        </div>
    );
}

export default CarList;
