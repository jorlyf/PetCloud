using Microsoft.AspNetCore.Diagnostics;
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
						if (exception is ApiExceptionBase apiException) { errorData = apiException.GetData(); }
						else { errorData = new InternalException().GetData(); }

						context.Response.StatusCode = errorData.Code;
						await context.Response.WriteAsync(errorData.ToString());
					}
				});
			});
		}
	}
}
