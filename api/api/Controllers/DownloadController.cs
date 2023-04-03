using api.Infrastructure.Utils;
using api.Services.FileHierarchy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class DownloadController : ControllerBase
	{
		private readonly DownloaderService _fileDownloaderService;
		public DownloadController(DownloaderService fileDownloaderService)
		{
			_fileDownloaderService = fileDownloaderService;
		}

		[HttpGet]
		[Route("DownloadFile")]
		public async Task<PhysicalFileResult> DownloadFile(Guid fileId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			string filePath = await _fileDownloaderService.GetPhysicalFilePath(userId, fileId);
			return PhysicalFile(filePath, "application/octet-stream");
		}

		[HttpGet]
		[Route("DownloadFolder")]
		public async Task<IActionResult> DownloadFolder(Guid folderId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			using MemoryStream stream = await _fileDownloaderService.GetFolderStreamToDownload(userId, folderId);
			GC.Collect(); // optional
			return File(stream.ToArray(), "application/zip");
		}
	}
}
