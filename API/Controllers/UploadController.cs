using System;
using System.IdentityModel.Tokens.Jwt;
using System.IO;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IUploadRepository repo;
        private readonly IWorkRequestRepository workReqRepo;
        private readonly IConfiguration config;
        private readonly IUserRepository userRepo;
        public UploadController(IUploadRepository repo, IUserRepository userRepo, IConfiguration config, IWorkRequestRepository workReqRepo)
        {
            this.userRepo = userRepo;
            this.config = config;
            this.workReqRepo = workReqRepo;
            this.repo = repo;
        }

        [HttpPost("profile-image/{userId}"), DisableRequestSizeLimit]
        public async Task<bool> UploadImage(int userId)
        {
            return await this.repo.StoreProfileImage(Request, userId);
        }

        [HttpPost("multimedia-attach/{workRequestId}"), DisableRequestSizeLimit]
        public async Task<IActionResult> UploadMMAttach([FromRoute] int workRequestId)
        {
            var uploaded = await this.repo.StoreMultimediaAttachment(Request, workRequestId);
            if (!uploaded)
            {
                return BadRequest();
            }

            await this.workReqRepo.AddChange(workRequestId, await this.GetIdentity(), $"attachment uploaded");

            return Ok();
        }

        [HttpGet("retrieve-profile-image/{userId}")]
        public async Task<IActionResult> GetUserProfileImage(int userId)
        {
            var user = await this.userRepo.GetUser(userId);
            if (user == null || user.ProfileImage == null) {
                return BadRequest();
            }
            var image = await this.repo.GetProfileImage(userId);
            return File(image, "image/jpeg");
            //var image = System.IO.File.OpenRead("C:\\test\\random_image.jpeg");
            //return File(image, "image/jpeg");
        }


        [HttpGet("download-attach/{workRequestId}-{attachId}")]
        public async Task<IActionResult> DownloadAttachment([FromRoute] int workRequestId, [FromRoute] int attachId)
        {
            var file = await this.repo.DownloadAttachment(workRequestId, attachId);
            return File(file, "image/jpeg");
        }


        [HttpPost("delete-attach/{workRequestId}-{attachId}")]
        public async Task<IActionResult> DeleteAttachment([FromRoute] int workRequestId, [FromRoute] int attachId)
        {
            var deleted = await this.repo.DeleteAttachment(workRequestId, attachId);
            if (!deleted)
            {
                return BadRequest();
            }

            await this.workReqRepo.AddChange(workRequestId, await this.GetIdentity(), $"attachment {attachId} deleted");

            return Ok();
        }


        private async Task<int> GetIdentity()
        {
            var token = (await this.HttpContext.GetTokenAsync("access_token"));
            var secret = this.config.GetSection("AppSettings:Token").Value;



            if (token == null)
            {
                return -1;
            }
            var key = Encoding.ASCII.GetBytes(secret);
            var handler = new JwtSecurityTokenHandler();
            var validations = new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(key),
                ValidateIssuer = false,
                ValidateAudience = false
            };

            var claims = handler.ValidateToken(token, validations, out var tokenSecure);
            int id;

            return Int32.TryParse(claims.FindFirst(ClaimTypes.NameIdentifier)?.Value, out id) ? id : -1;
        }
    }
}