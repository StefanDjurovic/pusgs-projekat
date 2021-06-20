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

        Task<IEnumerable<SafetyDocument>> GetSafetyDocumentPlans(PaginationParameters paginationParameters, string type, string status);

        Task<bool> DeleteDocument(int id);
    }
}