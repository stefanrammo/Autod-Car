import { useState, useEffect } from "react";

function AddCar({ onAddCar, initialCar = null, onCancelEdit }) {
    const [car, setCar] = useState({
        brand: "",
        color: "",
        engine: "",
        horsepower: "",
        bodyType: "",
    });

    useEffect(() => {
        if (initialCar) {
            setCar(initialCar);
        }
    }, [initialCar]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAddCar(car);

        if (!initialCar) {
            // Clear form if adding a new car
            setCar({
                brand: "",
                color: "",
                engine: "",
                horsepower: "",
                bodyType: "",
            });
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="brand"
                value={car.brand}
                onChange={handleChange}
                placeholder="Brand"
                required
            />
            <input
                type="text"
                name="color"
                value={car.color}
                onChange={handleChange}
                placeholder="Color"
                required
            />
            <input
                type="text"
                name="engine"
                value={car.engine}
                onChange={handleChange}
                placeholder="Engine"
                required
            />
            <input
                type="number"
                name="horsepower"
                value={car.horsepower}
                onChange={handleChange}
                placeholder="Horsepower"
                required
            />
            <input
                type="text"
                name="bodyType"
                value={car.bodyType}
                onChange={handleChange}
                placeholder="Body Type"
                required
            />
            <button className="add-car-button" type="submit">{initialCar ? "Update Car" : "Add Car"}</button>
            {initialCar && <button onClick={onCancelEdit}>Cancel</button>}
        </form>
    );
}

export default AddCar;
