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
    public class CallController : ControllerBase
    {
        private readonly ICallRepository repo;
        public CallController(ICallRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("new")]
        public async Task<bool> NewCall(Call newCall)
        {
            return await this.repo.CreateNewCall(newCall);
        }
    }
}