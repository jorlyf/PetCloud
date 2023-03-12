namespace api.Infrastructure.StartupActions
{
	public static class InitFolderCreator
	{
		public static void CreateUserDataFolder(string path)
		{
			if (!Directory.Exists(path))
			{
				Directory.CreateDirectory(path);
			}
		}
	}
}
