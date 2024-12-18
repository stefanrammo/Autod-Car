import { useState } from "react";

function AddCar({ onAddCar }) {
    const [car, setCar] = useState({
        brand: "",
        color: "",
        engine: "",
        horsepower: "",
        bodyType: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onAddCar(car); // Call the passed function to add a car
        setCar({ brand: "", color: "", engine: "", horsepower: "", bodyType: "" });
    };

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" name="brand" value={car.brand} onChange={handleChange} placeholder="Brand" required />
            <input type="text" name="color" value={car.color} onChange={handleChange} placeholder="Color" required />
            <input type="text" name="engine" value={car.engine} onChange={handleChange} placeholder="Engine" required />
            <input type="number" name="horsepower" value={car.horsepower} onChange={handleChange} placeholder="Horsepower" required />
            <input type="text" name="bodyType" value={car.bodyType} onChange={handleChange} placeholder="Body Type" required />
            <button type="submit">Add Car</button>
        </form>
    );
}

export default AddCar;
