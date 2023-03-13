using api.Entities.FileHierarchy;
using api.Entities.User;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchy.File;

namespace api.Services.FileHierarchy
{
	public class FileHierarchyCreationService
	{
		private readonly UnitOfWork _UoW;
		private readonly FileCreator _fileCreator;
		public FileHierarchyCreationService(UnitOfWork uow, FileCreator fileCreator)
		{
			_UoW = uow;
			_fileCreator = fileCreator;
		}

		public async Task CreateFile(Guid userId, Guid folderId, string fileName)
		{
			Folder? folder = await _UoW.FolderRepository.GetById(folderId).FirstOrDefaultAsync();
			if (folder == null) { throw new NotImplementedException(); }

			string fileNameOnDisk = GenerateFileName();

			Folder rootFolder = await GetRootFolder(userId);

			File file = new()
			{
				FolderId = folderId,
				UserId = userId,
				Name = fileName,
				Path = $"{rootFolder.Path}\\{fileNameOnDisk}",
				Type = AnalyzeFileExtension(fileName)
			};
			await _UoW.FileRepository.AddAsync(file);
			await _UoW.FileRepository.SaveAsync();

			_fileCreator.CreateEmptyFile($"{AppDirectories.CloudData}\\{file.Path}");
		}
		public async Task<FolderDTO> CreateEmptyFolder(Guid userId, Guid parentId, string folderName)
		{
			Folder? parentFolder = await _UoW.FolderRepository.GetById(parentId).FirstOrDefaultAsync();
			if (parentFolder == null) { throw new NotImplementedException(); }

			Folder rootFolder = await GetRootFolder(userId);

			Folder createdFolder = new()
			{
				ParentId = parentId,
				UserId = userId,
				Name = folderName,
				Path = $"{rootFolder.Path}\\{GenerateFileName()}",
				Files = Enumerable.Empty<File>()
			};
			await _UoW.FolderRepository.AddAsync(createdFolder);
			await _UoW.FolderRepository.SaveAsync();

			FolderDTO dto = FolderDTO.GetDTO(createdFolder, Enumerable.Empty<Folder>());
			return dto;
		}
		public async Task CreateRootFolder(User user)
		{
			string folderNameOnDisk = GenerateFileName();

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
		private string GenerateFileName()
		{
			return Guid.NewGuid().ToString();
		}
		private FileType AnalyzeFileExtension(string fileName)
		{
			string? extension = Path.GetExtension(fileName);
			if (extension == null) { return FileType.Undefined; }

			switch (extension)
			{
				case "png":
				case "jpg":
				case "jpeg":
					return FileType.Picture;
				case "mp4":
					return FileType.Video;
				case "txt":
					return FileType.Text;

				default: return FileType.Undefined;
			}
		}
		private async Task<Folder> GetRootFolder(Guid userId)
		{
			User? user = await _UoW.UserRepository.GetById(userId).FirstOrDefaultAsync();
			if (user == null) throw new Exception("User doesn't exist.");
			Folder? folder = await _UoW.FolderRepository.GetById(user.RootFolderId).FirstOrDefaultAsync();
			if (folder == null) throw new Exception("Root folder doesn't exist.");
			return folder;
		}
	}
}
