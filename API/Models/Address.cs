namespace API.Models
{
    public class Address
    {
        public int Id { get; set; }
        public string Street { get; set; }
        public string Number { get; set; }
        public string City { get; set; }
        public int Longitude { get; set; }
        public int Latitude { get; set; }

    }
}