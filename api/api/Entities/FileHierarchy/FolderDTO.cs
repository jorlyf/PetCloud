namespace api.Entities.FileHierarchy
{
	public class FolderDTO
	{
		public required Guid Id { get; set; }
		public required Guid? ParentId { get; set; }
		public required bool IsRoot { get; set; }
		public required string Name { get; set; }
		public required IEnumerable<FolderDTO> ChildFolders { get; set; }
		public required IEnumerable<FileDTO> Files { get; set; }
	}
}
