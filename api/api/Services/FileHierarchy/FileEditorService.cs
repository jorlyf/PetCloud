using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchyServicesNS
{
	public class FileEditorService
	{
		private readonly UnitOfWork _UoW;
		public FileEditorService(UnitOfWork uoW)
		{
			_UoW = uoW;
		}

		public async Task UpdateTextFile(Guid userId, Guid fileId, string content)
		{
			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null)
			{ throw new ApiException(ApiExceptionCode.NotFound, "File not found."); }
			if (file.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.IncorrectResponseData, "Access denied."); }

			string absoluteFilePath = $"{AppDirectories.CloudData}\\{file.Path}";
			await System.IO.File.WriteAllTextAsync(absoluteFilePath, string.Empty);
			using (StreamWriter stream = new StreamWriter(absoluteFilePath))
			{
				await stream.WriteAsync(content);
			}
		}
		public async Task RenameFile(Guid userId, Guid fileId, string fileName)
		{
			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null)
			{ throw new ApiException(ApiExceptionCode.NotFound, "File not found."); }
			if (file.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.IncorrectResponseData, "Access denied."); }

			if (await _UoW.FileRepository.FileExist(file.FolderId, fileName))
			{ throw new ApiException(ApiExceptionCode.IncorrectResponseData, "File with this name exist."); }

			file.Name = fileName;

			_UoW.FileRepository.Update(file);
			await _UoW.FileRepository.SaveAsync();
		}
	}
}
