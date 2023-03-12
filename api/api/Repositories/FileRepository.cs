using api.DbContexts;
using api.Repositories.Base;
using File = api.Entities.FileHierarchy.File;

namespace api.Repositories
{
	public class FileRepository : RepositoryBase<File>
	{
		public FileRepository(DataContext context) : base(context) { }

		public IQueryable<File> GetByFolderId(Guid userId, Guid folderId)
		{
			return Set.Where(folder => folder.UserId == userId && folder.FolderId == folderId);
		}
	}
}
