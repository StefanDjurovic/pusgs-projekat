using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Models;

namespace API.Data
{
    public interface IWorkRequestRepository
    {
        Task<bool> CreateRequest(WorkRequest workRequest);
        Task<WorkRequest> GetRequest(int requestId);
        Task<bool> UpdateRequest(WorkRequest workRequest);
        Task<IEnumerable<WorkRequest>> GetRequests(int userId, PaginationParameters param);
        Task<IEnumerable<WorkRequest>> GetRequests();
        IEnumerable<WorkRequest> GetRequests(int numberOfResults, int lastId);
        Task AddChange(int workRequestId, int changedBy, string content);
        Task<bool> Delete(int workRequestId);
    }
}