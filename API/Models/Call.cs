namespace API.Models
{
    public class Call
    {
        public int Id { get; set; }
        public Reason Reason { get; set; }
        public string Comment { get; set; }
        public string Reporter { get; set; }
        public string StreetName { get; set; }
        public string StreetNumber { get; set; }
    }
}