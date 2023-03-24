namespace api.Entities.FileHierarchyNS
{
	public class FolderDTO
	{
		public required Guid Id { get; set; }
		public required Guid? ParentId { get; set; }
		public required bool IsRoot { get; set; }
		public required string Name { get; set; }
		public required IEnumerable<FolderDTO> ChildFolders { get; set; }
		public required IEnumerable<FileDTO> Files { get; set; }

		public static FolderDTO GetDTO(Folder model, IEnumerable<Folder> childFolders)
		{
			return new FolderDTO()
			{
				Id = model.Id,
				ParentId = model.ParentId,
				IsRoot = model.IsRoot,
				Name = model.Name,
				ChildFolders = childFolders.Select(x => GetDTO(x, Enumerable.Empty<Folder>())),
				Files = model.Files.Select(x => FileDTO.GetDTO(x))
			};
		}
	}
}
