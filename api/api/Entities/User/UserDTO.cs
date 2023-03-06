namespace api.Entities.User
{
	public class UserDTO
	{
		public required string Login { get; set; }
		public string? AvatarUrl { get; set; }
	}
}
