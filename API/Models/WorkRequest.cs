using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class WorkRequest
    {
        public int Id { get; set; }
        public string WorkType { get; set; }
        public Address Address { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
        public DateTime CreatedAt { get; set; }
        public int UserId { get; set; }
        public string AdditionalNotes { get; set; }
        public string Purpose { get; set; }
        public string PhoneNumber { get; set; }

        public WorkRequest(string workType, Address address, DateTime startDate, DateTime endDate, int userId, string additionalNotes, string purpose, string phoneNumber)
        {
            this.WorkType = workType;
            this.Address = address;
            this.AdditionalNotes = additionalNotes;
            this.StartDate = startDate;
            this.EndDate = endDate;
            this.UserId = userId;
            this.CreatedAt = DateTime.Now;
            this.PhoneNumber = phoneNumber;
            this.Purpose = purpose;
        }

        public WorkRequest()
        {
            
        }
    }
}