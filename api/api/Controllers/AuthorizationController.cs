using api.Entities.Authorization;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Exceptions.Authorization;
using api.Services.Authorization;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Route("api/[controller]")]
	[ApiController]
	public class AuthorizationController : ControllerBase
	{
		private readonly AuthorizationService _authorizationService;
		public AuthorizationController(AuthorizationService authorizationService)
		{
			_authorizationService = authorizationService;
		}

		[HttpPost]
		[Route("Login")]
		public async Task<ActionResult<LoginResponseDTO>> Login([FromBody] LoginRequestDataDTO loginData)
		{
			try
			{
				string token = await _authorizationService.LoginAsync(loginData.Login, loginData.Password);
				LoginResponseDTO response = new LoginResponseDTO { Token = token };
				return Ok(response);
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
		[HttpPost]
		[Route("Register")]
		public async Task<ActionResult<LoginResponseDTO>> Register([FromBody] LoginRequestDataDTO loginData)
		{
			try
			{
				string token = await _authorizationService.RegisterAsync(loginData.Login, loginData.Password);
				LoginResponseDTO response = new LoginResponseDTO { Token = token };
				return Ok(response);
			}
			catch (AuthorizationException ex)
			{
				return BadRequest(ex);
			}
			catch (Exception)
			{
				return BadRequest(new InternalException().GetData());
			}
		}

		[Authorize]
		[HttpPost]
		[Route("TokenLogin")]
		public ActionResult<LoginResponseDTO> TokenLogin()
		{
			try
			{
				return Ok();
			}
			catch (Exception)
			{
				return BadRequest(new InternalException().GetData());
			}
		}
	}
}
