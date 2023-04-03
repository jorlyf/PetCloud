using System.Text.Json;

namespace api.Infrastructure.Exceptions
{
	public struct ApiErrorData
	{
		public int Code { get; set; }
		public string Message { get; set; }

		public ApiErrorData(ApiException exception, Language language)
		{
			Code = (int)exception.Code;
			Message = ExceptionMessageTranslator.GetMessage(exception.Code, language);
		}

		public override string ToString()
		{
			return JsonSerializer.Serialize(this);
		}
	}
}
