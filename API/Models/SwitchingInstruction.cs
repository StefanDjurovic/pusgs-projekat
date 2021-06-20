using System;

namespace API.Models
{
    public class SwitchingInstruction
    {
        public int Id { get; set; }
        public int SwitchingPlanId { get; set; }
        public string Message { get; set; }
        public bool isExecuted { get; set; }
    }
}