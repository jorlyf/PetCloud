using api.Entities.UserNS;
using api.Infrastructure.Exceptions;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace api.Services.UserServiceNS
{
	public class UserService
	{
		private readonly UnitOfWork _UoW;
		public UserService(UnitOfWork uow)
		{
			_UoW = uow;
		}

		public async Task<UserDTO> GetUserDTOAsync(Guid userId)
		{
			User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new ApiException(ApiExceptionCode.UserNotFound);

			UserDTO dto = UserDTO.GetDTO(user);
			return dto;
		}
	}
}
