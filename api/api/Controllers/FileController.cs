using api.Entities.FileHierarchy;
using api.Infrastructure.Utils;
using api.Services.FileHierarchy;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class FileController : ControllerBase
	{
		private readonly FileHierarchyCreationService _fileHierarchyCreationService;

		public FileController(FileHierarchyCreationService fileHierarchyCreationService)
		{
			_fileHierarchyCreationService = fileHierarchyCreationService;
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
		public async Task<ActionResult> UpdateTextFile(Guid fileId, string text)
		{
			Guid userId = IdentityUtils.GetAuthorizedUserId(User);

			return Ok();
		}
	}
}
