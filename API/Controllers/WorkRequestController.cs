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

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class WorkRequestController : ControllerBase
    {
        private readonly IWorkRequestRepository repo;
        public WorkRequestController(IWorkRequestRepository repo)
        {
            this.repo = repo;

        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(WorkRequest workRequest)
        {
            return await this.repo.CreateRequest(workRequest) ? Ok(workRequest.Id) : BadRequest();
        }
    }
}