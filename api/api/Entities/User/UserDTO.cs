namespace api.Entities.UserNS
{
	public class UserDTO
	{
		public required string Login { get; set; }
		public string? AvatarUrl { get; set; }

		public static UserDTO GetDTO(User model)
		{
			return new UserDTO()
			{
				Login = model.Login,
				AvatarUrl = model.AvatarUrl
			};
		}
	}
}
