using Autod_Car.Server;
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class CarsController : ControllerBase
{
    private static List<Car> cars = new List<Car>
    {
        new Car { Id = 1, Brand = "Toyota", Color = "Red", Engine = "V6", Horsepower = 300, BodyType = "SUV", CreatedAt = DateTime.Now, ModifiedAt = DateTime.Now },
        new Car { Id = 2, Brand = "Honda", Color = "Blue", Engine = "V4", Horsepower = 200, BodyType = "Sedan", CreatedAt = DateTime.Now, ModifiedAt = DateTime.Now }
    };

    [HttpGet]
    public ActionResult<IEnumerable<Car>> GetCars()
    {
        return Ok(cars);
    }

    [HttpGet("{id}")]
    public ActionResult<Car> GetCar(int id)
    {
        var car = cars.FirstOrDefault(c => c.Id == id);
        if (car == null) return NotFound();
        return Ok(car);
    }

    [HttpPost]
    public ActionResult<Car> CreateCar(Car car)
    {
        car.Id = cars.Max(c => c.Id) + 1; // Generate a new Id
        car.CreatedAt = DateTime.Now;
        car.ModifiedAt = DateTime.Now;
        cars.Add(car);
        return CreatedAtAction(nameof(GetCar), new { id = car.Id }, car);
    }

    [HttpPut("{id}")]
    public ActionResult<Car> UpdateCar(int id, Car car)
    {
        var existingCar = cars.FirstOrDefault(c => c.Id == id);
        if (existingCar == null) return NotFound();

        existingCar.Brand = car.Brand;
        existingCar.Color = car.Color;
        existingCar.Engine = car.Engine;
        existingCar.Horsepower = car.Horsepower;
        existingCar.BodyType = car.BodyType;
        existingCar.ModifiedAt = DateTime.Now;

        return Ok(existingCar);
    }

    [HttpDelete("{id}")]
    public ActionResult DeleteCar(int id)
    {
        var car = cars.FirstOrDefault(c => c.Id == id);
        if (car == null) return NotFound();

        cars.Remove(car);
        return NoContent();
    }
}
