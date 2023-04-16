using api.Entities.FileHierarchyNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchy
{
	public class HierarchyRemovalService
	{
		private readonly UnitOfWork _UoW;
		public HierarchyRemovalService(UnitOfWork uoW)
		{
			_UoW = uoW;
		}

		private void DeleteFileFromDisk(string path)
		{
			System.IO.File.Delete($"{AppDirectories.CloudData}\\{path}");
		}
		private void DeleteFileWithoutDBSaving(File file)
		{
			_UoW.FileRepository.Delete(file);

			DeleteFileFromDisk(file.Path);
		}
		private async Task DeleteFolderWithoutDBSaving(Folder folder)
		{
			_UoW.FolderRepository.Delete(folder);

			List<File> files = await _UoW.FileRepository
				.GetByFolderId(folder.Id)
				.AsNoTracking()
				.ToListAsync();

			foreach (File file in files)
			{
				DeleteFileWithoutDBSaving(file);
			}

			List<Folder> childFolders = await _UoW.FolderRepository
				.GetByParentId(folder.Id)
				.AsNoTracking()
				.ToListAsync();

			foreach (Folder childFolder in childFolders)
			{
				await DeleteFolderWithoutDBSaving(childFolder);
			}
		}
		public async Task DeleteFile(Guid userId, Guid fileId)
		{
			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null)
			{ throw new ApiException(ApiExceptionCode.FileNotFound); }
			if (file.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			DeleteFileWithoutDBSaving(file);

			await _UoW.FileRepository.SaveAsync();
		}

		public async Task DeleteFolder(Guid userId, Guid folderId)
		{
			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }
			if (folder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			if (folder.IsRoot)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			await DeleteFolderWithoutDBSaving(folder);

			await _UoW.FolderRepository.SaveAsync();
		}
	}
}
