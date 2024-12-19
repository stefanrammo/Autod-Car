import { useEffect, useState } from "react";
import CarList from "./CarList";
import AddCar from "./AddCar";
import CarDetails from "./CarDetails";

const baseUrl =
    window.location.hostname === "localhost"
        ? "https://localhost:7239/api/cars"
        : "https://car123-aaezhjgzadhfa5ak.polandcentral-01.azurewebsites.net/api/cars";

function App() {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedCar, setSelectedCar] = useState(null);
    const [editingCar, setEditingCar] = useState(null);

    useEffect(() => {
        fetchCars();
    }, []);

    const fetchCars = async () => {
        try {
            setLoading(true);
            const response = await fetch(baseUrl);
            const data = await response.json();
            setCars(data);
        } catch (error) {
            console.error("Error fetching cars:", error);
        } finally {
            setLoading(false);
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
        document.querySelector(".add-car-container").classList.add("editing"); // Add class when editing
    };

    const handleCancelEdit = () => {
        setEditingCar(null);
        document.querySelector(".add-car-container").classList.remove("editing"); // Remove class when canceling
    };


    return (
        <div className="page-container">
            <h1 className="page-header">Car CRUD App</h1>
            <div className={`page-content ${selectedCar ? "details-open" : ""}`}>
                {editingCar ? (
                    <AddCar
                        initialCar={editingCar}
                        onAddCar={handleUpdateCar}
                        onCancelEdit={handleCancelEdit}
                    />
                ) : (
                    <AddCar onAddCar={handleAddCar} />
                )}
                {loading ? (
                    <><div className="spinner"></div><div>Loading cars...</div></>
                ) : (
                    <CarList
                        cars={cars}
                        onDeleteCar={handleDeleteCar}
                        onEditCar={handleEditCar}
                        onViewDetails={handleViewDetails}
                    />
                )}
            </div>
            {selectedCar && (
                <CarDetails car={selectedCar} onCloseDetails={handleCloseDetails} />
            )}
        </div>
    );
}

export default App;
