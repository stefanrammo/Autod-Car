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

            // Add services to the container.
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin", policy =>
                {
                    policy.WithOrigins("https://localhost:5173")
                          .AllowAnyHeader()
                          .AllowAnyMethod();
                });
            });


            // Add Swagger (for API documentation)
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddControllers();
            var app = builder.Build();
            app.UseCors("AllowSpecificOrigin");

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
