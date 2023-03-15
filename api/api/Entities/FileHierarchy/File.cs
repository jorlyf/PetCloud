using Microsoft.EntityFrameworkCore;

namespace api.Entities.FileHierarchy
{
	public enum FileType : byte
	{
		Undefined,
		Text,
		Picture,
		Video
	}
	[Index(nameof(Path), IsUnique = true)]
	public class File : IEntity
	{
		public Guid Id { get; set; }
		public required Guid FolderId { get; set; }
		public required Guid UserId { get; set; }
		public required FileType Type { get; set; }
		public required string Name { get; set; }
		public required string Path { get; set; }
	}
}
