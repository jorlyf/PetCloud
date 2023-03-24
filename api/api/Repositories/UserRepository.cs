using api.DbContexts;
using api.Entities.UserNS;
using api.Repositories.Base;
using Microsoft.EntityFrameworkCore;

namespace api.Repositories
{
	public class UserRepository : RepositoryBase<User>
	{
		public UserRepository(DataContext context) : base(context) { }

		public IQueryable<User> GetByLogin(string login)
		{
			return Set.Where(user => EF.Functions.Like(user.Login, login));
		}

		public IQueryable<User> GetByLoginContains(string login)
		{
			return Set.Where(user => user.Login.ToLower().Contains(login.ToLower()));
		}
	}
}
