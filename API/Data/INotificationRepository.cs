using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;

namespace API.Data
{
    public interface INotificationRepository
    {
        Task<bool> CreateNewNotification(int userId, NotificationType notificationType, string message);
        Task<IEnumerable<Notification>> GetAllNotification(int userId);
        Task<IEnumerable<Notification>> GetNotificationByType(int userId, NotificationType notificationType);
        Task<bool> UpdateNotificationState(int notificationId);

        Task<bool> DeleteAllNotifications(int id);
        Task<bool> MarkAllNotifications(int id);


    }
}