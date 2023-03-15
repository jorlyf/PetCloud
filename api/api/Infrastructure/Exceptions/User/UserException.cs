namespace api.Infrastructure.Exceptions.User
{
	public enum UserExceptionReasonCode
	{
		UserDoesntExist
	}
	public class UserException : ApiExceptionBase
	{
		public UserException(UserExceptionReasonCode reason)
		{
			Type = "User";
			Code = (int)reason;
		}
	}
}
