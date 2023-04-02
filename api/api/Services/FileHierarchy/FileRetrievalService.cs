using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchyServicesNS
{
	public class FileRetrievalService
	{
		private readonly UnitOfWork _UoW;
		public FileRetrievalService(UnitOfWork uoW)
		{
			_UoW = uoW;
		}

		public async Task<FileStream> GetFileStream(Guid userId, Guid fileId)
		{
			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null)
			{ throw new ApiException(ApiExceptionCode.NotFound, "File not found."); }
			if (file.UserId != userId)
			{ throw new ApiException(ApiExceptionCode.IncorrectResponseData, "Access denied."); }

			FileStream stream = new FileStream(
				$"{AppDirectories.CloudData}\\{file.Path}",
				FileMode.Open, FileAccess.Read, FileShare.Read);
			return stream;
		}
	}
}
