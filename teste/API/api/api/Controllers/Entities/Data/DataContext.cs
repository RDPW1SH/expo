using Microsoft.EntityFrameworkCore;

namespace API.Controllers.Entities.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Category> Category { get; set; }
        public DbSet<Meal> Meal { get; set; }

    }
}
