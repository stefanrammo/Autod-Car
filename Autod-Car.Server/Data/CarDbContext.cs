using Autod_Car.Server;
using Microsoft.EntityFrameworkCore;

namespace AutodCar.Server.Data
{
    public class CarDbContext : DbContext
    {
        public CarDbContext(DbContextOptions<CarDbContext> options)
            : base(options)
        { }

        public DbSet<Car> Cars { get; set; }
    }
}
