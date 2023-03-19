namespace api.Infrastructure.Exceptions.FileEditing
{
	public enum FileEditingExceptionReasonCode
	{
		UserDoesntExist,
		FileDoesntExist
	}
	public class FileEditingException : ApiExceptionBase
	{
		public FileEditingException(FileEditingExceptionReasonCode reason)
		{
			Type = "FileEditing";
			Code = (int)reason;
		}
	}
}
