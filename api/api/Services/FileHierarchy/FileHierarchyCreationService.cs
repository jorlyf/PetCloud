using api.Entities.FileHierarchyNS;
using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchyServicesNS
{
	public class FileHierarchyCreationService
	{
		private readonly UnitOfWork _UoW;
		private readonly FileCreatorService _fileCreator;
		public FileHierarchyCreationService(UnitOfWork uow, FileCreatorService fileCreator)
		{
			_UoW = uow;
			_fileCreator = fileCreator;
		}

		public async Task<FileDTO> CreateEmptyFile(Guid userId, Guid folderId, string fileName)
		{
			if (await _UoW.FileRepository.FileExist(folderId, fileName))
			{ throw new ApiException(ApiExceptionCode.FileWithThisNameExist); }

			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }
			if (folder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			string fileNameOnDisk = FileNameAnalyzer.GenerateFileName();

			Folder rootFolder = await GetRootFolder(userId);

			File file = new()
			{
				FolderId = folderId,
				UserId = userId,
				Name = fileName,
				Path = $"{folder.Path}\\{fileNameOnDisk}",
				Type = FileNameAnalyzer.AnalyzeExtension(fileName)
			};
			await _UoW.FileRepository.AddAsync(file);
			await _UoW.FileRepository.SaveAsync();

			_fileCreator.CreateEmptyFile($"{AppDirectories.CloudData}\\{file.Path}");

			FileDTO dto = FileDTO.GetDTO(file);
			return dto;
		}
		public async Task<FolderDTO> CreateEmptyFolder(Guid userId, Guid parentId, string folderName)
		{
			Folder? parentFolder = await _UoW.FolderRepository.GetById(parentId).FirstOrDefaultAsync();
			if (parentFolder == null)
			{ throw new ApiException(ApiExceptionCode.FolderNotFound); }
			if (parentFolder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			Folder rootFolder = await GetRootFolder(userId);

			if (await _UoW.FolderRepository.FolderExist(parentId, folderName))
			{ throw new ApiException(ApiExceptionCode.FolderWithThisNameExist); }

			Folder createdFolder = new()
			{
				ParentId = parentId,
				UserId = userId,
				Name = folderName,
				Path = rootFolder.Path,
				Files = Enumerable.Empty<File>()
			};
			await _UoW.FolderRepository.AddAsync(createdFolder);
			await _UoW.FolderRepository.SaveAsync();

			FolderDTO dto = FolderDTO.GetDTO(createdFolder, Enumerable.Empty<Folder>());
			return dto;
		}
		public async Task CreateRootFolder(User user)
		{
			string folderNameOnDisk = FileNameAnalyzer.GenerateFileName();

			Folder createdFolder = new()
			{
				UserId = user.Id,
				Name = "Root",
				Path = folderNameOnDisk,
				Files = Enumerable.Empty<File>()
			};
			await _UoW.FolderRepository.AddAsync(createdFolder);
			user.RootFolderId = createdFolder.Id;

			await _UoW.FolderRepository.SaveAsync();

			Directory.CreateDirectory($"{AppDirectories.CloudData}\\{folderNameOnDisk}");
		}

		private async Task<Folder> GetRootFolder(Guid userId)
		{
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null)
			{ throw new ApiException(ApiExceptionCode.UserNotFound); }
			return await GetRootFolder(user);
		}
		private async Task<Folder> GetRootFolder(User user)
		{
			Folder? folder = await _UoW.FolderRepository
				.GetById(user.RootFolderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null) throw new ApiException(ApiExceptionCode.FolderNotFound);
			return folder;
		}
	}
}
