namespace api.Entities.FileHierarchy
{
	public class FileDTO
	{
		public required Guid Id { get; set; }
		public required Guid FolderId { get; set; }
		public required FileType Type { get; set; }
		public required string Name { get; set; }
	}
}
