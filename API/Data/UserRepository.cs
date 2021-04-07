using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
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

        public async Task<IEnumerable<User>> GetUsers()
        {
            var users = await this.context.Users.ToListAsync();
            return users;
        }

        public async Task<User> GetUser(int userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            return user;
        }

        public async Task<IEnumerable<User>> GetUserApplications()
        {
            var unApprovedUsers = await this.context.Users.Where(user => user.ActivationStatus == UserActivationStatus.toBeProcessed).ToListAsync();

            return unApprovedUsers;
        }

        public async Task<bool> ApproveApplication(int userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            user.ActivationStatus = UserActivationStatus.active;

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeclineApplication(int userId)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user => user.Id == userId);
            user.ActivationStatus = UserActivationStatus.declined;

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UserExists(int userId)
        {
            return await this.context.Users.FirstOrDefaultAsync(user => user.Id == userId) != default;
        }

        public async Task<bool> UpdateUser(User updatedUser)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user => user.Id.Equals(updatedUser.Id));

            user.Name = updatedUser.Name;
            user.Surname = updatedUser.Surname;
            user.Address = updatedUser.Address;
            user.Email = updatedUser.Email;
            user.Birthday = updatedUser.Birthday;
            user.Username = updatedUser.Username;

            return await this.context.SaveChangesAsync() > 0;

        }


        public async Task<bool> UpdatePassword(int userId, PasswordUpdateDto passwordUpdate)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(user => user.Id.Equals(userId));

            if (PasswordVerification.VerifyPasswordHash(passwordUpdate.CurrentPassword, user.PasswordHash, user.PasswordSalt))
            {
                byte[] newPasswordHash = null;
                byte[] newPasswordSalt = null;

                PasswordVerification.CreatePasswordHash(passwordUpdate.NewPassword, out newPasswordHash, out newPasswordSalt);

                user.PasswordHash = newPasswordHash;
                user.PasswordSalt = newPasswordSalt;

                return await this.context.SaveChangesAsync() > 0;
            }
            return false;
        }
    }
}