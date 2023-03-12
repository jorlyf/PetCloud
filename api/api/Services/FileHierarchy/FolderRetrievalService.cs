using api.Entities.FileHierarchy;
using api.Entities.User;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchy.File;

namespace api.Services.FileHierarchy
{
	public class FolderRetrievalService
	{
		private readonly UnitOfWork _UoW;

		public FolderRetrievalService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task<FolderDTO> GetRootFolderDTO(Guid userId)
		{
			User? user = await _UoW.UserRepository.GetById(userId).FirstOrDefaultAsync();
			if (user == null) throw new NotImplementedException();

			Folder? root = await _UoW.FolderRepository
				.GetById(user.RootFolderId)
				.Include(x => x.Files)
				.FirstOrDefaultAsync();
			if (root == null) throw new NotImplementedException();

			IEnumerable<Folder> childs = await _UoW.FolderRepository.GetByParentId(userId, root.Id).ToListAsync();
			FolderDTO dto = ProcessFolderDTO(root, childs);
			return dto;
		}
		public async Task<FolderDTO> GetFolderDTOById(Guid userId, Guid folderId)
		{
			throw new NotImplementedException();
		}

		private FolderDTO ProcessFolderDTO(Folder model, IEnumerable<Folder> childFolders)
		{
			return new FolderDTO()
			{
				Id = model.Id,
				ParentId = model.ParentId,
				IsRoot = model.IsRoot,
				Name = model.Name,
				ChildFolders = childFolders.Select(x => ProcessFolderDTO(x, Enumerable.Empty<Folder>())),
				Files = model.Files.Select(x => ProcessFileDTO(x))
			};
		}
		private FileDTO ProcessFileDTO(File model)
		{
			return new FileDTO()
			{
				Id = model.Id,
				FolderId = model.FolderId,
				Type = model.Type,
				Name = model.Name
			};
		}
	}
}
