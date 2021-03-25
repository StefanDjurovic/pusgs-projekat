using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;

namespace API.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ValueController : ControllerBase
    {
        private readonly DataContext context;
        public ValueController(DataContext context)
        {
            this.context = context;

        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            return Ok(await this.context.Values.ToListAsync());
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetValue(int id)
        {
            var value = await this.context.Values.FirstOrDefaultAsync(value => value.Id == id);
            return Ok(value);
        }
    }
}
