import { useState, useEffect } from "react";

function AddCar({ onAddCar, initialCar = null, onCancelEdit }) {
    const [car, setCar] = useState({
        brand: "",
        color: "",
        engine: "",
        horsepower: "",
        bodyType: "",
    });

    // Populate form fields when editing an existing car
    useEffect(() => {
        if (initialCar) {
            setCar(initialCar);
        }
    }, [initialCar]);

    // Handle input field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setCar((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Submit form (add or update)
    const handleSubmit = async (e) => {
        e.preventDefault();
        await onAddCar(car); // Call the parent function to handle adding/updating the car

        if (!initialCar) {
            // Clear form fields if adding a new car
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
            <div>
                <input
                    type="text"
                    name="brand"
                    value={car.brand}
                    onChange={handleChange}
                    placeholder="Brand"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="color"
                    value={car.color}
                    onChange={handleChange}
                    placeholder="Color"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="engine"
                    value={car.engine}
                    onChange={handleChange}
                    placeholder="Engine"
                    required
                />
            </div>
            <div>
                <input
                    type="number"
                    name="horsepower"
                    value={car.horsepower}
                    onChange={handleChange}
                    placeholder="Horsepower"
                    required
                />
            </div>
            <div>
                <input
                    type="text"
                    name="bodyType"
                    value={car.bodyType}
                    onChange={handleChange}
                    placeholder="Body Type"
                    required
                />
            </div>
            <button className="add-car-button" type="submit">
                {initialCar ? "Update Car" : "Add Car"}
            </button>
            {initialCar && (
                <button type="button" onClick={onCancelEdit}>
                    Cancel
                </button>
            )}
        </form>
    );
}

export default AddCar;
