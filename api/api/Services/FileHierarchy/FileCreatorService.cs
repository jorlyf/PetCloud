namespace api.Services.FileHierarchyServicesNS
{
	public class FileCreatorService
	{
		public FileCreatorService() { }

		public void CreateEmptyFile(string filePath)
		{
			File.Create(filePath).Close();
		}
	}
}
