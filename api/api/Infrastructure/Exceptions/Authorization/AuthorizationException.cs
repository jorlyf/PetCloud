namespace api.Infrastructure.Exceptions.Authorization
{
	public enum AuthorizationExceptionReasonCode
	{
		UserLoginExist,
		IncorrectLoginData
	}
	public class AuthorizationException : ApiExceptionBase
	{
		public AuthorizationException(AuthorizationExceptionReasonCode reason)
		{
			Type = "Authorization";
			Code = (int)reason;
		}
	}
}
