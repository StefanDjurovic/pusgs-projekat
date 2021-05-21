using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Dtos;
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

        public async Task<IEnumerable<WorkRequest>> GetRequests(int userId, PaginationParameters param)
        {
            return await this.context.WorkRequests.Where(x => x.Id.Equals(userId)).OrderBy(x => x.Id).Skip((param.PageNumber - 1) * param.PageSize).Take(param.PageSize).ToListAsync();
        }
    }
}