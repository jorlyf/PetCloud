namespace api.Infrastructure.Exceptions
{
	public enum ApiExceptionCode
	{
		Internal,
		NotFound,
		IncorrectResponseData
	}

	public class ApiException : Exception
	{
		public ApiExceptionCode Code { get; protected set; }

		public ApiException(ApiExceptionCode code, string message) : base(message)
		{
			Code = code;
		}
		public ApiException(ApiExceptionCode code)
		{
			Code = code;
		}

		public ApiErrorData GetData() => new ApiErrorData(this);
	}
}
