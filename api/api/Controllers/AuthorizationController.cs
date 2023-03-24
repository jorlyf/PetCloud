using api.Entities.AuthorizationNS;
using api.Services.AuthorizationServicesNS;
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
			string token = await _authorizationService.LoginAsync(loginData.Login, loginData.Password);
			LoginResponseDTO response = new LoginResponseDTO { Token = token };
			return Ok(response);
		}
		[HttpPost]
		[Route("Register")]
		public async Task<ActionResult<LoginResponseDTO>> Register([FromBody] LoginRequestDataDTO loginData)
		{
			string token = await _authorizationService.RegisterAsync(loginData.Login, loginData.Password);
			LoginResponseDTO response = new LoginResponseDTO { Token = token };
			return Ok(response);
		}

		[Authorize]
		[HttpPost]
		[Route("TokenLogin")]
		public ActionResult<LoginResponseDTO> TokenLogin()
		{
			return Ok();
		}
	}
}
