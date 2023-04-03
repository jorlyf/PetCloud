using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace api.Infrastructure.Exceptions
{
	public static class ExceptionMiddleware
	{
		public static Task HandleExceptionAsync(HttpContext context)
		{
			IExceptionHandlerFeature? contextFeature = context.Features.Get<IExceptionHandlerFeature>();
			Exception? exception = contextFeature?.Error;
			if (exception == null)
			{
				return null;
			}
			string? acceptLanguage = context.Request.Headers["Accept-Language"];
			Language language = ExceptionMessageTranslator
				.GetLanguageFromAcceptLanguageHeader(acceptLanguage);

			ApiErrorData errorData;
			if (exception is ApiException apiException)
			{
				errorData = apiException.GetData(language);
				context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
			}
			else
			{
				errorData = new InternalApiException().GetData(language);
				context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
			}

			return context.Response.WriteAsync(errorData.ToString());
		}
	}
}
