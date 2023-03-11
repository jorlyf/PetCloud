using api.DbContexts;
using api.Entities.FileHierarchy;
using api.Repositories.Base;

namespace api.Repositories
{
	public class FolderRepository : RepositoryBase<Folder>
	{
		public FolderRepository(DataContext context) : base(context) { }

		public IQueryable<Folder> GetByPath(Guid userId, string path)
		{
			return Set.Where(folder => folder.UserId == userId && folder.Path == path);
		}
		public IQueryable<Folder> GetByParentId(Guid userId, Guid parentId) 
		{
			return Set.Where(folder => folder.UserId == userId && folder.ParentId == parentId);
		}
	}
}
