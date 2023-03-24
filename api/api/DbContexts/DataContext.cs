using api.Entities.FileHierarchyNS;
using api.Entities.UserNS;
using Microsoft.EntityFrameworkCore;
using SQLitePCL;
using File = api.Entities.FileHierarchyNS.File;

namespace api.DbContexts
{
	public class DataContext : DbContext
	{
		public DbSet<User> Users { get; set; }
		public DbSet<Folder> Folders { get; set; }
		public DbSet<File> Files { get; set; }

		public DataContext(DbContextOptions<DataContext> options) : base(options)
		{
			Database.EnsureCreated();
			Batteries.Init();
		}
	}
}
