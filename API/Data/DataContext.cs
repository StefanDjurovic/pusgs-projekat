using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }
        public DbSet<Value> Values { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<WorkRequest> WorkRequests { get; set; }
        public DbSet<Device> Devices { get; set; }
        public DbSet<Notification> Notifications { get; set; }
        public DbSet<AddressPriority> AddressPriorities { get; set; }
        public DbSet<SafetyDocument> SafetyDocuments { get; set; }
        public DbSet<MultimediaAttachments> MultimediaAttachments { get; set; }
        public DbSet<SwitchingInstruction> SwitchingInstructions { get; set; }
        public DbSet<Call> Calls { get; set; }
        public DbSet<Icon> Icons { get; set; }
    }
}