using System.Threading.Tasks;
using API.Models;

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

        public Task<WorkRequest> GetRequest(int requestId)
        {
            throw new System.NotImplementedException();
        }
    }
}