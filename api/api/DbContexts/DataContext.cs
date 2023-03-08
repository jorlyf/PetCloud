using api.Entities.User;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;

namespace api.DbContexts
{
	public class DataContext : DbContext
	{
		public DbSet<User> Users { get; set; }

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			Database.EnsureCreated();
			Batteries.Init();
		}
	}
}
