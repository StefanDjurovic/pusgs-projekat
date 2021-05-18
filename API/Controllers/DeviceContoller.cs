using System;
using System.Collections;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using System.Linq;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DeviceController : ControllerBase
    {
        private readonly IDeviceRepository repo;
        private readonly IConfiguration config;
        public DeviceController(IDeviceRepository repo, IConfiguration config)
        {
            this.config = config;
            this.repo = repo;
        }

        [HttpPost("add")]
        public async Task<IActionResult> Add(Device device)
        {
            if (await this.repo.Add(device))
            {
                return StatusCode(201);
            }
            return BadRequest("Device was rejected by the server!");
        }

        [HttpGet("remove/{deviceId}")]
        public async Task<IActionResult> Remove(int deviceId)
        {
            if (await this.repo.Remove(deviceId))
            {
                return StatusCode(201);
            }
            return BadRequest("Device couldn't be deleted!");
        }

        [HttpPost("update/{deviceId}")]
        public async Task<IActionResult> Update(int deviceId, Device device)
        {
            if (await this.repo.Update(deviceId, device))
            {
                return StatusCode(201);
            }
            return BadRequest("Device couldn't be updated!");
        }

        [HttpGet("all-devices")]
        public async Task<IEnumerable<Device>> GetAllDevices()
        {
            return await this.repo.GetAllDevices();
        }

        [HttpGet("devices")]
        public async Task<IEnumerable<Device>> GetDevices([FromQuery] PaginationParameters paginationParameters)
        {
            return await this.repo.GetDevices(paginationParameters);
        }


        [HttpGet("total-pages")]
        public async Task<int> GetTotalPages()
        {
            IEnumerable<Device> totalDevices = await this.repo.GetAllDevices();
            return totalDevices.Count();
        }
    }
}