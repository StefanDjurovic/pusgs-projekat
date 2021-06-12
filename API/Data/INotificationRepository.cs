using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;

namespace API.Data
{
    public interface INotificationRepository
    {
        public Task<bool> CreateNewNotification(int userId, NotificationType notificationType, string message);
        public Task<IEnumerable<Notification>> GetAllNotification(int userId);
        public Task<IEnumerable<Notification>> GetNotificationByType(int userId, NotificationType notificationType);
        public Task<bool> UpdateNotificationState(int notificationId);
    }
}