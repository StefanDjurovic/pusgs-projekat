using System;
using System.ComponentModel.DataAnnotations;

namespace API.Models
{
    public class User
    {
        public int Id { get; set; }
        [Required]
        [StringLength(25, MinimumLength = 3, ErrorMessage = "username must be between 3 and 25 characters")]
        public string Username { get; set; }
        [Required]
        [EmailAddress]
        public string Email { get; set; }
        [Required]
        public string Name { get; set; }
        [Required]
        public string Surname { get; set; }
        public DateTime Birthday { get; set; }
        public string Address { get; set; }
		public string ProfileImage { get; set; }
		public UserActivationStatus ActivationStatus { get; set; }
        public UserType Type { get; set; }
        public byte[] PasswordHash { get; set; }
        public byte[] PasswordSalt { get; set; }
    }
}