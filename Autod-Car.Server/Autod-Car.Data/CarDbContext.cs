using AutodCar.Core.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Design;

namespace AutodCar.Server.Data
{
    public class CarDbContext : DbContext
    {
        public CarDbContext(DbContextOptions<CarDbContext> options) : base(options) { }

        public DbSet<Car> Cars { get; set; } // Other DbSets
    }

    // Design-time DbContext factory for migrations
    public class CarDbContextFactory : IDesignTimeDbContextFactory<CarDbContext>
    {
        public CarDbContext CreateDbContext(string[] args)
        {
            var optionsBuilder = new DbContextOptionsBuilder<CarDbContext>();
            optionsBuilder.UseSqlServer(
                "Data Source=tcp:car-server.database.windows.net,1433;Initial Catalog=SQLAzure;User Id=car-server-admin@car-server.database.windows.net;Password=DBw0$cmMCx0dn$NO");

            return new CarDbContext(optionsBuilder.Options);
        }
    }
}
