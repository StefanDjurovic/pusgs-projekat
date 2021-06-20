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
            //return await this.repo.GetAllDevices();
            throw new NotImplementedException();
        }

        [HttpPost("devices/{userId}/{accountType}/{streetName}")]
        public async Task<IEnumerable<Device>> GetDevices(SortingParam consumerSorting, [FromQuery] PaginationParameters paginationParameters, int userId, string accountType, string streetName)
        {
            DeviceFilterParameters deviceFilterParameters = new DeviceFilterParameters();
            deviceFilterParameters.AccountType = accountType;
            deviceFilterParameters.StreetName = streetName;
            return await this.repo.GetDevices(consumerSorting, paginationParameters, userId, deviceFilterParameters);
        }

        [HttpGet("total-pages/{userId}/{accountType}/{streetName}")]
        public async Task<int> GetTotalPages(int userId, string accountType, string streetName)
        {
            DeviceFilterParameters deviceFilterParameters = new DeviceFilterParameters();
            deviceFilterParameters.AccountType = accountType;
            deviceFilterParameters.StreetName = streetName;

            IEnumerable<Device> totalDevices = await this.repo.GetAllDevices(userId, deviceFilterParameters);
            return totalDevices.Count();
        }

        [HttpGet("get/{id}")]
        public async Task<Device> GetDevice(int id)
        {
            return await this.repo.GetDevice(id);
        }
    }
}