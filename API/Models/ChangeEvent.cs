using System;

namespace API.Models
{
    public class ChangeEvent
    {
        public int Id { get; set; }
        public string Content { get; set; }
        public int ChangedBy { get; set; }
        public DateTime ChangedAt { get; set; }
    }
}