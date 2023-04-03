namespace api.Infrastructure.Exceptions
{
	public class InternalApiException : ApiException
	{
		public InternalApiException() : base(ApiExceptionCode.Internal)
		{

		}
	}
}
