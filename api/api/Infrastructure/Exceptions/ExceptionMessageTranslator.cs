namespace api.Infrastructure.Exceptions
{
	public enum Language
	{
		En,
		Ru
	}
	public static class ExceptionMessageTranslator
	{
		private static Dictionary<ApiExceptionCode, Dictionary<Language, string>> _dict;

		static ExceptionMessageTranslator()
		{
			_dict = new()
			{
				{
					ApiExceptionCode.Internal, new()
					{
						{Language.En, "Internal server error." },
						{Language.Ru, "Ошибка сервера." }
					}
				},
				{
					ApiExceptionCode.AccessDenied, new()
					{
						{Language.En, "Access denied." },
						{Language.Ru, "Доступ запрещен." }
					}
				},
				{
					ApiExceptionCode.FileNotFound, new()
					{
						{Language.En, "File not found." },
						{Language.Ru, "Файл не найден." }
					}
				},
				{
					ApiExceptionCode.FolderNotFound, new()
					{
						{Language.En, "Folder not found." },
						{Language.Ru, "Папка не найдена." }
					}
				},
				{
					ApiExceptionCode.FileWithThisNameExist, new()
					{
						{Language.En, "File with this name exist." },
						{Language.Ru, "Файл с таким именем уже существует." }
					}
				},
				{
					ApiExceptionCode.FolderWithThisNameExist, new()
					{
						{Language.En, "Folder with this name exist." },
						{Language.Ru, "Папка с таким именем уже существует." }
					}
				},
				{
					ApiExceptionCode.LoginDataNotValid, new()
					{
						{Language.En, "Login data is not valid." },
						{Language.Ru, "Логин или пароль не верны." }
					}
				},
				{
					ApiExceptionCode.UserLoginExist, new()
					{
						{Language.En, "This login already exist." },
						{Language.Ru, "Логин занят другим пользователем." }
					}
				},
				{
					ApiExceptionCode.UserNotFound, new()
					{
						{Language.En, "User not found." },
						{Language.Ru, "Пользователь не найден." }
					}
				}
			};
		}

		public static string GetMessage(ApiExceptionCode code, Language language)
		{
			return _dict[code][language];
		}

		public static Language GetLanguageFromAcceptLanguageHeader(string? acceptLanguage)
		{
			switch (acceptLanguage)
			{
				case "ru-RU":
					return Language.Ru;
				default:
					return Language.En;
			}
		}
	}
}
