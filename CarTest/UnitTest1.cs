using Autod_Car.Server.Controllers;
using Autod_Car.Server;
using AutodCar.Server.Data;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using Xunit;

public class CarsControllerTests
{
    private CarDbContext GetInMemoryDbContext()
    {
        var options = new DbContextOptionsBuilder<CarDbContext>()
            .UseInMemoryDatabase(Guid.NewGuid().ToString()) // Unique database for each test
            .Options;

        var context = new CarDbContext(options);

        // Seed data (if needed)
        context.Cars.AddRange(
            new Car { Id = 1, Brand = "Toyota", Color = "Red", Engine = "V6", Horsepower = 300, BodyType = "Sedan" },
            new Car { Id = 2, Brand = "Honda", Color = "Blue", Engine = "I4", Horsepower = 200, BodyType = "Coupe" }
        );
        context.SaveChanges();

        return context;
    }

    [Fact]
    public async Task GetCars_ReturnsAllCars()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new CarsController(context);

        // Act
        var actionResult = await controller.GetCars(); // Await the Task
        var result = actionResult.Value; // Extract the data from ActionResult

        // Assert
        Assert.NotNull(result);
        Assert.Equal(2, result.Count()); // Use Count on the IEnumerable<Car>
    }


    [Fact]
    public async Task GetCar_ReturnsCar_WhenCarExists()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new CarsController(context);

        // Act
        var actionResult = await controller.GetCar(1); // Await the Task
        var result = actionResult.Value; // Extract the Car object from ActionResult

        // Assert
        Assert.NotNull(result);
        Assert.Equal("Toyota", result.Brand); // Access properties of the Car
    }


    [Fact]
    public async Task GetCar_ReturnsNotFound_WhenCarDoesNotExist()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new CarsController(context);

        // Act
        var actionResult = await controller.GetCar(99); // Await the Task

        // Assert
        Assert.Null(actionResult.Value); // Assert that the Value is null
    }


    [Fact]
    public async Task PostCar_CreatesCar()
    {
        // Arrange
        var context = GetInMemoryDbContext();
        var controller = new CarsController(context);

        var newCar = new Car
        {
            Brand = "Ford",
            Color = "Black",
            Engine = "V8",
            Horsepower = 400,
            BodyType = "SUV"
        };

        // Act
        await controller.PostCar(newCar); // Await the Task

        // Assert
        var carInDb = context.Cars.SingleOrDefault(c => c.Brand == "Ford");
        Assert.NotNull(carInDb);
        Assert.Equal("Ford", carInDb.Brand);
    }
}
