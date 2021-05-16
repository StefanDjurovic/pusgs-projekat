using System.Threading.Tasks;
using API.Models;

namespace API.Data
{
    public interface IWorkRequest
    {
        Task<bool> CreateRequest(WorkRequest workRequest);
        Task<WorkRequest> GetRequest(int requestId);

    }
}