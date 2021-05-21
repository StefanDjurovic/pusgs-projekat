using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using API.Data;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly INotificationRepository repo;
        private readonly IConfiguration config;
        public NotificationController(INotificationRepository repo, IConfiguration config)
        {
            this.config = config;
            this.repo = repo;
        }

        [HttpGet("{userId}")]
        public async Task<IEnumerable<Notification>> GetUserNotifications(int userId)
        {
            return await this.repo.GetAllNotification(userId);
        }
    }
}