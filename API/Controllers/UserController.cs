using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepo;
        public UserController(IUserRepository userRepo)
        {
            this.userRepo = userRepo;
        }

        [HttpGet("applications")]
        public async Task<IActionResult> GetUserApplications()
        {
            return Ok(await this.userRepo.GetUserApplications());
        }

        [HttpPut("approve/{userId}")]
        public async Task<IActionResult> ApproveApplication(int userId)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return BadRequest();
            }

            return await this.userRepo.ApproveApplication(userId) ? Ok() : BadRequest();
        }

        [HttpPut("decline/{userId}")]
        public async Task<IActionResult> DeclineApplication(int userId)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return BadRequest();
            }

            return await this.userRepo.DeclineApplication(userId) ? Ok() : BadRequest();
        }

        [HttpGet("{userId}")]
        public async Task<User> GetUser(int userId)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return null;
            }
            return await this.userRepo.GetUser(userId);
        }


        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser(User updatedUser)
        {
            if (!await this.userRepo.UserExists(updatedUser.Id))
            {
                return BadRequest();
            }
            return await this.userRepo.UpdateUser(updatedUser) ? Ok() : BadRequest();
        }



    }
}