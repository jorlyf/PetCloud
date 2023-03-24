using api.Entities.FileHierarchyNS;
using api.Infrastructure.Utils;
using api.Services.FileHierarchyServicesNS;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class FileController : ControllerBase
	{
		private readonly FileHierarchyCreationService _fileHierarchyCreationService;
		private readonly FileEditorService _fileEditorService;

		public FileController(
			FileHierarchyCreationService fileHierarchyCreationService,
			FileEditorService fileEditorService
			)
		{
			_fileHierarchyCreationService = fileHierarchyCreationService;
			_fileEditorService = fileEditorService;
		}

		[HttpPost]
		[Route("CreateEmptyFolder")]
		public async Task<ActionResult<FolderDTO>> CreateEmptyFolder(Guid parentFolderId, string folderName)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			FolderDTO dto = await _fileHierarchyCreationService.CreateEmptyFolder(userId, parentFolderId, folderName);
			return Ok(dto);
		}

		[HttpPost]
		[Route("CreateEmptyFile")]
		public async Task<ActionResult<FileDTO>> CreateEmptyFile(Guid folderId, string fileName)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			FileDTO dto = await _fileHierarchyCreationService.CreateEmptyFile(userId, folderId, fileName);
			return Ok(dto);
		}

		[HttpPost]
		[Route("UpdateTextFile")]
		public async Task<ActionResult> UpdateTextFile(Guid fileId)
		{
			string content;
			using (StreamReader reader = new StreamReader(Request.Body, Encoding.UTF8))
			{
				content = await reader.ReadToEndAsync(); // returns raw data which is sent in body
			}
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _fileEditorService.UpdateTextFile(userId, fileId, content);
			return Ok();
		}
	}
}
