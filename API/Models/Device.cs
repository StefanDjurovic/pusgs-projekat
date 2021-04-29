namespace API.Models
{
    public enum Type { Residential, Commercial }
    public class Device
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Location { get; set; }
        public string Telephone { get; set; }
        public int Priority { get; set; }
        public Type AccountType { get; set; }
    }
}