using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using File = api.Entities.FileHierarchyNS.File;

namespace api.Services.FileHierarchy
{
	public class FileDownloaderService
	{
		private readonly UnitOfWork _UoW;
		public FileDownloaderService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task<string> GetPhysicalFilePath(Guid userId, Guid fileId)
		{
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new ApiException(ApiExceptionCode.NotFound, "User not found.");

			File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null) throw new ApiException(ApiExceptionCode.NotFound, "File not found.");
			if (file.UserId != user.Id) throw new ApiException(ApiExceptionCode.IncorrectResponseData);

			return $"{AppDirectories.CloudData}\\{file.Path}";
		}
	}
}
