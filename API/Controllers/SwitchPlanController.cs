using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using API.Data;
using API.Dtos;
using API.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.Linq;
// using Microsoft.IdentityModel.Tokens;
// using Microsoft.IdentityModel.Tokens;

namespace API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SafetyDocumentsController : ControllerBase
    {
        private readonly ISafetyDocumentRepository repo;
        public SafetyDocumentsController(ISafetyDocumentRepository repo)
        {
            this.repo = repo;
        }

        [HttpPost("create")]
        public async Task<int> CreateSwitchPlan(SafetyDocument switchingPlan)
        {
            return await this.repo.CreateSafetyDocument(switchingPlan);
        }

        [HttpPost("instructions/{switchingPlanId}")]
        public async Task<bool> CreateInstructions(SwitchingInstruction instruction, int switchingPlanId)
        {
            return await this.repo.CreateSafetyDocumentInstruction(instruction, switchingPlanId);
        }

        [HttpPost("get-plans/{type}/{status}")]
        public async Task<IEnumerable<SafetyDocument>> GetAllSwitchPlans(SortingParam consumerSorting, [FromQuery] PaginationParameters paginationParameters, string type, string status)
        {
            return await this.repo.GetSafetyDocumentPlans(consumerSorting, paginationParameters, type, status);
        }

        [HttpPost("document-count/{type}/{status}")]
        public async Task<int> GetAllSwitchPlansCount(SortingParam consumerSorting, [FromQuery] PaginationParameters paginationParameters, string type, string status)
        {
            IEnumerable<SafetyDocument> allDocuments = await this.repo.GetSafetyDocumentPlans(consumerSorting, paginationParameters, type, status);
            return allDocuments.Count();
        }

        [HttpGet("document/{id}")]
        public async Task<SafetyDocument> GetDocument(int id)
        {
            return await this.repo.GetDocument(id);
        }

        [HttpPost("delete/{documentId}")]
        public async Task<bool> GetAllSwitchPlansCount(int documentId)
        {
            return await this.repo.DeleteDocument(documentId);
        }

        [HttpGet("get-instructions/{id}")]
        public async Task<IEnumerable<SwitchingInstruction>> GetAllInstructions(int id)
        {
            return await this.repo.GetAllInstructions(id);
        }

        [HttpGet("delete-instructions/{id}")]
        public async Task<bool> DeleteAllInstructions(int id)
        {
            return await this.repo.DeleteInstructions(id);
        }

        [HttpGet("history-changes/{id}")]
        public async Task<IEnumerable<HistoryChange>> GetAllHistoryChanges(int id)
        {
            return await this.repo.GetAllChanges(id);
        }
    }
}