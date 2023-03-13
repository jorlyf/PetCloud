using api.Entities.FileHierarchy;
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
	public class RetrievalController : ControllerBase
	{
		private readonly FolderRetrievalService _folderRetrievalService;

		public RetrievalController(FolderRetrievalService folderRetrievalService)
		{
			_folderRetrievalService = folderRetrievalService;
		}

		[HttpGet]
		[Route("GetRootFolder")]
		public async Task<ActionResult<FolderDTO>> GetRootFolder()
		{
			try
			{
				Guid userId = IdentityUtils.GetAuthorizedUserId(User);
				FolderDTO dto = await _folderRetrievalService.GetRootFolderDTO(userId);
				return Ok(dto);
			}
			catch (ApiExceptionBase ex)
			{
				return BadRequest(ex.GetData());
			}
			catch (Exception)
			{
				return BadRequest(new InternalException().GetData());
			}
		}
	}
}
