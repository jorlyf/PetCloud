using System.ComponentModel.DataAnnotations.Schema;

namespace api.Entities.FileHierarchyNS
{
	public class Folder : IEntity	
	{
		public Guid Id { get; set; }
		public Guid? ParentId { get; set; }
		public required Guid UserId { get; set; }
		[NotMapped]
		public bool IsRoot { get => ParentId == null; }
		public required string Name { get; set; }
		public required string Path { get; set; }
		public required IEnumerable<File> Files { get; set; }
	}
}
