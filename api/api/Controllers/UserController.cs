﻿using api.Entities.User;
using api.Infrastructure.Exceptions;
using api.Infrastructure.Utils;
using api.Services.User;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
	[Authorize]
	[Route("api/[controller]")]
	[ApiController]
	public class UserController : ControllerBase
	{
		private readonly UserService _userService;

		public UserController(UserService userService)
		{
			_userService = userService;
		}

		[HttpGet]
		[Route("GetUser")]
		public async Task<ActionResult<UserDTO>> GetUser()
		{
			try
			{
				Guid userId = IdentityUtils.GetAuthorizedUserId(User);
				return await _userService.GetUserDTOAsync(userId);
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
