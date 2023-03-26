using api.Entities.FileHierarchyNS;
using api.Infrastructure.Utils;
using api.Services.FileHierarchyServicesNS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class RetrievalController : ControllerBase
	{
		private readonly FolderRetrievalService _folderRetrievalService;
		private readonly FileRetrievalService _fileRetrievalService;

		public RetrievalController(FolderRetrievalService folderRetrievalService, FileRetrievalService fileRetrievalService)
		{
			_folderRetrievalService = folderRetrievalService;
			_fileRetrievalService = fileRetrievalService;
		}

		[HttpGet]
		[Route("GetRootFolder")]
		public async Task<ActionResult<FolderDTO>> GetRootFolder()
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			FolderDTO dto = await _folderRetrievalService.GetRootFolderDTO(userId);
			return Ok(dto);
		}

		[HttpGet]
		[Route("GetFolder")]
		public async Task<ActionResult<FolderDTO>> GetFolder(Guid folderId)
		{
			Console.WriteLine("папка запрошена");
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			FolderDTO dto = await _folderRetrievalService.GetFolderDTOById(userId, folderId);
			return Ok(dto);
		}

		[HttpGet]
		[Route("GetFileContent")]
		public async Task<IActionResult> GetFileContent(Guid fileId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			FileStream stream = await _fileRetrievalService.GetFileStream(userId, fileId);
			FileStreamResult result = new FileStreamResult(stream, "application/octet-stream");
			return result;
		}
	}
}
