using api.DbContexts;
using api.Entities;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories.Base
{
	public abstract class RepositoryBase<T> where T : class, IEntity
	{
		private readonly DataContext _context;
		public DbSet<T> Set { get; }

		public RepositoryBase(DataContext context)
		{
			_context = context;
			Set = context.Set<T>();
		}


		public IQueryable<T> GetById(Guid id)
		{

			return Set.Where(x => x.Id == id);
		}
		public IQueryable<T> GetManyByIds(IEnumerable<Guid> ids)
		{
			return Set.Where(x => ids.Contains(x.Id));
		}

		public IQueryable<T> GetAll()
		{
			return Set;
		}

		public async Task AddAsync(T item)
		{
			await Set.AddAsync(item);
		}

		public void Update(T item)
		{
			Set.Update(item);
		}

		public void Delete(T item)
		{
			Set.Remove(item);
		}

		public void Attach(T item)
		{
			Set.Attach(item);
		}

		public Task SaveAsync()
		{
			return _context.SaveChangesAsync();
		}
	}
}
