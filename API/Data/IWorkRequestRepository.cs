using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IWorkRequestRepository
    {
        Task<bool> CreateRequest(WorkRequest workRequest);
        Task<WorkRequest> GetRequest(int requestId);
        Task<IEnumerable<WorkRequest>> GetRequests();

    }
}