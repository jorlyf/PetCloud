using api.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace api.DbContexts
{
	public class DataContext : DbContext
	{
		public DbSet<User> Users { get; set; }

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			Database.EnsureCreated();
		}
	}
}
