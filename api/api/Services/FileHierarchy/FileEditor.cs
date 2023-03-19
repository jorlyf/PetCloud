using api.Infrastructure.Exceptions.FileEditing;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;
using System.IO;

namespace api.Services.FileHierarchy
{
	public class FileEditor
	{
		private readonly UnitOfWork _UoW;
		public FileEditor(UnitOfWork uoW)
		{
			_UoW = uoW;
		}

		public async Task UpdateTextFile(Guid userId, Guid fileId, string text)
		{
			Entities.User.User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new FileEditingException(FileEditingExceptionReasonCode.UserDoesntExist);

			Entities.FileHierarchy.File? file = await _UoW.FileRepository
				.GetById(fileId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (file == null) throw new FileEditingException(FileEditingExceptionReasonCode.FileDoesntExist);
			if (file.UserId != user.Id) throw new NotImplementedException();

			string absoluteFilePath = $"{AppDirectories.CloudData}\\{file.Path}";
			File.WriteAllText(absoluteFilePath, string.Empty);
			using (StreamWriter stream = new StreamWriter(absoluteFilePath))
			{
				await stream.WriteAsync(text);
			}
		}
	}
}
