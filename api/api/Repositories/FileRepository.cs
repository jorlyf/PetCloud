using api.DbContexts;
using api.Repositories.Base;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Repositories
{
	public class FileRepository : RepositoryBase<File>
	{
		public FileRepository(DataContext context) : base(context) { }

		public IQueryable<File> GetByFolderId(Guid folderId)
		{
			return Set.Where(file => file.FolderId == folderId);
		}
		public Task<bool> FileExist(Guid parentFolderId, string fileName)
		{
			return Set.AnyAsync(file => file.FolderId == parentFolderId && file.Name == fileName);
		}
	}
}
