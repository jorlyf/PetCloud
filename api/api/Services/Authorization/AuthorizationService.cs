using api.Entities.User;
using api.Infrastructure.Exceptions.Authorization;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace api.Services.Authorization
{
	public class AuthorizationService
	{
		private readonly UnitOfWork _UoW;
		private readonly HashService _hashService;
		private readonly JwtService _jwtService;

		public AuthorizationService(UnitOfWork uow, HashService hashService, JwtService jwtService)
		{
			_UoW = uow;
			_hashService = hashService;
			_jwtService = jwtService;
		}

		public async Task<string> LoginAsync(string login, string password)
		{
			User? user = await _UoW.UserRepository
				.GetByLogin(login)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			string passwordHash = _hashService.GetHash(password);
			if (user == null || user.PasswordHash != passwordHash)
			{
				throw new AuthorizationException(AuthorizationExceptionReasonCode.IncorrectLoginData);
			}

			string token = _jwtService.GenerateToken(user);
			return token;

		}
		public async Task<string> RegisterAsync(string login, string password)
		{
			if (await IsUserLoginExist(login))
			{
				throw new AuthorizationException(AuthorizationExceptionReasonCode.UserLoginExist);
			}

			string passwordHash = _hashService.GetHash(password);
			User user = new()
			{
				Login = login,
				PasswordHash = passwordHash
			};

			await _UoW.UserRepository.AddAsync(user);
			await _UoW.UserRepository.SaveAsync();

			string token = _jwtService.GenerateToken(user);
			return token;
		}
		public async Task<bool> IsUserLoginExist(string login)
		{
			User? user = await _UoW.UserRepository
				.GetByLogin(login)
				.AsNoTracking()
				.FirstOrDefaultAsync();

			return user != null;
		}
	}
}
