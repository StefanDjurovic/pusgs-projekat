using System;
using System.Collections.Generic;

namespace API.Models
{
    public class SafetyDocument
    {
        public int Id { get; set; }
        public WorkType Type { get; set; }
        public StatusType Status { get; set; }
        public int FieldCrew { get; set; }
        public int SwitchingPlan { get; set; }
        public int CreatedById { get; set; }
        public DateTime CreatedDateTime { get; set; }
        public string Details { get; set; }
        public string Notes { get; set; }
        public string Telephone { get; set; }
    }
}