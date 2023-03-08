namespace api.Infrastructure.Exceptions.Authorization
{
	public enum AuthorizationExceptionReasonCode
	{
		UserLoginExist,
		IncorrectLoginData
	}
	public class AuthorizationException : Exception, IApiException
	{
		public string Type { get; }
		public int Code { get; }

		public AuthorizationException(AuthorizationExceptionReasonCode reason)
		{
			Code = (int)reason;
			Type = "Authorization";
		}
	}
}
