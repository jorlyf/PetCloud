namespace api.Infrastructure.Exceptions.Retrieving
{
	public enum RetrievingExceptionReasonCode
	{
		UserDoesntExist,
		FolderDoesntExist
	}
	public class RetrievingException : ApiExceptionBase
	{
		public RetrievingException(RetrievingExceptionReasonCode reason)
		{
			Type = "Retrieving";
			Code = (int)reason;
		}
	}
}
