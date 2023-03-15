using api.Entities.User;
using api.Infrastructure.Exceptions.User;
using api.Repositories.UnitOfWork;
using Microsoft.EntityFrameworkCore;

namespace api.Services.User
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
			Entities.User.User? user = await _UoW.UserRepository
				.GetById(userId)
				.AsNoTracking()
				.FirstOrDefaultAsync();
			if (user == null) throw new UserException(UserExceptionReasonCode.UserDoesntExist);

			UserDTO dto = UserDTO.GetDTO(user);
			return dto;
		}
	}
}
