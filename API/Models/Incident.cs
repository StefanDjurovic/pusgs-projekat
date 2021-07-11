namespace API.Models
{
    public class Incident
    {
        public int Id { get; set; }
        public string Cause { get; set; }
        public double Lon { get; set; }
        public double Lat { get; set; }
    }
}