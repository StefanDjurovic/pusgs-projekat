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

        [HttpGet("update/{notificationId}")]
        public async Task<bool> UpdateNotificationState(int notificationId)
        {
            return await this.repo.UpdateNotificationState(notificationId);
        }

        [HttpGet("delete-all/{id}")]
        public async Task<bool> DeleteAllNotifications(int id)
        {
            return await this.repo.DeleteAllNotifications(id);
        }

        [HttpGet("mark-all/{id}")]
        public async Task<bool> MarkAllNotifications(int id)
        {
            return await this.repo.MarkAllNotifications(id);
        }

    }
}