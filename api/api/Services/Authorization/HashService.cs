using System.Security.Cryptography;
using System.Text;

namespace api.Services.AuthorizationServicesNS
{
	public class HashService
	{
		public string GetHash(string value)
		{
			byte[] hashedBuffer = SHA256.HashData(Encoding.UTF8.GetBytes(value));
			return Encoding.UTF8.GetString(hashedBuffer);
		}
	}
}
