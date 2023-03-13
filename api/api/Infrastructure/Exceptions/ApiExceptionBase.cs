namespace api.Infrastructure.Exceptions
{
	public abstract class ApiExceptionBase : Exception, IApiException
	{
		public string Type { get; protected set; }
		public int Code { get; protected set; }

		public ApiErrorData GetData() => new ApiErrorData(this);
	}
}
