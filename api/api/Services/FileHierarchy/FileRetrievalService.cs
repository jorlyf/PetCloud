using api.Infrastructure.Exceptions.Retrieving;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace api.Services.FileHierarchy
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
			Entities.User.User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new RetrievingException(RetrievingExceptionReasonCode.UserDoesntExist);

			Entities.FileHierarchy.File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null) throw new RetrievingException(RetrievingExceptionReasonCode.FileDoesntExist);
			if (file.UserId != userId) throw new NotImplementedException();

			FileStream stream = new FileStream($"{AppDirectories.CloudData}\\{file.Path}", FileMode.Open);
			return stream;
		}
	}
}
