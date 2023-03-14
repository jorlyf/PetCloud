namespace api.Infrastructure.Exceptions.HierarchyCreation
{
	public enum HierarchyCreationExceptionReasonCode
	{
		UserDoesntExist,
		FolderDoesntExist,
	}
	public class HierarchyCreationException : ApiExceptionBase
	{
		public HierarchyCreationException(HierarchyCreationExceptionReasonCode reason)
		{
			Type = "";
			Code = (int)reason;
		}
	}
}
