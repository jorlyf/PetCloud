using api.Entities.FileHierarchy;
using api.Entities.User;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchy.File;

namespace api.Services.FileHierarchy
{
	public class FileHierarchyCreationService
	{
		private readonly UnitOfWork _UoW;
		public FileHierarchyCreationService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task CreateEmptyFolder(Guid userId, Guid parentId, string folderName)
		{
			Folder? parentFolder = await _UoW.FolderRepository.GetById(parentId).FirstOrDefaultAsync();
			if (parentFolder == null) { throw new NotImplementedException(); }

			Folder createdFolder = new()
			{
				ParentId = parentId,
				UserId = userId,
				Name = folderName,
				Path = $"{parentFolder.Path}\\{folderName}",
				Files = Enumerable.Empty<File>()
			};
			await _UoW.FolderRepository.AddAsync(createdFolder);
			await _UoW.FolderRepository.SaveAsync();
		}
		public async Task CreateRootFolder(User user)
		{
			Folder createdFolder = new()
			{
				UserId = user.Id,
				Name = "Root",
				Path = $"{user.Login}\\Root",
				Files = Enumerable.Empty<File>()
			};
			await _UoW.FolderRepository.AddAsync(createdFolder);
			user.RootFolderId = createdFolder.Id;

			await _UoW.FolderRepository.SaveAsync();
		}
	}
}
