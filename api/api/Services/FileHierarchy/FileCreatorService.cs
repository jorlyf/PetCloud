namespace api.Services.FileHierarchyServicesNS
{
	public class FileCreatorService
	{
		public FileCreatorService() { }

		public void CreateEmptyFile(string filePath)
		{
			File.Create(filePath).Close();
		}

		public async Task SaveFileAsync(IFormFile file, string path)
		{
			using (FileStream stream = new FileStream(path, FileMode.CreateNew))
			{
				await file.CopyToAsync(stream);
				stream.Flush();
			}
		}
	}
}
