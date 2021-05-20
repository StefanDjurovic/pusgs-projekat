using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class WorkRequestRepository : IWorkRequestRepository
    {
        private readonly DataContext context;
        public WorkRequestRepository(DataContext context)
        {
            this.context = context;
        }

        public async Task<bool> CreateRequest(WorkRequest workRequest)
        {
            await this.context.WorkRequests.AddAsync(workRequest);

            return await this.context.SaveChangesAsync() > 0;
        }

        public async Task<WorkRequest> GetRequest(int requestId)
        {
            return await this.context.WorkRequests.FirstOrDefaultAsync(wr => wr.Id == requestId);
        }

        public async Task<IEnumerable<WorkRequest>> GetRequests()
        {
            return await this.context.WorkRequests.ToListAsync();
        }
    }
}