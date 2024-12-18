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

            // Register DbContext with a connection string from configuration
            builder.Services.AddDbContext<CarDbContext>(options =>
                options.UseSqlServer(builder.Configuration.GetConnectionString("CarDatabase")));

            // Add CORS policy
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowAllOrigins", builder =>
                    builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader());
            });


            // Add Swagger (for API documentation)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            // Use the CORS policy
            app.UseCors("AllowAllOrigins");

            // Serve static files and default files (for React client)
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
