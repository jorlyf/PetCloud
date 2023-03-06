namespace api.Infrastructure.Exceptions.Auth
{
	public enum AuthExceptionReason
	{
		UserLoginExist,
		IncorrectLoginData
	}
	public class AuthException : Exception
	{
		public AuthExceptionReason Reason { get; }

		public AuthException(AuthExceptionReason reason)
		{
			Reason = reason;
		}
	}
}
