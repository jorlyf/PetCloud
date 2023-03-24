namespace api.Entities.FileHierarchyNS
{
	public class FileDTO
	{
		public required Guid Id { get; set; }
		public required Guid FolderId { get; set; }
		public required FileType Type { get; set; }
		public required string Name { get; set; }

		public static FileDTO GetDTO(File model)
		{
			return new FileDTO()
			{
				Id = model.Id,
				FolderId = model.FolderId,
				Type = model.Type,
				Name = model.Name
			};
		}
	}
}
