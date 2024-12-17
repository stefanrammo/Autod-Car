import { useState } from 'react';
import CarList from './CarList';
import AddCar from './AddCar';

function App() {
    const [cars, setCars] = useState([]);

    const handleAddCar = (newCar) => {
        setCars((prevCars) => [...prevCars, newCar]);
    };

    return (
        <div>
            <h1>Car CRUD App</h1>
            <AddCar onAddCar={handleAddCar} />
            <CarList cars={cars} />
        </div>
    );
}

export default App;
