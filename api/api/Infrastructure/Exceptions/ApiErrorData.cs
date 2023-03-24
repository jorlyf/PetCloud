using System.Text.Json;

namespace api.Infrastructure.Exceptions
{
	public struct ApiErrorData
	{
		public int Code { get; set; }
		public string Message { get; set; }

		public ApiErrorData(ApiException exception)
		{
			Code = (int)exception.Code;
			Message = exception.Message;
		}

		public override string ToString()
		{
			return JsonSerializer.Serialize(this);
		}
	}
}
