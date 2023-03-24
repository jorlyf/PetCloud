using api.DbContexts;
using api.Entities.FileHierarchyNS;
using api.Repositories.Base;

namespace api.Repositories
{
	public class FolderRepository : RepositoryBase<Folder>
	{
		public FolderRepository(DataContext context) : base(context) { }

		public IQueryable<Folder> GetByParentId(Guid userId, Guid parentId) 
		{
			return Set.Where(folder => folder.UserId == userId && folder.ParentId == parentId);
		}
	}
}
