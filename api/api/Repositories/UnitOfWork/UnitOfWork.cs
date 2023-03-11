using api.DbContexts;

namespace api.Repositories.UnitOfWork
{
	public class UnitOfWork : IDisposable
	{
		private DataContext _context { get; }

		public UserRepository UserRepository { get; }
		public FolderRepository FolderRepository { get; }

		public UnitOfWork(DataContext context)
		{
			_context = context;

			UserRepository = new UserRepository(_context);
			FolderRepository = new FolderRepository(_context);
		}

		public void Dispose()
		{
			_context.Dispose();
			GC.SuppressFinalize(this);
		}
	}
}
