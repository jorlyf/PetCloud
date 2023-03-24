using Microsoft.AspNetCore.Diagnostics;
using System.Net;

namespace api.Infrastructure.Exceptions
{
	public static class ExceptionMiddlewareExtension
	{
		public static void ConfigureExceptionHandler(this IApplicationBuilder app)
		{
			app.UseExceptionHandler(appError =>
			{
				appError.Run(async context =>
				{
					IExceptionHandlerFeature? contextFeature = context.Features.Get<IExceptionHandlerFeature>();
					Exception? exception = contextFeature?.Error;
					if (exception != null)
					{
						ApiErrorData errorData;
						if (exception is ApiException apiException)
						{
							errorData = apiException.GetData();
							context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
						}
						else
						{
							errorData = new InternalApiException().GetData();
							context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
						}

						await context.Response.WriteAsync(errorData.ToString());
					}
				});
			});
		}
	}
}
