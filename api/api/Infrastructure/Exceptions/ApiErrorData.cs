namespace api.Infrastructure.Exceptions
{
	public struct ApiErrorData
	{
		public string Type { get; set; }
		public int Code { get; set; }

		public ApiErrorData(IApiException exception)
		{
			Type = exception.Type;
			Code = exception.Code;
		}
	}
}
