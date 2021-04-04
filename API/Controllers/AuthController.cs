using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;
        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            this.config = config;
            this.repo = repo;

        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(UserRegDto userRegDto) 
        {
            // validate request
            userRegDto.Username = userRegDto.Username.ToLower();

            if (await this.repo.UserExists(userRegDto.Username))
            {
                return BadRequest("username already taken");
            }

            var userToCreate = new User
            {
                Username = userRegDto.Username,
                Email = userRegDto.Email,
                Address = userRegDto.Address,
                Birthday = userRegDto.Birthday,
                Name = userRegDto.Name,
                Surname = userRegDto.Surname,
                ActivationStatus = UserActivationStatus.toBeProcessed
            };

            var createdUser = await this.repo.Register(userToCreate, userRegDto.Password);

            return StatusCode(201);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginDto userForLoginDto)
        {
            var userFromRepo = await this.repo.Login(userForLoginDto.Username.ToLower(), userForLoginDto.Password);

            if (userFromRepo == null)
            {
                return Unauthorized();
            }

            if (userFromRepo.ActivationStatus == UserActivationStatus.toBeProcessed)
            {
                return BadRequest("application not processed yet");
            }

            if (userFromRepo.ActivationStatus == UserActivationStatus.declined)
            {
                return BadRequest("your application has been declined");
            }

            var claims = new []
            {
                new Claim(ClaimTypes.NameIdentifier, userFromRepo.Id.ToString()),
                new Claim(ClaimTypes.Name, userFromRepo.Username)
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this.config.GetSection("AppSettings:Token").Value));

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            var token = tokenHandler.CreateToken(tokenDescriptor);

            return Ok(new {
                token = tokenHandler.WriteToken(token)
            });
        }
    }
}