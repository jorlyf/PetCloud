using api.DbContexts;
using api.Entities.FileHierarchyNS;
using api.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
	public class FolderRepository : RepositoryBase<Folder>
	{
		public FolderRepository(DataContext context) : base(context) { }

		public IQueryable<Folder> GetByParentId(Guid parentId) 
		{
			return Set.Where(folder => folder.ParentId == parentId);
		}
		public Task<bool> FolderExist(Guid parentFolderId, string folderName)
		{
			return Set.AnyAsync(folder => folder.ParentId == parentFolderId && folder.Name == folderName);
		}
	}
}
