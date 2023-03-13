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
			FolderDTO dto = FolderDTO.GetDTO(root, childs);
			return dto;
		}
		public async Task<FolderDTO> GetFolderDTOById(Guid userId, Guid folderId)
		{
			throw new NotImplementedException();
		}
	}
}
