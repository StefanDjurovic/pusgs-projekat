namespace API.Models
{

    public class Device
    {
        public int Id { get; set; }
        public int UserId { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string StreetName { get; set; }
        public int StreetNumber { get; set; }
        public string City { get; set; }
        public string Telephone { get; set; }
        public int Priority { get; set; }
        public DeviceType AccountType { get; set; }
    }
}