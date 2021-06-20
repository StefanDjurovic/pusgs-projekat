using System;
using System.IO;
using System.Threading.Tasks;
using API.Data;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UploadController : ControllerBase
    {
        private readonly IUploadRepository repo;
        public UploadController(IUploadRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("profile-image/{userId}"), DisableRequestSizeLimit]
        public async Task<bool> UploadImage(int userId)
        {
            return await this.repo.StoreProfileImage(Request, userId);
        }

        [HttpPost("document/{switchPlanId}"), DisableRequestSizeLimit]
        public async Task<bool> UploadDocument(int switchPlanId)
        {
            return await this.repo.StoreSwitchDocument(Request, switchPlanId);
        }

        [HttpGet("get-documents/{switchPlanId}/"), DisableRequestSizeLimit]
        public async Task<IActionResult> GetUserDocument(int switchPlanId)
        {
            // return await this.repo.StoreSwitchDocument(Request, switchPlanId);
            throw new NotImplementedException();
        }

        [HttpGet("retrieve-profile-image/{userId}")]
        public async Task<IActionResult> GetUserProfileImage(int userId)
        {
            var image = await this.repo.GetProfileImage(userId);
            return File(image, "image/jpeg");
            //var image = System.IO.File.OpenRead("C:\\test\\random_image.jpeg");
            //return File(image, "image/jpeg");
        }
    }
}