using System;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class AuthRepository : IAuthRepository
    {
        private readonly DataContext context;
        public AuthRepository(DataContext context)
        {
            this.context = context;

        }
        public async Task<User> Login(string username, string password)
        {
            var user = await this.context.Users.FirstOrDefaultAsync(x => x.Username == username);
            if (user == null)
            {
                return null;
            }

            if (!PasswordVerification.VerifyPasswordHash(password, user.PasswordHash, user.PasswordSalt))
            {
                return null;
            }

            return user;
        }
        public async Task<User> Register(User user, string password)
        {
            byte[] passwordHash, passwordSalt;
            PasswordVerification.CreatePasswordHash(password, out passwordHash, out passwordSalt);

            user.PasswordHash = passwordHash;
            user.PasswordSalt = passwordSalt;

            await this.context.Users.AddAsync(user);
            await this.context.SaveChangesAsync();

            return user;
        }

        public async Task<bool> UserExists(string username)
        {
            if (await this.context.Users.AnyAsync(x => x.Username == username))
            {
                return true;
            }
            return false;
        }
    }
}