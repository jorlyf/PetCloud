namespace api.Infrastructure.Exceptions
{
	public class InternalException : ApiExceptionBase
	{
		public InternalException()
		{
			Type = "Internal";
			Code = 500;
		}
	}
}
