using api.Entities.FileHierarchyNS;
using api.Infrastructure.Exceptions;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchy
{
	public class HierarchyMovingService
	{
		private readonly UnitOfWork _UoW;
		public HierarchyMovingService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task MoveFolderAsync(Guid userId, Guid folderId, Guid targetFolderId)
		{
			Task<Folder?> folderTask = _UoW.FolderRepository
				.GetById(folderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			Task<Folder?> targetFolderTask = _UoW.FolderRepository
				.GetById(targetFolderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			Task.WaitAll(folderTask, targetFolderTask);
			Folder? folder = folderTask.Result;
			Folder? targetFolder = targetFolderTask.Result;

			if (folder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }
			if (targetFolder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }

			if (folder.UserId != userId || targetFolder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			if (await _UoW.FolderRepository.FolderExist(targetFolderId, folder.Name)) // ???? maybe rename
			{ throw new ApiException(ApiExceptionCode.FolderWithThisNameExist); }

			folder.ParentId = targetFolder.Id;

			_UoW.FolderRepository.Update(folder);
			await _UoW.FolderRepository.SaveAsync();
		}

		public async Task MoveFileAsync(Guid userId, Guid fileId, Guid targetFolderId)
		{
			Task<File?> fileTask = _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			Task<Folder?> targetFolderTask = _UoW.FolderRepository
				.GetById(targetFolderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			Task.WaitAll(fileTask, targetFolderTask);
			File? file = fileTask.Result;
			Folder? targetFolder = targetFolderTask.Result;

			if (file == null)
			{ throw new ApiException(ApiExceptionCode.FileNotFound); }
			if (targetFolder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }

			if (file.UserId != userId || targetFolder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			if (await _UoW.FileRepository.FileExist(targetFolderId, file.Name)) // ???? maybe rename
			{ throw new ApiException(ApiExceptionCode.FileWithThisNameExist); }

			file.FolderId = targetFolder.Id;
			
			_UoW.FileRepository.Update(file);
			await _UoW.FileRepository.SaveAsync();
		}
	}
}
