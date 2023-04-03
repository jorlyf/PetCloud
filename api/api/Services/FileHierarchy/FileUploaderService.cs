using api.Entities.FileHierarchyNS;
using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using api.Services.FileHierarchyServicesNS;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchy
{
	public class FileUploaderService
	{
		private readonly UnitOfWork _UoW;
		private readonly FileCreatorService _fileCreatorService;

		public FileUploaderService(UnitOfWork uoW, FileCreatorService fileCreatorService)
		{
			_UoW = uoW;
			_fileCreatorService = fileCreatorService;
		}

		public async Task UploadFiles(Guid userId, Guid folderId, List<IFormFile> files)
		{
			Folder? folder = await _UoW.FolderRepository
				.GetById(folderId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (folder == null)
			{ throw new ApiException(ApiExceptionCode.FileNotFound); }
			if (folder.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.AccessDenied); }

			for (int i = 0; i < files.Count; i++)
			{
				IFormFile file = files[i];
				FileType type = FileNameAnalyzer.AnalyzeExtension(file.FileName);

				if (await _UoW.FileRepository.FileExist(folderId, file.FileName))
				{ throw new ApiException(ApiExceptionCode.FileWithThisNameExist); }

				string fileNameOnDisk = FileNameAnalyzer.GenerateFileName();

				File model = new File()
				{
					FolderId = folderId,
					UserId = userId,
					Name = file.FileName,
					Type = type,
					Path = $"{folder.Path}\\{fileNameOnDisk}"
				};

				await _fileCreatorService.SaveFileAsync(file, $"{AppDirectories.CloudData}\\{model.Path}");

				await _UoW.FileRepository.AddAsync(model);
			}

			await _UoW.FileRepository.SaveAsync();
		}
	}
}
