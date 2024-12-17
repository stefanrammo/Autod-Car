using AutodCar.Server.Data;
using Microsoft.EntityFrameworkCore;

namespace Autod_Car.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.
            builder.Services.AddControllers();


            // Add the database context service (with connection string from appsettings.json)
            builder.Services.AddDbContext<CarDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("CarDatabase")));

            // Add Swagger (for API documentation)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Serve static files and default files (for the React client)
            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();
            app.UseAuthorization();

            // Map the controllers
            app.MapControllers();

            // Fallback to index.html (for React routing)
            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
