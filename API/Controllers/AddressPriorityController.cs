using System;
using System.Collections.Generic;
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
    public class AddressPriorityController : ControllerBase
    {
        private readonly IAddressPriorityRepository repo;
        public AddressPriorityController(IAddressPriorityRepository repo)
        {
            this.repo = repo;
        }

        [HttpGet]
        public async Task<IEnumerable<AddressPriority>> FetchAllPriorities()
        {
            return await this.repo.FetchAllPriorities();
        }

        [HttpPost("update")]
        public async Task<bool> UpdatePriorities(IEnumerable<AddressPriority> addressPriorities)
        {
            return await this.repo.UpdateAllPriorities(addressPriorities);
        }
    }
}