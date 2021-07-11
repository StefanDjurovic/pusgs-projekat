using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Helpers;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;


namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository userRepo;
        private readonly IEmailService emailService;
        private readonly IUnitRepository unitRepo;

        public UserController(IUserRepository userRepo, IEmailService emailService, IUnitRepository unitRepo)
        {
            this.userRepo = userRepo;
            this.emailService = emailService;
            this.unitRepo = unitRepo;
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

            var approved = await this.userRepo.ApproveApplication(userId);
            var user = await this.userRepo.GetUser(userId);

            if (user.ActivationStatus == UserActivationStatus.active) 
            {
                emailService.SendConfirmationEmail(user.Email);
                return Ok();
            }

            return BadRequest();
        }

        [HttpPut("decline/{userId}")]
        public async Task<IActionResult> DeclineApplication(int userId)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return BadRequest();
            }

            var dissaproved = await this.userRepo.ApproveApplication(userId);
            var user = await this.userRepo.GetUser(userId);

            if (user.ActivationStatus == UserActivationStatus.declined) 
            {
                emailService.SendDisclaimer(user.Email);
                return Ok();
            }

            return BadRequest();
        }

        [HttpGet("{userId}")]
        public async Task<IActionResult> GetUser(int userId)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return BadRequest();
            }
            return Ok(await this.userRepo.GetUser(userId));
        }

        
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            return Ok(await this.userRepo.GetUsers());
        }

        [HttpGet("unitMembers/{unitId}")]
        public async Task<IActionResult> GetUnitMembers(int unitId)
        {
            var unit = await this.unitRepo.GetUnit(unitId);
            if (unit == null)
            {
                return BadRequest();
            }

            return Ok(unit.Members);
        }

        [HttpGet("availableUM")]
        public async Task<IActionResult> GetAvailableUnitMembers()
        {
            List<int> usersInUnits = new List<int>();
            var units = await this.unitRepo.GetUnits();
            units.ToList().ForEach(unit => unit.Members.ForEach(member => usersInUnits.Add(member.Id)));
            
            var users = await this.userRepo.GetUsers();

            return Ok(users.Where(user => !usersInUnits.Contains(user.Id)));
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


        [HttpPost("{userId}/update-password")]
        public async Task<IActionResult> UpdatePassword(int userId, PasswordUpdateDto passwordUpdate)
        {
            if (!await this.userRepo.UserExists(userId))
            {
                return BadRequest();
            }
            System.Console.WriteLine($"ID: {userId}, Current Password: {passwordUpdate.CurrentPassword}, New Password: {passwordUpdate.NewPassword}");
            return await this.userRepo.UpdatePassword(userId, passwordUpdate) ? Ok() : BadRequest();
        }

        [HttpGet("availabletm")]
        public async Task<IActionResult> GetAvailableTeamMembers()
        {
            return Ok(await this.userRepo.GetAvailableTeamMembers());
        }
    }
}