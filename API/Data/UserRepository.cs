using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext context;
        public UserRepository(DataContext context)
        {
            this.context = context;
        }

        public Task<IEnumerable<User>> GetUsers()
        {
            throw new System.NotImplementedException();
        }

        public Task<User> GetUser(int userId)
        {
            throw new System.NotImplementedException();
        }

        public async Task<IEnumerable<User>> GetUserApplications()
        {
            var unApprovedUsers = await this.context.Users.Where(user => user.ActivationStatus == UserActivationStatus.toBeProcessed).ToListAsync();

            return unApprovedUsers;
        }

        public async Task<bool> ApproveApplication(int userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user=> user.Id == userId);
            user.ActivationStatus = UserActivationStatus.active;

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeclineApplication(int userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user=> user.Id == userId);
            user.ActivationStatus = UserActivationStatus.declined;

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UserExists(int userId)
        {
            return await this.context.Users.FirstOrDefaultAsync(user => user.Id == userId) != default;
        }

    }
}