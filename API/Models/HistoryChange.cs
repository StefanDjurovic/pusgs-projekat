using System;

namespace API.Models
{
    public class HistoryChange
    {
        public int Id { get; set; }
        public int Document { get; set; }
        public string Content { get; set; }
        public DateTime Changes { get; set; }
    }
}