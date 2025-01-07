using AutodCar.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Autod_Car.Server.Services
{
    public class CarService
    {
        private readonly CarDbContext _context;

        public CarService(CarDbContext context)
        {
            _context = context;
        }

        // Get all cars
        public async Task<IEnumerable<Car>> GetCarsAsync()
        {
            return await _context.Cars.ToListAsync();
        }

        // Get a single car by ID
        public async Task<Car?> GetCarByIdAsync(int id)
        {
            return await _context.Cars.FindAsync(id);
        }

        // Create a new car
        public async Task<Car> CreateCarAsync(Car car)
        {
            car.CreatedAt = DateTime.UtcNow;
            car.ModifiedAt = DateTime.UtcNow;

            _context.Cars.Add(car);
            await _context.SaveChangesAsync();

            return car;
        }

        // Update an existing car
        public async Task<bool> UpdateCarAsync(int id, Car updatedCar)
        {
            if (id != updatedCar.Id)
                return false;

            updatedCar.ModifiedAt = DateTime.UtcNow;
            _context.Entry(updatedCar).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
                return true;
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _context.Cars.AnyAsync(e => e.Id == id))
                    return false;

                throw;
            }
        }

        // Delete a car
        public async Task<bool> DeleteCarAsync(int id)
        {
            var car = await _context.Cars.FindAsync(id);
            if (car == null)
                return false;

            _context.Cars.Remove(car);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}
