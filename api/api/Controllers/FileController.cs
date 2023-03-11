using api.Infrastructure.Exceptions;
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
		[Route("CreateFolder")]
		public async Task<ActionResult> CreateFolder(Guid parentFolderId, string folderName)
		{
			try
			{
				Guid userId = IdentityUtils.GetAuthorizedUserId(User);
				await _fileHierarchyCreationService.CreateEmptyFolder(userId, parentFolderId, folderName);
				return Ok();
			}
			catch (Exception)
			{
				return BadRequest(new InternalException());
			}
		}
	}
}
