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
			if (file.UserId != user.Id) throw new NotImplementedException();

			FileStream stream = new FileStream($"{AppDirectories.CloudData}\\{file.Path}", FileMode.Open, FileAccess.Read, FileShare.Read);
			return stream;
		}
	}
}
