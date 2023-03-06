using Microsoft.EntityFrameworkCore;
using System.ComponentModel.DataAnnotations;

namespace api.Entities.User
{
	[Index(nameof(Login), IsUnique = true)]
	public class User : IEntity
	{
		public Guid Id { get; set; }
		[StringLength(32, MinimumLength = 4)]
		[Required]
		public required string Login { get; set; }
		[Required]
		public required string PasswordHash { get; set; }
		public string? AvatarUrl { get; set; }
	}
}
