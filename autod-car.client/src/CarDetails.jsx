import { useState, useEffect } from "react";

function CarDetails({ car, onCloseDetails }) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true); // Trigger show animation
        return () => setIsVisible(false); // Clean up and trigger hide animation
    }, [car]);

    return (
        <div className={`car-details ${isVisible ? "show" : ""}`}>
            <h3>Car Details</h3>
            <p><strong>Brand:</strong> {car.brand}</p>
            <p><strong>Color:</strong> {car.color}</p>
            <p><strong>Engine:</strong> {car.engine}</p>
            <p><strong>Horsepower:</strong> {car.horsepower}</p>
            <p><strong>Body Type:</strong> {car.bodyType}</p>
            <p><strong>Created At:</strong> {new Date(car.createdAt).toLocaleString()}</p>
            <p><strong>Modified At:</strong> {new Date(car.modifiedAt).toLocaleString()}</p>
            <button onClick={onCloseDetails}>Close Details</button>
        </div>
    );
}

export default CarDetails;
