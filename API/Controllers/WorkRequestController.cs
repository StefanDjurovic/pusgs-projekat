using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using API.Helpers;

namespace API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class WorkRequestController : ControllerBase
    {
        private readonly IWorkRequestRepository repo;
        public WorkRequestController(IWorkRequestRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetWorkrequest(int id)
        {
            var workRequest = await this.repo.GetRequest(id);
            return Ok(workRequest);
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await this.repo.GetRequests());
        }

        [HttpPost("create")]
        public async Task<IActionResult> Create(WorkRequest workRequest)
        {
            workRequest.Id = 0;
            return await this.repo.CreateRequest(workRequest) ? Ok(workRequest.Id) : BadRequest();
        }

        [HttpPut]
        public async Task<IActionResult> Update(WorkRequest workRequest)
        {
            if (!await this.repo.UpdateRequest(workRequest))
            {
                return BadRequest();
            }

            await this.repo.AddChange(workRequest.Id, 2, "updated basic values");

            return Ok();
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

        [HttpGet("withParams")]
        public async Task<IActionResult> GetWithParams([FromForm]FetchReqParams fetchParms) 
        {
            return Ok(this.repo.GetRequests(Int32.Parse(fetchParms.Page), Int32.Parse(fetchParms.NumberOfResults)));
        }

        [HttpDelete("{workRequestId}")]
        public async Task<IActionResult> Delete([FromRoute]int workRequestId)
        {
            
            var workReqDeleted = await this.repo.Delete(workRequestId);
            return workReqDeleted ? Ok() : BadRequest();
        }

    }
}