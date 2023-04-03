namespace api.Infrastructure.Exceptions
{
	public enum ApiExceptionCode
	{
		Internal,
		AccessDenied,
		FileNotFound,
		FolderNotFound,
		FileWithThisNameExist,
		FolderWithThisNameExist,
		LoginDataNotValid,
		UserLoginExist,
		UserNotFound
	}

	public class ApiException : Exception
	{
		public ApiExceptionCode Code { get; protected set; }

		public ApiException(ApiExceptionCode code)
		{
			Code = code;
		}

		public ApiErrorData GetData(Language language) => new ApiErrorData(this, language);
	}
}
