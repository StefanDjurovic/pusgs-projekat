using System.Threading.Tasks;

namespace API.Data
{
    public class WorkRequest : IWorkRequest
    {
        private readonly DataContext context;
        public WorkRequest(DataContext context)
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