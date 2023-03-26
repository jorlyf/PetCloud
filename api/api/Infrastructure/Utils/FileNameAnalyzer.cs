using api.Entities.FileHierarchyNS;

namespace api.Infrastructure.Utils
{
	public static class FileNameAnalyzer
	{
		public static FileType AnalyzeExtension(string fileName)
		{
			string? extension = Path.GetExtension(fileName);
			if (extension == null) { return FileType.Undefined; }

			switch (extension)
			{
				case ".png":
				case ".jpg":
				case ".jpeg":
					return FileType.Picture;
				case ".mp4":
					return FileType.Video;
				case ".txt":
					return FileType.Text;

				default: return FileType.Undefined;
			}
		}

		public static string GenerateFileName()
		{
			return Guid.NewGuid().ToString();
		}
	}
}
