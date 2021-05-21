using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
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

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserWorkrequests(int userId, [FromForm] PaginationParameters param)
        {
            // PaginationParameters param = new PaginationParameters();
            // param.PageNumber = num;
            // param.PageSize = size;
            var workRequests = await this.repo.GetRequests(userId, param);
            return Ok(workRequests);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkrequest(int id)
        {
            var workRequest = await this.repo.GetRequest(id);
            return Ok(workRequest);
        }
    }
}