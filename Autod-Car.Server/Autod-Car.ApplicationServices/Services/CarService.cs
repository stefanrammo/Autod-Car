using AutodCar.Core.Interfaces;
using AutodCar.Core.Models;
using AutodCar.Data.Repositories;

namespace AutodCar.ApplicationServices.Services
{
    public class CarService : ICarService
    {
        private readonly ICarRepository _repository;

        public CarService(ICarRepository repository)
        {
            _repository = repository;
        }

        public async Task<List<Car>> GetAllCarsAsync() => await _repository.GetAllAsync();

        public async Task<Car> GetCarByIdAsync(int id) => await _repository.GetByIdAsync(id);

        public async Task AddCarAsync(Car car)
        {
            car.CreatedAt = DateTime.Now;
            await _repository.AddAsync(car);
        }

        public async Task UpdateCarAsync(Car car)
        {
            car.ModifiedAt = DateTime.Now;
            await _repository.UpdateAsync(car);
        }

        public async Task DeleteCarAsync(int id) => await _repository.DeleteAsync(id);
    }
}
