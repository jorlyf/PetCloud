namespace api.Infrastructure.Exceptions
{
	public interface IApiException
	{
		public string Type { get; }
		public int Code { get; }
	}
}
