using api.Entities.FileHierarchyNS;
using api.Infrastructure.Utils;
using api.Services.FileHierarchy;
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
		private readonly FileUploaderService _fileUploaderService;
		private readonly HierarchyMovingService _hierarchyMovingService;
		private readonly HierarchyRemovalService _hierarchyRemovalService;

		public FileController(
			FileHierarchyCreationService fileHierarchyCreationService,
			FileEditorService fileEditorService,
			FileUploaderService fileUploaderService,
			HierarchyMovingService hierarchyMovingService,
			HierarchyRemovalService hierarchyRemovalService
			)
		{
			_fileHierarchyCreationService = fileHierarchyCreationService;
			_fileEditorService = fileEditorService;
			_fileUploaderService = fileUploaderService;
			_hierarchyMovingService = hierarchyMovingService;
			_hierarchyRemovalService = hierarchyRemovalService;
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

		[RequestFormLimits(ValueLengthLimit = int.MaxValue,
			MultipartBodyLengthLimit = long.MaxValue)]
		[DisableRequestSizeLimit]
		[HttpPost]
		[Route("UploadFiles")]
		public async Task<ActionResult> UploadFiles(Guid folderId, [FromForm] List<IFormFile> files)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _fileUploaderService.UploadFiles(userId, folderId, files);
			return Ok();
		}

		[HttpPost]
		[Route("MoveFolder")]
		public async Task<ActionResult> MoveFolder(Guid folderId, Guid targetFolderId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _hierarchyMovingService.MoveFolderAsync(userId, folderId, targetFolderId);
			return Ok();
		}

		[HttpPost]
		[Route("MoveFile")]
		public async Task<ActionResult> MoveFile(Guid fileId, Guid targetFolderId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _hierarchyMovingService.MoveFileAsync(userId, fileId, targetFolderId);
			return Ok();
		}

		[HttpDelete]
		[Route("DeleteFile")]
		public async Task<ActionResult> DeleteFile(Guid fileId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _hierarchyRemovalService.DeleteFile(userId, fileId);
			return Ok();
		}

		[HttpDelete]
		[Route("DeleteFolder")]
		public async Task<ActionResult> DeleteFolder(Guid folderId)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);
			await _hierarchyRemovalService.DeleteFolder(userId, folderId);
			return Ok();
		}
	}
}
