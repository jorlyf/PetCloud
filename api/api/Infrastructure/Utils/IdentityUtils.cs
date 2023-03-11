using System.Security.Claims;

namespace api.Infrastructure.Utils
{
	public static class IdentityUtils
	{
		public static Guid GetAuthorizedUserId(ClaimsPrincipal user)
		{
			return Guid.Parse(user.Claims.First(x => x.Type == "id").Value);
		}
	}
}
