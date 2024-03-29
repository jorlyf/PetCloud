using api.DbContexts;
using api.Infrastructure.Exceptions;
using api.Infrastructure.StartupActions;
using api.Infrastructure.Utils;
using api.Repositories.UnitOfWork;
using api.Services.AuthorizationServicesNS;
using api.Services.FileHierarchy;
using api.Services.FileHierarchyServicesNS;
using api.Services.UserServiceNS;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

WebApplicationBuilder builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

builder.Services.AddDbContext<DataContext>(options =>
{
	options.UseSqlite($"Data Source={Environment.CurrentDirectory}/PetCloud.db");
	if (builder.Environment.IsDevelopment())
	{
		options.LogTo(Console.WriteLine, LogLevel.Warning);
	}
});

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme).AddJwtBearer(options =>
{
	options.RequireHttpsMetadata = false;
	options.SaveToken = true;
	options.TokenValidationParameters = new TokenValidationParameters()
	{
		ClockSkew = TimeSpan.Zero,
		RequireAudience = false,
		ValidateIssuer = false,
		ValidateAudience = false,
		ValidateLifetime = true,
		IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"]))
	};
});

#region Custom services
builder.Services.AddSingleton<HashService>();
builder.Services.AddSingleton<JwtService>();
builder.Services.AddSingleton<FileCreatorService>();

builder.Services.AddScoped<UnitOfWork>();

builder.Services.AddScoped<AuthorizationService>();
builder.Services.AddScoped<FileHierarchyCreationService>();
builder.Services.AddScoped<FileEditorService>();
builder.Services.AddScoped<FileUploaderService>();
builder.Services.AddScoped<DownloaderService>();
builder.Services.AddScoped<FolderRetrievalService>();
builder.Services.AddScoped<FileRetrievalService>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<HierarchyMovingService>();
builder.Services.AddScoped<HierarchyRemovalService>();
#endregion

builder.Services.AddCors(options =>
{
	options.AddPolicy("Development", policy =>
	{
		policy.WithOrigins("http://localhost:3000", "https://localhost:3000")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
	options.AddPolicy("Production", policy =>
	{
		policy.WithOrigins("http://localhost", "https://localhost")
			.AllowAnyHeader()
			.AllowAnyMethod()
			.AllowCredentials();
	});
});

WebApplication app = builder.Build();

InitFolderCreator.CreateUserDataFolder(AppDirectories.CloudData);

if (app.Environment.IsDevelopment())
{
	app.UseCors("Development");
}
else
{
	app.UseCors("Production");
}

app.UseExceptionHandler(config =>
{
	config.Run(context =>
	{
		return ExceptionMiddleware.HandleExceptionAsync(context);
	});
});

app.UseHttpsRedirection();

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();
