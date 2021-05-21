using System;

namespace API.Models
{
    public enum NotificationType { Information, Warning, Error, Success }
    public class Notification
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public NotificationType Type { get; set; }
        public DateTime CreationDate { get; set; }
        public string Message { get; set; }
        public bool Read { get; set; } = false;

        public Notification(int userId, NotificationType type, string message)
        {
            UserId = userId;
            Type = type;
            Message = message;
            CreationDate = DateTime.Now;
        }
    }
}