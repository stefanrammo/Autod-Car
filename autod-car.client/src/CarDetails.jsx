function CarDetails({ car, onCloseDetails }) {
    return (
        <div style={{ border: "1px solid black", padding: "20px", marginTop: "20px" }}>
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
