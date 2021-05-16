namespace API.Models
{

    //! work in progress
    public enum Reason { NoPower, SystemMalfunction, LightFlickering, PowerBack, PartialCurrent, VoltageProblems }
    public class Call
    {
        public Reason Reason { get; set; }
        public string Comment { get; set; }
        public string Malfunction { get; set; }

    }
}