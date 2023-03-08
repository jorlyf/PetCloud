namespace api.Infrastructure.Exceptions
{
	public class InternalException : Exception, IApiException
	{
		public string Type { get; }
		public int Code { get; }
		public InternalException()
		{
			Type = "Internal";
			Code = 500;
		}
	}
}
