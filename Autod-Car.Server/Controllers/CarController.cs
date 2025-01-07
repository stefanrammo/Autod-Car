using Microsoft.AspNetCore.Mvc;
using Autod_Car.Server.Services;

namespace Autod_Car.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CarsController : ControllerBase
    {
        private readonly CarService _carService;

        public CarsController(CarService carService)
        {
            _carService = carService;
        }

        // GET: api/Cars
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Car>>> GetCars()
        {
            return Ok(await _carService.GetCarsAsync());
        }

        // GET: api/Cars/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<Car>> GetCar(int id)
        {
            var car = await _carService.GetCarByIdAsync(id);
            if (car == null)
                return NotFound();

            return Ok(car);
        }

        // POST: api/Cars
        [HttpPost]
        public async Task<ActionResult<Car>> PostCar(Car car)
        {
            var createdCar = await _carService.CreateCarAsync(car);
            return CreatedAtAction(nameof(GetCar), new { id = createdCar.Id }, createdCar);
        }

        // PUT: api/Cars/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCar(int id, Car car)
        {
            var success = await _carService.UpdateCarAsync(id, car);
            if (!success)
                return NotFound();

            return NoContent();
        }

        // DELETE: api/Cars/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCar(int id)
        {
            var success = await _carService.DeleteCarAsync(id);
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}
