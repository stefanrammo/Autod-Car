using Microsoft.AspNetCore.Mvc;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutodCar.Server.Data;
using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Runtime.ConstrainedExecution;
using Autod_Car.Server.Controllers;
using Autod_Car.Server;
using Xunit;


namespace CarTest
{
    public class CarsControllerTests
    {
        private readonly Mock<CarDbContext> _mockContext;
        private readonly CarsController _controller;

        public CarsControllerTests()
        {
            _mockContext = new Mock<CarDbContext>();

            // Create in-memory DbSet
            var cars = new List<Car>
            {
                new Car { Id = 1, Brand = "Tesla", Color = "Red", Engine = "Electric", Horsepower = 1010, BodyType = "Sedan", CreatedAt = DateTime.UtcNow, ModifiedAt = DateTime.UtcNow },
                new Car { Id = 2, Brand = "Ford", Color = "Blue", Engine = "V8", Horsepower = 450, BodyType = "Coupe", CreatedAt = DateTime.UtcNow, ModifiedAt = DateTime.UtcNow }
            }.AsQueryable();

            var mockSet = new Mock<DbSet<Car>>();
            mockSet.As<IQueryable<Car>>().Setup(m => m.Provider).Returns(cars.Provider);
            mockSet.As<IQueryable<Car>>().Setup(m => m.Expression).Returns(cars.Expression);
            mockSet.As<IQueryable<Car>>().Setup(m => m.ElementType).Returns(cars.ElementType);
            mockSet.As<IQueryable<Car>>().Setup(m => m.GetEnumerator()).Returns(cars.GetEnumerator());

            _mockContext.Setup(c => c.Cars).Returns(mockSet.Object);

            _controller = new CarsController(_mockContext.Object);
        }

        [Fact]
        public async Task GetCars_ReturnsAllCars()
        {
            // Act
            var result = await _controller.GetCars();

            // Assert
            var actionResult = Assert.IsType<ActionResult<IEnumerable<Car>>>(result);
            var cars = Assert.IsAssignableFrom<IEnumerable<Car>>(actionResult.Value);
            Assert.Equal(2, cars.Count());
        }

        [Fact]
        public async Task GetCar_ReturnsCar_WhenCarExists()
        {
            // Act
            var result = await _controller.GetCar(1);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Car>>(result);
            var car = Assert.IsType<Car>(actionResult.Value);
            Assert.Equal(1, car.Id);
            Assert.Equal("Tesla", car.Brand);
        }

        [Fact]
        public async Task GetCar_ReturnsNotFound_WhenCarDoesNotExist()
        {
            // Act
            var result = await _controller.GetCar(99);

            // Assert
            Assert.IsType<NotFoundResult>(result.Result);
        }

        [Fact]
        public async Task PostCar_CreatesCar()
        {
            // Arrange
            var newCar = new Car
            {
                Brand = "BMW",
                Color = "Black",
                Engine = "Inline-6",
                Horsepower = 335,
                BodyType = "SUV"
            };

            // Act
            var result = await _controller.PostCar(newCar);

            // Assert
            var actionResult = Assert.IsType<ActionResult<Car>>(result);
            var createdCar = Assert.IsType<Car>(actionResult.Value);
            Assert.Equal("BMW", createdCar.Brand);
            Assert.Equal("Black", createdCar.Color);
            Assert.Equal(335, createdCar.Horsepower);
        }
    }
}
