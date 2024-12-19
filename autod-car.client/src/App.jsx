import { useEffect, useState } from "react";
import CarList from "./CarList";
import AddCar from "./AddCar";
import CarDetails from "./CarDetails";

// Determine the base URL dynamically
const baseUrl =
    window.location.hostname === "localhost"
        ? "https://localhost:7239/api/cars"
        : "https://car123-aaezhjgzadhfa5ak.polandcentral-01.azurewebsites.net/api/cars";

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true); // Loading state
    const [selectedCar, setSelectedCar] = useState(null);
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setLoading(true); // Show spinner while loading
            const response = await fetch(baseUrl);
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setLoading(false); // Hide spinner after loading
        }
    };

    const handleAddCar = async (newCar) => {
        try {
            const response = await fetch(baseUrl, {
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

    const handleUpdateCar = async (updatedCar) => {
        try {
            await fetch(`${baseUrl}/${updatedCar.id}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(updatedCar),
            });
            setCars((prevCars) =>
                prevCars.map((car) => (car.id === updatedCar.id ? updatedCar : car))
            );
            setEditingCar(null);
        } catch (error) {
            console.error("Error updating car:", error);
        }
    };

    const handleDeleteCar = async (id) => {
        try {
            await fetch(`${baseUrl}/${id}`, { method: "DELETE" });
            setCars((prevCars) => prevCars.filter((car) => car.id !== id));
        } catch (error) {
            console.error("Error deleting car:", error);
        }
    };

    const handleViewDetails = (car) => {
        setSelectedCar(car);
    };

    const handleCloseDetails = () => {
        setSelectedCar(null);
    };

    const handleEditCar = (car) => {
        setEditingCar(car);
    };

    const handleCancelEdit = () => {
        setEditingCar(null);
    };

    return (
        <div>
            <h1>Car CRUD App</h1>
            {editingCar ? (
                <AddCar
                    initialCar={editingCar}
                    onAddCar={handleUpdateCar}
                    onCancelEdit={handleCancelEdit}
                />
            ) : (
                <AddCar onAddCar={handleAddCar} />
            )}
            {loading ? ( // Display spinner while loading
                <><div className="spinner"></div><div className="spinnerText">Loading cars...</div></>
            ) : (
                <CarList
                    cars={cars}
                    onDeleteCar={handleDeleteCar}
                    onEditCar={handleEditCar}
                    onViewDetails={handleViewDetails}
                />
            )}
            {selectedCar && (
                <CarDetails car={selectedCar} onCloseDetails={handleCloseDetails} />
            )}
        </div>
    );
}

export default App;
