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

			string absoluteFilePath = $"{AppDirectories.CloudData}\\{file.Path}";
			System.IO.File.WriteAllText(absoluteFilePath, string.Empty);
			using (StreamWriter stream = new StreamWriter(absoluteFilePath))
			{
				await stream.WriteAsync(content);
			}
		}
	}
}
