import { useEffect, useState } from "react";
import CarList from "./CarList";
import AddCar from "./AddCar";

function App() {
    const [cars, setCars] = useState([]);

    // Fetch cars on initial render
    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            const response = await fetch("/api/Cars");
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        }
    };

    // Add a new car
    const handleAddCar = async (newCar) => {
        try {
            const response = await fetch("/api/Cars", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(newCar),
            });
            const data = await response.json();
            setCars((prevCars) => [...prevCars, data]);
        } catch (error) {
            console.error("Error adding car:", error);
        }
    };

    // Update an existing car
    const handleUpdateCar = async (updatedCar) => {
        try {
            await fetch(`/api/Cars/${updatedCar.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCar),
            });
            setCars((prevCars) =>
                prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
            );
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    // Delete a car
    const handleDeleteCar = async (id) => {
        try {
            await fetch(`/api/Cars/${id}`, { method: "DELETE" });
            setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    return (
        <div>
            <h1>Car CRUD App</h1>
            <AddCar onAddCar={handleAddCar} />
            <CarList cars={cars} onDeleteCar={handleDeleteCar} onUpdateCar={handleUpdateCar} />
        </div>
    );
}

export default App;
