using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace api.Services.Authorization
{
	public class JwtService
	{
		private IConfiguration _configuration { get; }
		public JwtService(IConfiguration configuration)
		{
			_configuration = configuration;
		}


		public string GenerateToken(Entities.User.User user)
		{
			Claim[] claims = new[]
			{
				new Claim("id", user.Id.ToString()),
				new Claim("login", user.Login)
			};

			SymmetricSecurityKey key = new(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
			SigningCredentials signIn = new(key, SecurityAlgorithms.HmacSha256);
			JwtSecurityToken token = new(
				claims: claims,
				expires: DateTime.UtcNow.AddDays(30),
				signingCredentials: signIn);

			return new JwtSecurityTokenHandler().WriteToken(token);
		}
	}
}
