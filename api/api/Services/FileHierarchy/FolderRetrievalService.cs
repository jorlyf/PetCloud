using api.Entities.FileHierarchy;
using api.Entities.User;
using api.Infrastructure.Exceptions.Retrieving;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

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
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new RetrievingException(RetrievingExceptionReasonCode.UserDoesntExist);

			Folder? root = await _UoW.FolderRepository
				.GetById(user.RootFolderId)
				.Include(x => x.Files)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (root == null) throw new RetrievingException(RetrievingExceptionReasonCode.FolderDoesntExist);

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
			if (user == null) throw new RetrievingException(RetrievingExceptionReasonCode.UserDoesntExist);

			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.Include(x => x.Files)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null) throw new RetrievingException(RetrievingExceptionReasonCode.FolderDoesntExist);

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
