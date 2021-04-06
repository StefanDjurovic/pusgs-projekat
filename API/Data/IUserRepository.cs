using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IUserRepository
    {
        Task<IEnumerable<User>> GetUsers();
        Task<User> GetUser(int userId);
        Task<IEnumerable<User>> GetUserApplications();
        Task<bool> ApproveApplication(int userId);
        Task<bool> DeclineApplication(int userId);
        Task<bool> UserExists(int userId);
        Task<bool> UpdateUser(User user);
    }
}