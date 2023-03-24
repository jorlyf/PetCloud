using api.Entities.FileHierarchyNS;
using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace api.Services.FileHierarchyServicesNS
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
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new ApiException(ApiExceptionCode.NotFound, "User not found.");

			Folder? root = await _UoW.FolderRepository
				.GetById(user.RootFolderId)
				.Include(x => x.Files)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (root == null) throw new ApiException(ApiExceptionCode.NotFound, "Root folder not found.");

			IEnumerable<Folder> childs = await GetFolderChilds(userId, root.Id);

			FolderDTO dto = FolderDTO.GetDTO(root, childs);
			return dto;
		}
		public async Task<FolderDTO> GetFolderDTOById(Guid userId, Guid folderId)
		{
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new ApiException(ApiExceptionCode.NotFound, "User not found.");

			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.Include(x => x.Files)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null) throw new ApiException(ApiExceptionCode.NotFound, "Folder not found.");
			if (folder.UserId != user.Id) throw new NotImplementedException();

			IEnumerable<Folder> childs = await GetFolderChilds(userId, folder.Id);

			FolderDTO dto = FolderDTO.GetDTO(folder, childs);
			return dto;
		}

		private async Task<IEnumerable<Folder>> GetFolderChilds(Guid userId, Guid folderId)
		{
			return await _UoW.FolderRepository
				.GetByParentId(userId, folderId)
				.Include(x => x.Files)
				.AsNoTracking()
				.ToListAsync();
		}
	}
}
