import { useState } from "react";

function CarList({ cars, onDeleteCar, onUpdateCar }) {
    const [editingCar, setEditingCar] = useState(null);
    const [editedCar, setEditedCar] = useState({});

    const startEditing = (car) => {
        setEditingCar(car.id);
        setEditedCar({ ...car });
    };

    const handleEditChange = (e) => {
        const { name, value } = e.target;
        setEditedCar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSave = () => {
        onUpdateCar(editedCar);
        setEditingCar(null);
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
                            {editingCar === car.id ? (
                                <>
                                    <td><input name="brand" value={editedCar.brand} onChange={handleEditChange} /></td>
                                    <td><input name="color" value={editedCar.color} onChange={handleEditChange} /></td>
                                    <td><input name="engine" value={editedCar.engine} onChange={handleEditChange} /></td>
                                    <td><input name="horsepower" value={editedCar.horsepower} onChange={handleEditChange} /></td>
                                    <td><input name="bodyType" value={editedCar.bodyType} onChange={handleEditChange} /></td>
                                    <td>
                                        <button onClick={handleSave}>Save</button>
                                        <button onClick={() => setEditingCar(null)}>Cancel</button>
                                    </td>
                                </>
                            ) : (
                                <>
                                    <td>{car.brand}</td>
                                    <td>{car.color}</td>
                                    <td>{car.engine}</td>
                                    <td>{car.horsepower}</td>
                                    <td>{car.bodyType}</td>
                                    <td>
                                        <button onClick={() => startEditing(car)}>Edit</button>
                                        <button onClick={() => onDeleteCar(car.id)}>Delete</button>
                                    </td>
                                </>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default CarList;
