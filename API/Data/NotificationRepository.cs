using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class NotificationRepository : INotificationRepository
    {
        private readonly DataContext context;
        public NotificationRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<bool> CreateNewNotification(int userId, NotificationType notificationType, string message)
        {
            Notification notification = new Notification(userId, notificationType, message);
            this.context.Notifications.Add(notification);
            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> DeleteAllNotifications(int id)
        {
            var notifications = await this.context.Notifications.Where(x => x.UserId.Equals(id)).ToListAsync();
            foreach (var x in notifications)
                this.context.Notifications.Remove(x);
            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<IEnumerable<Notification>> GetAllNotification(int userId)
        {
            return await this.context.Notifications.Where(x => x.UserId.Equals(userId)).ToListAsync();
        }

        public async Task<IEnumerable<Notification>> GetNotificationByType(int userId, NotificationType notificationType)
        {
            return await this.context.Notifications.Where(x => x.UserId.Equals(userId) & x.Type.Equals(notificationType)).ToListAsync();
        }

        public async Task<bool> MarkAllNotifications(int id)
        {
            var notifications = await this.context.Notifications.Where(x => x.UserId.Equals(id)).ToListAsync();
            foreach (var x in notifications)
                x.Read = true;
            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<bool> UpdateNotificationState(int notificationId)
        {
            var notification = await this.context.Notifications.FirstOrDefaultAsync(x => x.Id.Equals(notificationId));
            if (notification != null)
            {
                notification.Read = true;
            }
            return await this.context.SaveChangesAsync() > 0;
        }
    }
}