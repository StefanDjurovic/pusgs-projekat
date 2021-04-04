using System.Threading.Tasks;
using API.Data;
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
        
    }
}