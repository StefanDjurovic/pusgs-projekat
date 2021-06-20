using System.Collections.Generic;
using System.Threading.Tasks;
using API.Models;
using API.Dtos;
using Microsoft.AspNetCore.Http;
using System.IO;

namespace API.Data
{
    public interface ISafetyDocumentRepository
    {
        Task<int> CreateSafetyDocument(SafetyDocument switchPlan);

        Task<bool> CreateSafetyDocumentInstruction(SwitchingInstruction instructions, int switchingPlanId);

        Task<IEnumerable<SafetyDocument>> GetSafetyDocumentPlans(SortingParam consumerSorting, PaginationParameters paginationParameters, string type, string status);

        Task<SafetyDocument> GetDocument(int id);
        Task<bool> DeleteDocument(int id);

        Task<bool> DeleteInstructions(int id);

        Task<IEnumerable<SwitchingInstruction>> GetAllInstructions(int id);
    }
}