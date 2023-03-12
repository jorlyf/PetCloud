namespace api.Services.FileHierarchy
{
	public class FileCreator
	{
		public FileCreator() { }

		public void CreateEmptyFile(string filePath)
		{
			File.Create(filePath);
		}
	}
}
